const Discord = require('discord.js');

module.exports = async function (message, args, client) {
    mentioned = message.mentions.users.toJSON();
    mentioned.forEach(element => {
        const embed = new Discord.MessageEmbed()
        .setTitle('Dox Report')
        .setColor(0xff0000)
        .setImage(element.displayAvatarURL)
        .addFields( 
            { name: "Username",value: element.username },
            { name: "ID",value: element.id },
            { name: "Account Created",value: new Date(element.createdTimestamp) },
            { name: "Discriminator",value: element.discriminator });
        message.channel.send(embed);
    });   
}