<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

require __DIR__ . "/dbConfig.php"; // $pdo must be a PDO instance

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        "status" => false,
        "message" => "Method Not Allowed"
    ]);
    exit;
}

try {
    $stmt = $pdo->query("SELECT id, first_name, last_name, username, email, created_at FROM users ORDER BY id DESC");
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => true,
        "users" => $users
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => false,
        "message" => "Failed to fetch users"
    ]);
}
?>