<?php

require 'conn.php';
session_start();

if(isset($_POST["apigen"])) {
    if(isset($_SESSION["api_token"])) {
        if($_SESSION["api_token"] == "") {
            
        }
        else {
            echo $_SESSION['api_token'];
            return;
        }
    }

    $apiToken = bin2hex(random_bytes(16));
    $sql = "UPDATE users SET api_token='$apiToken' WHERE id=".$_SESSION["id"];
    if ($conn->query($sql) === TRUE) {
        echo $apiToken;
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    $conn->close();
}

?>