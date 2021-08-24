const Discord = require('discord.js');

module.exports = function (message, args, client) {
    if (!isNaN(args[0]) && !args[0].includes('.')){
        val = Math.abs(parseInt(args[0]));
        if (args[0].length < 10){
            if (is_prime(val))
                message.channel.send(`✅ ${val} is prime`);
            else {
                factorsOfNum = getFactors(parseInt(val)).sort(function (a, b) { return a - b }).join(", ");
                primeFactorsOfNum = findPrimeFactors(parseInt(val)).sort(function (a, b) { return a - b }).join(", ");
                message.channel.send(`❌ ${val} is not prime because it has these factors:\n\t[${factorsOfNum}]\n\tand these prime factors:\n\t[${primeFactorsOfNum}]`);
            }
        } else {
            message.channel.send("that number is too big, sorry :(");
        }
    }
    else
        message.channel.send("invalid entry");
}
//pin command
function getFactors(num) {
    const isEven = num % 2 === 0;
    const max = Math.sqrt(num);
    const inc = isEven ? 1 : 2;
    let factors = [1, num];

    for (let curFactor = isEven ? 2 : 3; curFactor <= max; curFactor += inc) {
        if (num % curFactor !== 0) continue;
        factors.push(curFactor);
        let compliment = num / curFactor;
        if (compliment !== curFactor) factors.push(compliment);
    }

    return factors;
}

const findPrimeFactors = num => {
    const res = num % 2 === 0 ? [2] : [];
    let start = 3;
    while (start <= num) {
        if (num % start === 0) {
            if (is_prime(start)) {
                res.push(start);
            };
        };
        start++;
    };
    return res;
};

function is_prime(n) {
    if (n == 1) {
        return false;
    }

    i = 2;
    while (i * i <= n) {
        if (n % i == 0) {
            return false;
        }
        i += 1;
    }
    return true;
}