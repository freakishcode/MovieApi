<?php
// php/helper.php
function http_get($url) {
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
  curl_setopt($ch, CURLOPT_TIMEOUT, 10);
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

  // ✅ Add custom headers (User-Agent + Accept)
  curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'User-Agent: MyNewsApp/1.0 (+https://yourdomain.com)', // change to your app name & URL
    'Accept: application/json'
  ]);

  $body = curl_exec($ch);
  $info = curl_getinfo($ch);
  $err = curl_error($ch);
  curl_close($ch);

  if ($body === false) {
    return ['http_code' => 0, 'error' => $err, 'body' => null];
  }
  return ['http_code' => $info['http_code'], 'body' => $body];
}

// Very small file-based cache for demonstration. Use a real cache in production.
function cache_dir() {
  $d = __DIR__ . '/../cache';
  if (!is_dir($d)) mkdir($d, 0755, true);
  return $d;
}

function set_cache($key, $value, $ttl = 60) {
  $file = cache_dir() . '/' . $key;
  $payload = json_encode(['expires' => time() + $ttl, 'body' => $value]);
  file_put_contents($file, $payload);
}

function get_cache($key) {
  $file = cache_dir() . '/' . $key;
  if (!file_exists($file)) return false;
  $payload = json_decode(file_get_contents($file), true);
  if (!$payload || !isset($payload['expires']) || time() > $payload['expires']) {
    @unlink($file);
    return false;
  }
  return $payload['body'];
}
