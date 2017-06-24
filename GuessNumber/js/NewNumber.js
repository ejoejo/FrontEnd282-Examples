var RandomGenerator = require('./RandomGenerator');

function NewNumber() {
    var random = new RandomGenerator();
    var Number = [];
    for (var index = 0; index < 4; index++) {
        Number[index] = random.nextInt(0, 10);
        switch (index) {
            case 1:
                while (Number[0] === Number[1]) {
                    Number[index] = random.nextInt(0, 10);
                }
                break;
            case 2:
                while (Number[0] === Number[2] || Number[1] === Number[2]) {
                    Number[index] = random.nextInt(0, 10);
                }
                break;
            case 3:
                while (Number[0] === Number[3] || Number[1] === Number[3] || Number[2] === Number[3]) {
                    Number[index] = random.nextInt(0, 10);
                }
                break;
            default:
                break;
        }
    }
    return Number;
};

module.exports = NewNumber;