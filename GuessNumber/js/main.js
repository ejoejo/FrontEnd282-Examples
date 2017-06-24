var RandomGenerator = require('./RandomGenerator');
var CompareNumber = require('./CompareNumber');
var NewNumber = require('./NewNumber');
var CheckDuplicate = require('./CheckDuplicate');
var $ = require('jquery');

$(function () {
    var number = NewNumber();
    $("#number").val(number);

    var count = 0;
    $(".btn").click(function () {
        var Numbers = $('#number').val();
        var numbers = [];
        var Input = $('#input').val();
        var duplicate = CheckDuplicate(Input);
        if (duplicate) {
            alert("輸入重複數字，請重新輸入");
        } else {
            count++;
            var input = [];
            if (Input.length > 0) {
                for (var index = 0; index < 7; index++) {
                    if (Numbers.slice(index, index + 1) == ",") continue;
                    numbers.push(parseInt(Numbers.slice(index, index + 1)));
                }
                for (index = 0; index < 4; index++) {
                    input.push(parseInt(Input.slice(index, index + 1)));
                }
                var result = CompareNumber(numbers, input);
                var div = document.getElementById('result');
                div.innerHTML = div.innerHTML + "輸入：" + Input + " 結果：" + result + "<br>";

                if (result == "4A0B") {
                    div.innerHTML = div.innerHTML + "共" + count + "次找到答案";
                } else {}
                $('#input').val("");
            } else {
                alert("請輸入數字");
            }
        }

    });
    $("#reset").click(function () {
        $("#number").val(NewNumber());
        count = 0;
        var div = document.getElementById('result');
        div.innerHTML = "";
    });
});