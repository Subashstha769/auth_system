<?php
session_start();
// Headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// handle OPTIONS REQUEST
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

if(isset($_SESSION['id'])){
    $response = [
        "success" => true,
        "name" => $_SESSION['name']
    ];

    echo json_encode($response);
}
else{
    $response = [
        "success" => false,
        "message" => "Authentication Failed"
    ];

    echo json_encode($response);
}

?>