<?php
// Server Details

$db_server = "localhost";
$db_username = "root";
$db_password = "root";
$db_name = "auth_system";

// Creating Connection ....

$conn = mysqli_connect($db_server, $db_username, $db_password, $db_name);

// Checking Connection

if(!$conn){
    echo "Connection Failed...";
}


?>