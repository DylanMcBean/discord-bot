const Discord = require('discord.js');
const { getOrSet, writeSlots, readSlots, addCommas } = require('../frequently-used.js');

module.exports = async function (message, args, client) {
    let userData = JSON.parse(fs.readFileSync('./slotsData.json'));

    var items = Object.keys(userData).map(function (key) {
        return [key, userData[key]];
    });

    var sorted = items.sort(function (first, second) {
        return second[1]["balance"] - first[1]["balance"];
    });

    const commands = [] // {name:"",balance:""}

    sorted.slice(0, Math.min(10, sorted.length)).forEach(elm => {
        let user = elm[0];
        try {
            user = client.users.resolve(elm[0]).username;
        } catch {
            try {
                user = client.users.fetchUser(elm[0]).username;
            } catch { }
        }
        commands.push({ name: `${user}`, description: `${addCommas(elm[1]['balance'])}` });
    });

    let commandNameString = [];
    let commandDescriptionString = [];

    commands.forEach(element => {
        commandNameString.push(element.name);
        commandDescriptionString.push(element.description);
    })

    commandNameString = commandNameString.join("\n");
    commandDescriptionString = commandDescriptionString.join("\n");

    const embed = new Discord.MessageEmbed()
        .setTitle('Leaderboard')
        .setColor(0x306fd0)
        .addFields({ name: "Username", value: commandNameString, inline: true }, { name: "Balance", value: commandDescriptionString, inline: true });
    message.channel.send(embed);
}