<?php
// dbConfig.php

// Database configuration
$host     = 'localhost';
$db       = 'moviedb';
$user     = 'root';
$pass     = 'ajibolabakare@gmail.com';
$charset  = 'utf8mb4';

// Data Source Name
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

// PDO options
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Throw exceptions on errors
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       // Fetch associative arrays
    PDO::ATTR_EMULATE_PREPARES   => false,                  // Use real prepared statements
];

try {
    // Create PDO instance
    $pdo = new PDO($dsn, $user, $pass, $options);

    // ✅ Echo success message (for development/debugging only)
    echo json_encode(["success" => "Database connected successfully"]);
    
} catch (PDOException $e) {
    // Return error in JSON format
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    
    // For debugging only (disable in production)
    // echo json_encode(["error" => $e->getMessage()]);
    exit();
}


