const fs = require('fs').promises;
const ping = require('./commands/ping.js');
const info = require('./commands/info.js');
const help = require('./commands/help.js');
const idle = require('./commands/idle.js');
const dox = require('./commands/dox.js');
const prime = require('./commands/prime.js');
const fib = require('./commands/fib.js');
const regex = require('./commands/regex.js');
const logo = require('./commands/logo.js');
const status = require('./commands/status.js');
const slots = require('./commands/slots.js');
const balance = require('./commands/balance.js');
const send = require('./commands/send.js');
const daily = require('./commands/daily.js');
const leaderboard = require('./commands/leaderboard.js');
const tag = require('./commands/tag.js');

let upTime = null;
let processedCommands = 0;

const commands = { ping, info, help, dox, prime, fib, regex, logo, status, slots, balance, send, daily, leaderboard, tag };

module.exports = function (message, client) {
    const tokens = message.content.split(' '); // get all the tokens on the inputed string
    let command = tokens.shift(); // get the main command from the tokens

    if (upTime === null) {
        getStatusFile();
    } else {
        updateStatusFile();
    }

    if (command.charAt(0) === '!' && message.author.id !== '815100881301143593') { // check if its a valid command
        command = command.slice(1);

        if (command in commands) { // make sure the bot has the command in its list
            processedCommands += 1;
            commands[command](message, tokens, client);
        } else {
            message.channel.send(`The command '${command}' is not a valid command.`);
        }

        idle(message, client);
    }
};

async function updateStatusFile() {
    let textToWrite = '';
    textToWrite += `${upTime}\n`;
    textToWrite += `${processedCommands}\n`;
    textToWrite += Date.now();

    await fs.writeFile('./status-file.txt', textToWrite);
}

async function getStatusFile() {
    const array = (await _getStatusFile()).split("\n");
    upTime = array[0] == "null" ? Date.now() : Number(array[0]) + (Date.now() - Number(array[2]));
    processedCommands = Number(array[1]) + 1;
}

function _getStatusFile(){
    return new Promise((resolve, reject) => {
        fs.readFile("./status-file.txt")
            .then(text => resolve(`${text}`))
            .catch(err => reject(err));
    });
}