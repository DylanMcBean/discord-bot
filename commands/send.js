const Discord = require('discord.js');
const { getOrSet, writeSlots, readSlots, addCommas } = require('../frequently-used.js');

module.exports = async function (message, args, client) {
    const data = await readSlots();
    const userData = getOrSet(data, message.author.id,{ balance: 500, last: 0, coinsSinceDaily: 0, tag: false, dailyStreak: 0 });
    for(let elm of message.mentions.users.toJSON()){
        let mentionedUserData = getOrSet(data, elm.id,{ balance: 500, last: 0, coinsSinceDaily: 0, tag: false, dailyStreak: 0 });
    }

    let amount = Number(args.join(" ").replace(/<@!\d+?> ?/,"").match(/\-?\d+/)[0]);

    if (data[message.author.id].balance >= amount*message.mentions.users.toJSON().length && amount >= 0) {
        for(let elm of message.mentions.users.toJSON()){
            data[message.author.id].balance -= amount;
            data[elm.id].balance += amount;
            if (amount == 0 || message.author.id == elm.id)
                message.channel.send(`${client.users.resolve(message.author.id).username} sent ${addCommas(amount)} coins to ${client.users.resolve(elm.id).username}. but that was kind pointless wasnt it`);
            else
                message.channel.send(`${client.users.resolve(message.author.id).username} sent ${addCommas(amount)} coins to ${client.users.resolve(elm.id).username}.`);
        }
    } else {
        if (amount < 0) {
            message.channel.send(`did you really try and cheat the system\n just for your stupidity I'll take that money for myself`);
            data[message.author.id].balance -= Math.min(Math.abs(amount),data[message.author.id].balance);
            data["815100881301143593"].balance += Math.min(Math.abs(amount),data[message.author.id].balance);
            message.channel.send(`${client.users.resolve(message.author.id).username} sent ${Math.abs(addCommas(amount))} coins to Discord Nexus.`);
        }
        else
            message.channel.send(`you do not have enough coins to send`);
    }
    await writeSlots(data);
}