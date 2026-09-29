<?php
session_start();
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

if (isset($user['email']) && isset($user['password'])) {

    $email = $user['email'];
    $password = $user['password'];

    if (empty($email) || empty($password)) {
        $response = [
            "success" => false,
            "message" => "All the fields are required"
        ];

        echo json_encode($response);
    } else {

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $response = [
                "success" => false,
                "message" => "Invalid Email"
            ];

            echo json_encode($response);
        } else {
            // Prepare statement for fethching user from data base

            $stmt = mysqli_prepare($conn, "SELECT * FROM users WHERE email = ?");

            mysqli_stmt_bind_param($stmt, "s", $email);

            // Execute Statement
            if (mysqli_stmt_execute($stmt)) {
                // If Success Fetch user and storeed in result

                $result = mysqli_stmt_get_result($stmt);

                if (mysqli_num_rows($result) > 0) {
                    $storedUser = mysqli_fetch_assoc($result);

                    $hash = $storedUser['password'];

                    if (password_verify($password, $hash)) {

                        $_SESSION['id'] = $storedUser['id'];
                        $_SESSION['name'] = $storedUser['name'];

                        $response = [
                            "success" => true,
                            "message" => "Login Successful"
                        ];

                        echo json_encode($response);
                    } else {
                        $response = [
                            "success" => false,
                            "message" => "Incorrect Email / Password"
                        ];

                        echo json_encode($response);
                    }
                } else {
                    $response = [
                        "success" => false,
                        "message" => "User does not Exist"
                    ];

                    echo json_encode($response);
                }
            } else {
                $response = [
                    "success" => false,
                    "message" => "Execution Failed"
                ];

                echo json_encode($response);
            }
        }
    }
} else {
    $response = [
        "success" => false,
        "message" => "Form data is missing"
    ];

    echo json_encode($response);
}
