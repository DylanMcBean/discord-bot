const { getOrSet, writeSlots, readSlots, addCommas } = require('../frequently-used.js');

module.exports = async function (message, args, client) {
    const data = await readSlots();
    const userData = getOrSet(data, message.author.id, { balance: 500, last: 0, coinsSinceDaily: 0, tag: false, dailyStreak: 0 });
    message.channel.send(`${client.users.resolve(message.author.id).username} you have ${addCommas(userData.balance)} coins.`);
    await writeSlots(data);
};