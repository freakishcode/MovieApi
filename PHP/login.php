<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");


require __DIR__ . "/dbConfig.php"; 

//
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "status" => false,
        "message" => "Method Not Allowed"
    ]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

if (empty($input['username']) || empty($input['password'])) {
    http_response_code(400);
    echo json_encode([
        "status" => false,
        "message" => "Username and password are required"
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id, password FROM users WHERE username = :username LIMIT 1");
    $stmt->execute(['username' => $input['username']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($input['password'], $user['password'])) {
        // Generate a fake token for demo (replace with JWT in production)
        $token = bin2hex(random_bytes(16));
        echo json_encode([
            "status" => $token,
            "message" => "Login successful"
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            "status" => false,
            "message" => "Invalid username or password"
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => false,
        "message" => "Login failed"
    ]);
}
?>