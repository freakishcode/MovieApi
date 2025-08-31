<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

// Database configuration
require __DIR__ . "/dbConfig.php"; 

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "status" => false,
        "message" => "Method Not Allowed"
    ]);
    exit;
}

// Get POST data
$input = json_decode(file_get_contents("php://input"), true);

// Validate required fields
$required = ["firstName", "lastName", "username", "password", "email"];
foreach ($required as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode([
            "status" => false,
            "message" => "Missing field: $field"
        ]);
        exit;
    }
}

// Validate email format
if (!filter_var($input["email"], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        "status" => false,
        "message" => "Invalid email format"
    ]);
    exit;
}

try {
    // Check if username exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = :username LIMIT 1");
    $stmt->execute(['username' => $input["username"]]);
    if ($stmt->fetch()) {
        http_response_code(409);
        echo json_encode([
            "status" => false,
            "message" => "Username already taken"
        ]);
        exit;
    }

    // Hash password
    $hashedPassword = password_hash($input["password"], PASSWORD_DEFAULT);

    // Insert user
    $stmt = $pdo->prepare(
        "INSERT INTO users (first_name, last_name, username, email, password) 
         VALUES (:first_name, :last_name, :username, :email, :password)"
    );
    $stmt->execute([
        'first_name' => $input["firstName"],
        'last_name'  => $input["lastName"],
        'username'   => $input["username"],
        'email'      => $input["email"],
        'password'   => $hashedPassword
    ]);

    // Generate a fake token for demo
    $token = bin2hex(random_bytes(16));
    echo json_encode([
        "status" => true,
        "token" => $token,
        "message" => "Registration successful"
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => false,
        "message" => "Registration failed"
    ]);
}
?>