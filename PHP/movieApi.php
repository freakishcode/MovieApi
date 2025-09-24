<?php

// php/articles.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // restrict in production
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

require_once __DIR__ . '/helper.php';

// ✅ Load dotenv
require __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;

// Load .env
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

$apiKey = getenv('SERVER_API_KEY') ?: $_ENV['SERVER_API_KEY'] ?? null;
if (!$apiKey) {
  http_response_code(500);
  echo json_encode(['error' => 'Server misconfiguration: API key missing']);
  exit;
}

// Validate inputs
$q = isset($_GET['q']) ? trim($_GET['q']) : '';
$category = isset($_GET['category']) ? trim($_GET['category']) : '';
$page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
$perPage = isset($_GET['perPage']) ? max(1, min(100, intval($_GET['perPage']))) : 10;
$latest = isset($_GET['latest']) ? filter_var($_GET['latest'], FILTER_VALIDATE_BOOLEAN) : false;

// Build URL
if ($q !== '' || $latest) {
  // "latest" forces everything endpoint, sorted by publishedAt
  $thirdPartyBase = 'https://api.themoviedb.org/3';
  $params = [
    'q' => $q !== '' ? $q : 'news', // fallback keyword
    'sortBy' => 'publishedAt',
    'page' => $page,
    'pageSize' => $perPage,
    'apiKey' => $apiKey,
  ];
} else {
  // Default: top headlines
  $thirdPartyBase = 'https://newsapi.org/v2/top-headlines';
  $params = [
    'country' => 'us',
    'category' => $category !== '' ? $category : null,
    'page' => $page,
    'pageSize' => $perPage,
    'apiKey' => $apiKey,
  ];
  $params = array_filter($params, fn($v) => $v !== null && $v !== '');
}

$thirdUrl = $thirdPartyBase . '?' . http_build_query($params);

// Simple cache (file-based). Replace with Redis in prod.
$cacheKey = 'cache_' . md5($thirdUrl);
$cached = get_cache($cacheKey);
if ($cached) {
  echo $cached;
  exit;
}

$response = http_get($thirdUrl);
if ($response['http_code'] >= 200 && $response['http_code'] < 300) {
  set_cache($cacheKey, $response['body'], 60); // cache 60s
  echo $response['body'];
  exit;
}

http_response_code(502);
echo json_encode(['error' => 'Upstream error', 'details' => $response]);
exit;
