const { getOrSet, writeSlots, readSlots, addCommas } = require('../frequently-used.js');

module.exports = async function (message) {
    const data = await readSlots();
    
    let randomUser = Object.keys(data)[Math.floor(Math.random()*Object.keys(data).length)];

    while (randomUser == "815100881301143593")
        randomUser = Object.keys(data)[Math.floor(Math.random()*Object.keys(data).length)];

    const userData = getOrSet(data, randomUser, { balance: 500, last: 0, coinsSinceDaily: 0, tag: false, dailyStreak: 0 });
    
    let positiveOutcome = Math.random()>0.5;

    if (positiveOutcome){
        switch(Math.floor(Math.random()*2)){
            case 0:
                console.log(`${client.users.resolve(message.author.id).username} Found Money`);
                var amount = Math.round(Math.random()*90)+10;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just found some money on the ground +${amount} coins`);
                userData.balance += amount;
                break;
            case 1:
                console.log(`${client.users.resolve(message.author.id).username} Given Money`);
                var amount = Math.round(Math.random()*90)+10;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} was just given some money by a stranger +${amount} coins`);
                userData.balance += amount;
                break;
        }
    } else {
        if (userData.balance < 0)
            return;
        switch(Math.floor(Math.random()*7)){
            case 0:
                console.log(`${client.users.resolve(message.author.id).username} Amazon Prime`);
                var amount = [5,10][Math.round(Math.random())];
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just paid their Amazon Prime subscription -${amount} coins`);
                userData.balance -= amount;
                break;
            case 1:
                console.log(`${client.users.resolve(message.author.id).username} Video Game`);
                var amount = Math.round(Math.random()*50)+10;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just bought a video game -${amount} coins`);
                userData.balance -= amount;
                break;
            case 2:
                console.log(`${client.users.resolve(message.author.id).username} Car Insurance`);
                var amount = Math.round(Math.random()*1700)+300;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just paid their car insurance -${amount} coins`);
                userData.balance -= amount;
                break;
            case 3:
                console.log(`${client.users.resolve(message.author.id).username} Car MOT`);
                var amount = Math.round(Math.random()*70)+30;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just paid their cars MOT -${amount} coins`);
                userData.balance -= amount;
                break;
            case 4:
                console.log(`${client.users.resolve(message.author.id).username} Car Troubles`);
                var amount = Math.round(Math.random()*800)+200;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} had some car troubles they needed to get fixed -${amount} coins`);
                userData.balance -= amount;
                break;
            case 5:
                console.log(`${client.users.resolve(message.author.id).username} Child Support`);
                var amount = Math.round(Math.random()*900)+100;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just paid their child support -${amount} coins`);
                userData.balance -= amount;
                break;
            case 6:
                console.log(`${client.users.resolve(message.author.id).username} Clothing`);
                var amount = Math.round(Math.random()*90)+10;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just bought some clothes -${amount} coins`);
                userData.balance -= amount;
                break;
            case 7:
                console.log(`${client.users.resolve(message.author.id).username} Credit Card`);
                var amount = Math.round(Math.random()*100)+100;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just paid off some of their credit card -${amount} coins`);
                userData.balance -= amount;
                break;
            case 8:
                console.log(`${client.users.resolve(message.author.id).username} Credit Card Stolen`);
                var amount = Math.round(Math.random()*4900)+100;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just had their credit card stolen and someone bought some things with it -${amount} coins`);
                userData.balance -= amount;
                break;
            case 9:
                console.log(`${client.users.resolve(message.author.id).username} Dentist`);
                var amount = Math.round(Math.random()*30)+10;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} has just been to the dentist -${amount} coins`);
                userData.balance -= amount;
                break;
            case 10:
                console.log(`${client.users.resolve(message.author.id).username} Drunk Buying on Ebay`);
                var amount = Math.round(Math.random()*470)+30;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} got a little tipsy and started to buy things on ebay -${amount} coins`);
                userData.balance -= amount;
                break;
            case 11:
                console.log(`${client.users.resolve(message.author.id).username} Electric Bill`);
                var amount = Math.round(Math.random()*50)+80;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just had to pay some of their electric bill -${amount} coins`);
                userData.balance -= amount;
                break;
            case 12:
                console.log(`${client.users.resolve(message.author.id).username} Emergency Vet Bill`);
                var amount = Math.round(Math.random()*600)+400;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just had to pay an emergency vet bill for their pet -${amount} coins`);
                userData.balance -= amount;
                break;
            case 13:
                console.log(`${client.users.resolve(message.author.id).username} Flat Tire`);
                var amount = Math.round(Math.random()*90)+10;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just had a flat tire -${amount} coins`);
                userData.balance -= amount;
                break;
            case 14:
                console.log(`${client.users.resolve(message.author.id).username} Shopping`);
                var amount = Math.round(Math.random()*90)+30;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} has just been to the shops -${amount} coins`);
                userData.balance -= amount;
                break;
            case 15:
                console.log(`${client.users.resolve(message.author.id).username} Gas Bill`);
                var amount = Math.round(Math.random()*50)+80;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just had to pay their gas bill -${amount} coins`);
                userData.balance -= amount;
                break;
            case 16:
                console.log(`${client.users.resolve(message.author.id).username} Gym Membership`);
                var amount = Math.round(Math.random()*4)+8;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just had to pay their gym membership -${amount} coins`);
                userData.balance -= amount;
                break;
            case 17:
                console.log(`${client.users.resolve(message.author.id).username} Health Insurance`);
                var amount = Math.round(Math.random()*320)+180;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just had to pay thei health insurance -${amount} coins`);
                userData.balance -= amount;
                break;
            case 18:
                console.log(`${client.users.resolve(message.author.id).username} Home Insurance`);
                var amount = Math.round(Math.random()*40)+100;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just had to pay their home insurance -${amount} coins`);
                userData.balance -= amount;
                break;
            case 19:
                console.log(`${client.users.resolve(message.author.id).username} Hospital Bill`);
                var amount = Math.round(Math.random()*19000)+1000;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} has just been to the hospital -${amount} coins`);
                userData.balance -= amount;
                break;
            case 20:
                console.log(`${client.users.resolve(message.author.id).username} House Repairs`);
                var amount = Math.round(Math.random()*4500)+500;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just had to pay some house repairs -${amount} coins`);
                userData.balance -= amount;
                break;
            case 21:
                console.log(`${client.users.resolve(message.author.id).username} Internet Bill`);
                var amount = Math.round(Math.random()*20)+20;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just had to pay their internet bill -${amount} coins`);
                userData.balance -= amount;
                break;
            case 22:
                console.log(`${client.users.resolve(message.author.id).username} Life Insurance`);
                var amount = Math.round(Math.random()*15)+15;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just had to pay their life insurance -${amount} coins`);
                userData.balance -= amount;
                break;
            case 23:
                console.log(`${client.users.resolve(message.author.id).username} Robbed`);
                var amount = Math.round(Math.random()*400)+100;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} was just robbed at gunpoint -${amount} coins`);
                userData.balance -= amount;
                break;
            case 24:
                console.log(`${client.users.resolve(message.author.id).username} Morgage`);
                var amount = Math.round(Math.random()*800)+600;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just had to pay some of their morgage -${amount} coins`);
                userData.balance -= amount;
                break;
            case 25:
                console.log(`${client.users.resolve(message.author.id).username} Nail Appointment`);
                var amount = Math.round(Math.random()*20)+20;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just went to get their nails painted -${amount} coins`);
                userData.balance -= amount;
                break;
            case 26:
                console.log(`${client.users.resolve(message.author.id).username} Netflix`);
                var amount = 10;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just had to pay their netflix subscription -${amount} coins`);
                userData.balance -= amount;
                break;
            case 27:
                console.log(`${client.users.resolve(message.author.id).username} New Shoes`);
                var amount = Math.round(Math.random()*180)+20;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just bought some new shoes -${amount} coins`);
                userData.balance -= amount;
                break;
            case 28:
                console.log(`${client.users.resolve(message.author.id).username} Pet Food`);
                var amount = Math.round(Math.random()*10)+10;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just bought their pet some food -${amount} coins`);
                userData.balance -= amount;
                break;
            case 29:
                console.log(`${client.users.resolve(message.author.id).username} Pet Insurance`);
                var amount = Math.round(Math.random()*20)+10;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just had to pay their pet insurance -${amount} coins`);
                userData.balance -= amount;
                break;
            case 30:
                console.log(`${client.users.resolve(message.author.id).username} Phone Bill`);
                var amount = Math.round(Math.random()*30)+30;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just paid off some of their phone bill -${amount} coins`);
                userData.balance -= amount;
                break;
            case 31:
                console.log(`${client.users.resolve(message.author.id).username} Photoshop`);
                var amount = 10;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just paid their photoshop subscription -${amount} coins`);
                userData.balance -= amount;
                break;
            case 32:
                console.log(`${client.users.resolve(message.author.id).username} Plastic Surgery`);
                var amount = Math.round(Math.random()*4500)+500;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just had some plastic surgery -${amount} coins`);
                userData.balance -= amount;
                break;
            case 33:
                console.log(`${client.users.resolve(message.author.id).username} Road Tax`);
                var amount = Math.round(Math.random()*30)+40;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just had to pay some road tax -${amount} coins`);
                userData.balance -= amount;
                break;
            case 34:
                console.log(`${client.users.resolve(message.author.id).username} Robbed`);
                var amount = Math.round(Math.random()*200)+100;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just had their house robbed -${amount} coins`);
                userData.balance -= amount;
                break;
            case 35:
                console.log(`${client.users.resolve(message.author.id).username} Crypto`);
                var amount = Math.round(Math.random()*400)+100;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just put some money into crypto and lost if all -${amount} coins`);
                userData.balance -= amount;
                break;
            case 36:
                console.log(`${client.users.resolve(message.author.id).username} Spotify`);
                var amount = 10;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just paid their spotify premium -${amount} coins`);
                userData.balance -= amount;
                break;
            case 37:
                console.log(`${client.users.resolve(message.author.id).username} Student Load`);
                var amount = Math.round(Math.random()*500)+500;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just had to pay some of their student loan -${amount} coins`);
                userData.balance -= amount;
                break;
            case 38:
                console.log(`${client.users.resolve(message.author.id).username} Tax`);
                var amount = userData.coinsSinceDaily > 200 ? userData.coinsSinceDaily*0.30 : 100;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just had to pay some income tax -${amount} coins`);
                userData.balance -= amount;
                userData.coinsSinceDaily -= amount;
                break;
            case 39:
                console.log(`${client.users.resolve(message.author.id).username} Therapist`);
                var amount = Math.round(Math.random()*150)+50;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} has just been to a therapist -${amount} coins`);
                userData.balance -= amount;
                break;
            case 40:
                console.log(`${client.users.resolve(message.author.id).username} Water Bill`);
                var amount = Math.round(Math.random()*60)+20;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just had to pay off their water bill -${amount} coins`);
                userData.balance -= amount;
                break;
            case 41:
                console.log(`${client.users.resolve(message.author.id).username} Youtube`);
                var amount = 10;
                message.channel.send(`${userData.tag ? "<@" + message.author.id + ">" : client.users.resolve(message.author.id).username} just paid their youtube premium subscription -${amount} coins`);
                userData.balance -= amount;
                break;
        }
    }
    
    await writeSlots(data);
};