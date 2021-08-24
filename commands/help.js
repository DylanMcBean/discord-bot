const Discord = require('discord.js');

module.exports = function (message, args, client) {
    const commands = [
        {name:"!ping",description:"check if the bot is active."},
        {name:"!info",description:"lists information about different programming concepts"},
        {name:"!help",description:"display this menu"},
        {name:"!dox",description:"display information about someone"},
        {name:"!prime",description:"check if a number is prime or not"},
        {name:"!fib",description:"get the Nth fibonacci number"},
        {name:"!regex",description:"generate a string that matches the inputter regex"},
        {name:"!logo",description:"generate a logo based on the inputted text"},
        {name:"!status",description:"show the status of the bot"},
        {name:"!slots",description:"gamble some money at the slots"},
        {name:"!balance",description:"check how many coins you have"},
        {name:"!send",description:"send coins to your fellow server members"},
        {name:"!daily",description:"get a daily amount of coins"},
        {name:"!leaderboard",description:"check who is the richest on the server"},
        {name:"!tag",description:"do you want the bot to tag you when mentioned"}
    ]
    
    let commandNameString = [];
    let commandDescriptionString = [];

    commands.forEach(element => {
        commandNameString.push(element.name);
        commandDescriptionString.push(element.description);
    })

    commandNameString = commandNameString.join("\n");
    commandDescriptionString = commandDescriptionString.join("\n");

    const embed = new Discord.MessageEmbed()
    .setTitle('Help')
    .setColor(0xee6633) //#ee6633
    .setDescription('Showing all commands')
    .addFields( { name: "Commands",value: commandNameString, inline: true}, {name: "Descriptions", value: commandDescriptionString, inline: true} );
    message.channel.send(embed);
}