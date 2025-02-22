$(document).ready(function() {
    $("#switchs").change(function() {
        if ($(this).is(":checked")) {
            $(".section__ar").show();
            $(".section__sb").hide();
        } else {
            $(".section__ar").hide();
            $(".section__sb").show();
        }
    })
});