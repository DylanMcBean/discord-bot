const { getOrSet, writeSlots, readSlots, addCommas } = require('../frequently-used.js');

module.exports = async function (message, args, client) {
    const data = await readSlots();
    const userData = getOrSet(data, message.author.id, { balance: 500, last: 0, coinsSinceDaily: 0, tag: false, dailyStreak: 0 });
    userData.tag = ["yes","true","y","tag","True","Yes","Y"].includes(args[0]) ? true : false;
    message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} you have set it so you ${userData.tag ? "will" : "will not"} be tagged by the bot.${userData.tag ? "\nthis will occur mostly when transactions have been made to your account." : ""}`);
    await writeSlots(data);
};