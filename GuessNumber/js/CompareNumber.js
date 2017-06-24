function CompareNumber(number, input) {
    var A = 0;
    var B = 0;

    for (var index = 0; index < 4; index++) {
        if (input[index] == number[index]) {
            A++;
        }
    }
    for (var index1 = 0; index1 < 4; index1++) {
        for (var index2 = 0; index2 < 4; index2++) {
            if (index1 == index2) continue;
            if (input[index1] == number[index2]) {
                B++;
            }
        }
    }
    return A + "A" + B + "B";
}

module.exports = CompareNumber;