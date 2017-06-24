var $ = require('jquery');

$(function () {
    $(".btn").click(function () {
        var number = $("#input").val();
        var hh = Math.floor((number / 1000) / 60 / 60);
        var mm = Math.floor((number % (1000 * 60 * 60)) / 1000 / 60);
        var ss = Math.floor(number % (1000 * 60 * 60) % (1000 * 60) / 1000);
        $("#time").text(hh + ':' + mm + ":" + ss);
    });
});