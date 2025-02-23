<?php

session_start();
require "conn.php";

if(isset($_POST["apiToken"])) {
    $sql = "SELECT api_token FROM users WHERE id=".$_SESSION["id"];
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            if($row["api_token"] == "") {
                echo "none";
            } else {
                $_SESSION["api_token"] = $row["api_token"];
                echo $row["api_token"];
            }
        }
    } else {
        echo "none";
    }

    $conn->close();
}

?>