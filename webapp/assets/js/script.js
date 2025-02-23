$(document).ready(function() {
    function loggedIn() {
        $.ajax({
            url: "assets/php/loggedin.php",
            type: "POST",
            data: {
                loggedIn: 1
            },
            success: function(data) {
                if (data == "success") {
                    $("nav li:nth-child(4)").hide();
                    $("nav li:nth-child(3) i").hide();
                } else {
                    $("nav li:nth-child(4)").show();
                }
            }
        });
    }

    loggedIn();

    $("nav li:nth-child(3)").click(function() {
        $.ajax({
            url: "assets/php/loggedin.php",
            type: "POST",
            data: {
                loggedInR: 1
            },
            success: function(data) {
                if (data == "success") {
                    location.href = "api.html";
                }
            }
        });
    });

    $("nav li:nth-child(4)").click(function() {
        $(".popup").show();
    });

    $(".popup__login .popup__lActions p:nth-child(3), .popup__reg .popup__rActions p:nth-child(3)").click(function() {
        $(".popup").hide();
    });

    $(".popup__login .popup__lActions p:nth-child(2)").click(function() {
        $(".popup__login").hide();
        $(".popup__reg").show();
    });

    $(".popup__reg .popup__rActions p:nth-child(2)").click(function() {
        $(".popup__login").show();
        $(".popup__reg").hide();
    });

    /* login */

    $("#log").click(function() {
        $.ajax({
            url: "assets/php/login.php",
            type: "POST",
            data: {
                email: $("#lemail").val(),
                pass: $("#lpass").val(),
                login: 1
            },
            success: function(data) {
                if (data == "success") {
                    $(".popup").hide();
                    $("nav li:nth-child(4)").hide();
                    $("nav li:nth-child(3) i").hide();
                }
            }
        });
    })

    /* register */

    $("#reg").click(function() {
        $.ajax({
            url: "assets/php/register.php",
            type: "POST",
            data: {
                email: $("#remail").val(),
                pass: $("#rpass").val(),
                uname: $("#runame").val(),
                register: 1
            },
            success: function(data) {
                if (data == "success") {
                    $(".popup").hide();
                    $("nav li:nth-child(4)").hide();
                    $("nav li:nth-child(3) i").hide();
                }
            }
        });
    })
});