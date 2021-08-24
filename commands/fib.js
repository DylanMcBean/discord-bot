const Discord = require('discord.js');
const fibonacci = require ('fibonacci');

module.exports = function (message, args, client) {
    if (!isNaN(args[0]) && !args[0].includes('.')){
        val = Math.abs(parseInt(args[0]));
        if (val < 5001){
            message.channel.send(`Fibonacci of ${val} is ${fibonacci.iterate(val).number }`);
        } else {
            message.channel.send("that number is too big, sorry :(, max is 5000");
        }
    }
    else
        message.channel.send("invalid entry");
}