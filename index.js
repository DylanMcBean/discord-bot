const Discord = require('discord.js');
const commandHandler = require('./commands.js');

const client = new Discord.Client();
require('dotenv').config();

client.login(process.env.TOKEN);

// Checks if the bot is online
client.on('ready', () => {
    console.log('I\'m Online');
});

client.on('message', message => {
    commandHandler(message, client);
});