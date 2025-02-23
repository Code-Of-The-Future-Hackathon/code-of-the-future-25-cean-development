<?php
session_start();
require 'conn.php';

if(isset($_POST["register"])) {
    $uname = $_POST["uname"];
    $email = $_POST["email"];
    $pass = $_POST["pass"];

    $pass = hash("sha384", $pass);

    $sql = "INSERT INTO users (username, password, email)
    VALUES ('$uname', '$pass' , '$email')";

    if ($conn->query($sql) === TRUE) {
        echo "success";

        $sql = "SELECT id, username, password email FROM users WHERE email='$email' AND password = '$pass'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $_SESSION["id"] = $row["id"];
                $_SESSION["username"] = $row["username"];
            }
        } else {
            echo "0 results";
        }
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}

?>