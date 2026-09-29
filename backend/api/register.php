<?php
// Make connetion to Database

require_once "../config/database.php";

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

// Receives Raw Data and Decode it

$user = json_decode(file_get_contents("php://input"), true);

if (isset($user['name']) && isset($user['email']) && isset($user['password']) && isset($user['confirmPassword'])) {

    // User Data
    $name = $user['name'];
    $email = $user['email'];
    $password = $user['password'];
    $confirmPassword = $user['confirmPassword'];

    // Checks for Empty Field
    if (empty($name) || empty($email) || empty($password) || empty($confirmPassword)) {
        $response = [
            "success" => false,
            "message" => "All the fields are Required."
        ];

        echo json_encode($response);
    } elseif (strlen($name) < 8) {
        $response = [
            "success" => false,
            "message" => "Name must have at least 8 Characters"
        ];

        echo json_encode($response);
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response = [
            "success" => false,
            "message" => "Invalid Email"
        ];

        echo json_encode($response);
    }elseif(strlen($password) < 8){
        $response = [
            "success" => false,
            "message" => "Set Stong Password (Must have at least 8 Characters)"
        ];

        echo json_encode($response);
    }elseif($password !== $confirmPassword){
        $response = [
            "success" => false,
            "message" => "Password do not match"
        ];

        echo json_encode($response);
    }
    else{
        $hash = password_hash($password, PASSWORD_DEFAULT);

        // Prepare Statement
        $stmt = mysqli_prepare($conn, "INSERT INTO users (name, email, password) VALUES (?, ?, ?)");

        mysqli_stmt_bind_param($stmt, "sss", $name, $email, $hash);

        // Execute Statement
        if(mysqli_stmt_execute($stmt)){
            $response = [
            "success" => true,
            "message" => "Registration Successful"
        ];

        echo json_encode($response);
        }
        else{
            $response = [
            "success" => false,
            "message" => "Execution Failed"
        ];

        echo json_encode($response);
        }
    }
} else {
    $response = [
        "success" => false,
        "message" => "Form Data is Missing"
    ];

    echo json_encode($response);
}
