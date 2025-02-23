<?php

session_start();
if(isset($_POST["loggedIn"])) {
    if(isset($_SESSION["id"])) {
        echo "success";
    } else {
        echo "0 results";
    }
}

if(isset($_POST["loggedInR"])) {
    if(isset($_SESSION["id"])) {
        echo "success";
    } else {
        echo "0 results";
    }
}

if(isset($_POST["loggedInAPI"])) {
    if(isset($_SESSION["id"])) {
        echo "success";
    } else {
        echo "0 results";
    }
}