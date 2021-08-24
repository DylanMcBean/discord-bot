const Discord = require('discord.js');
const { spawn } = require("child_process");
const { exception } = require('console');

module.exports = function (message, args, client) {
    const ls = spawn("python3", ["./commands/regex.py",args.join(" ").replace("!regex","")]);
    ls.stdout.on("data", data => {
        if (`${data}`.replace(/\s/g, '') == "")
            message.channel.send("Error with that request, sorry.");
        else
            message.channel.send(`${data}`);
    });

    ls.stderr.on('data', (data) => {
        console.log(`error:${data}`);
     });
}