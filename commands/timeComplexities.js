const Discord = require('discord.js');
module.exports = function (message, args, client) {
    message.channel.send(new Discord.MessageAttachment(`./files/markdown/time complexities.png`));
}