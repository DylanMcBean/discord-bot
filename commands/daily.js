const { getOrSet, writeSlots, readSlots } = require('../frequently-used.js');

module.exports = async function (message, args, client) {
    const data = await readSlots();
    const userData = getOrSet(data, message.author.id,{ balance: 500, last: 0, coinsSinceDaily: 0, tag: false, dailyStreak: 0 });

    let timeLeft = 864000000 - (Date.now() - userData.last);
    let upTimeSeconds = Math.floor((timeLeft/1000)%60);
    let upTimeMinutes = Math.floor((timeLeft/60000)%60);
    let upTimeHours = Math.floor((timeLeft/3600000)%24);

    if (timeLeft > 0){
        message.channel.send(`${client.users.resolve(message.author.id).username}, you need to wait another ${upTimeHours}:${upTimeMinutes}:${upTimeSeconds} before you can run !daily again`);
    } else {

        if (timeLeft < -864000000)
            userData.dailyStreak = 0;
        else
            userData.dailyStreak = userData.dailyStreak + 1;
        
        userData.last = Date.now();
        if (typeof userData.dailyStreak === "undefined" || !userData.dailyStreak)
            userData.dailyStreak = 0;
        
        let bonus = 1000 + (100*userData.dailyStreak);
        userData.balance += bonus;
        userData.coinsSinceDaily = 0;
        await writeSlots(data);
        message.channel.send(`here is an extra ${bonus} coins ${'⭐'+(userData.dailyStreak+1)}`);
    }
}