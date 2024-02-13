

function throwDice(num){
    return Math.round(Math.random() * ((num+1) - 1) + 1);
}

module.exports = throwDice;