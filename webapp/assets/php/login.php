<?php
session_start();
require 'conn.php';

if(isset($_POST["login"])) {
    $email = $_POST["email"];
    $pass = $_POST["pass"];
    

    $pass = hash("sha384", $pass);

    $sql = "SELECT id, username, password, email FROM users WHERE email='$email' AND password = '$pass'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo "success";
            $_SESSION["id"] = $row["id"];
            $_SESSION["uname"] = $row["username"];
        }
    } else {
        echo "0 results";
    }

    $conn->close();
}

?>