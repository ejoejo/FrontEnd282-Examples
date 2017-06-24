function CheckDuplicate(number) {
    var Number = [];
    for (var index = 0; index < 4; index++) {
        Number.push(parseInt(number.slice(index, index + 1)));
    }

    if (Number[0] === Number[3] || Number[1] === Number[3] || Number[2] === Number[3]) {
        return true;
    } else {
        return false;
    }
}
module.exports = CheckDuplicate;