$(document).ready(function() {
    function loggedIn() {
        $.ajax({
            url: "assets/php/loggedin.php",
            type: "POST",
            data: {
                loggedInAPI: 1
            },
            success: function(data) {
                if (data == "success") {
                    $.ajax({
                        url: "assets/php/api-token.php",
                        type: "POST",
                        data: {
                            apiToken: 1
                        },
                        success: function(data) {
                            if (data == "none") {
                                $(".section-api button i").hide();
                            } else {
                                $("#token").val(data);
                            }
                        }
                    });
                }
                else {
                    location.href = "index.html";
                }
            }
        });
    }

    loggedIn()

    $("#api").click(function(){
        $.ajax({
            url: "assets/php/api-gen.php",
            type: "POST",
            data: {
                apigen: 1
            },
            success: function(data) {
                $("#token").val(data);
                $(".section-api button i").show();
            }
        });
    })


});