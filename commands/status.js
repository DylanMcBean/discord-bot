const Discord = require('discord.js');
fs = require('fs');
const si = require('systeminformation');

module.exports = async function (message, args, client) {

    temp = await si.cpuTemperature();
    var array = fs.readFileSync('./status-file.txt').toString().split("\n");

    let upTimeTotal = Math.max(0,Date.now() - (isNaN(Number(array[0])) ? Date.now() : Number(array[0])));
    let upTimeSeconds = Math.floor((upTimeTotal/1000)%60);
    let upTimeMinutes = Math.floor((upTimeTotal/60000)%60);
    let upTimeHours = Math.floor((upTimeTotal/3600000)%24);
    let upTimeDays = Math.floor(upTimeTotal/86400000);

    upTimeString = `${upTimeDays}:${upTimeHours}:${upTimeMinutes}:${upTimeSeconds}`;

    const commands = [
        {name:"Uptime",description:`${upTimeString}`},
        {name:"Processed Commands",description:`${(isNaN(Number(array[1])) ? Date.now() : Number(array[1]))}`},
        {name:"CPU",description:`${temp['main']} C`}
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
    .setTitle('Status')
    .setColor(0xfe4367) //#fe4367
    .setDescription('Showing bot Status')
    .addFields( { name: "Key",value: commandNameString, inline: true}, {name: "Value", value: commandDescriptionString, inline: true} );
    message.channel.send(embed);
}