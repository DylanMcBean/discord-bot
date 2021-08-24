/* eslint-disable github/array-foreach */
const { readSlots, writeSlots, getOrSet, addCommas } = require('../frequently-used.js');
const { payout2xMultiplier, payout3xMultiplier } = require('./slots/slots-payouts.js');
const { slotsEmbed } = require('./slots/embed.js');
const Discord = require('discord.js');

module.exports = async function (message, args, client) {

    if (args.length === 0 || args[0] === 'help') {
        message.channel.send(slotsEmbed);
    } else if (args[0] === 'bet') {
        // Early return if wager is less than 2
        if (args[1] === undefined || args[1] < 2) {
            message.channel.send('Minimum bet of 2');
            return;
        }

        const data = await readSlots();

        const userId = message.author.id;

        /** The data of the user who executed the command */
        const userData = getOrSet(data, userId, { balance: 500, last: 0, coinsSinceDaily: 0, tag: false, dailyStreak: 0});

        if (Number(userData.balance) < args[1]) {
            message.channel.send(`You tried to bet with ${addCommas(args[1])} but you only have ${addCommas(userData.balance)}`);
            return;
        }

        const wager = Number(args[1]);

        if (Number.isNaN(wager)) {
            message.channel.send('Invalid command!');
            return;
        }

        const amountOfGames = args.length == 2 ? 1 : Number(args[2]);

        if (amountOfGames <= 0 || amountOfGames > 10000){
            message.channel.send("Invalid Bet Amount, min spins is 1 and max spins is 10,000.");
            return;
        }

        let gamesValues = [];
        const user = client.users.resolve(message.author.id).username;
        let totalGross = 0;
        let totalWager = wager*amountOfGames;

        if (Number(userData.balance) < totalWager){
            message.channel.send(`You tried to bet with ${addCommas(totalWager)} but you only have ${addCommas(userData.balance)}`);
            return;
        }

        //House odds set 15% higher than payout amounts
        const baseHouseOdds = [575,115,82,51.75,31.05,20.7,12.65,5.75,2.3];
        let wagerDivisor = Math.max(1,totalWager/2000);
        const houseOdds = [
            baseHouseOdds[0]**(1.4-(0.4/wagerDivisor)), //x 575 -> 10733.32
            baseHouseOdds[1]**(1.5-(0.5/wagerDivisor)), //x 115 -> 1233.23
            baseHouseOdds[2]**(1.5-(0.5/wagerDivisor)), //x 82 -> 742.54
            baseHouseOdds[3]**(1.5-(0.5/wagerDivisor)), //x 51.75 -> 361.64
            baseHouseOdds[4]**(1.6-(0.6/wagerDivisor)), //x 31.05 -> 243.94
            baseHouseOdds[5]**(1.6-(0.6/wagerDivisor)), //x 20.7 -> 127.51
            baseHouseOdds[6]**(1.6-(0.6/wagerDivisor)), //x 12.65 -> 57.98
            baseHouseOdds[7]**(1.7-(0.7/wagerDivisor)), //x 5.79 -> 19.56
            baseHouseOdds[8]**(2-(1/wagerDivisor))      //x 2.3 -> 5.29 
        ];
        
        //Get the cube rooted weights
        const cubeRootedOdds = [];
        let cubeRootedOddsSum = 0;
        for(let elm of houseOdds) {
            cubeRootedOdds.push(elm**(1/3));
            cubeRootedOddsSum += elm**(1/3);
        }

        //Get new calculated weights
        const newWeights = [];
        let newWeightsSum = 0;
        for(let elm of cubeRootedOdds) {
            newWeights.push(cubeRootedOddsSum/elm);
            newWeightsSum += cubeRootedOddsSum/elm;
        }
        const newWeightsNormalized = [];
        for(let elm of newWeights) {
            newWeightsNormalized.push(elm/newWeightsSum);
        }

        //Set weights to their respective symbols
        const symbolsArray = [
            [':octopus:', newWeightsNormalized[0]],
            [':chicken:', newWeightsNormalized[1]],
            [':hedgehog:', newWeightsNormalized[2]],
            [':hatching_chick:', newWeightsNormalized[3]],
            [':orangutan:', newWeightsNormalized[4]],
            [':raccoon:', newWeightsNormalized[5]],
            [':whale:', newWeightsNormalized[6]],
            [':deer:', newWeightsNormalized[7]],
            [':owl:', newWeightsNormalized[8]]
        ];

        //Bars with their symbols on each
        let bar1 = [0,1,1,1,2,2,2,3,3,3,4,4,4,4,4,5,5,5,5,5,5,5,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8];
        let bar2 = [0,1,1,2,2,2,3,3,3,4,4,4,4,4,5,5,5,5,5,6,6,6,6,6,6,6,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8];
        let bar3 = [0,1,2,2,2,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,6,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8];
        
        for(let i = 0; i < amountOfGames; i++) {
            let multi = 0;
            let symbol = "";
            //let symbols = [weighted(symbolsArray),weighted(symbolsArray),weighted(symbolsArray)];
            let symbols = [
                symbolsArray[bar1[Math.floor(Math.random()*bar1.length)]][0],
                symbolsArray[bar2[Math.floor(Math.random()*bar2.length)]][0],
                symbolsArray[bar3[Math.floor(Math.random()*bar3.length)]][0]
            ];
            let payout = [0, 1];
            // Three of a kind
            if (symbols[0] === symbols[1] && symbols[1] === symbols[2]) {
                payout = payout3xMultiplier[symbols[0]];
                multi = 3;
                symbol = symbols[0];
                // Two of a kind
            } else if (symbols[0] === symbols[1] || symbols[0] === symbols[2] || symbols[1] === symbols[2]) {
                multi = 2;
                if (symbols[0] === symbols[1] || symbols[0] === symbols[2]) {
                    payout = payout2xMultiplier[symbols[0]];
                    symbol = symbols[0];
                } else {
                    payout = payout2xMultiplier[symbols[1]];
                    symbol = symbols[1];
                }
            }

            
            totalGross += Math.floor((wager * payout[0]) / Math.max(1, payout[1]));
            gamesValues.push({"symbols":symbols,"payout":payout,"multi":multi,"symbol":symbol});
        }

        let slotDict = {};
        gamesValues.forEach(elm =>{
            if (elm.multi == 0){
                if ("0:1" in slotDict)
                    slotDict["0:1"] += 1;
                else
                    slotDict["0:1"] = 1;
            } else {
                if (`${elm.symbol} x${elm.multi}` in slotDict)
                    slotDict[`${elm.symbol} x${elm.multi}`] += 1;
                else
                    slotDict[`${elm.symbol} x${elm.multi}`] = 1;
            }
        });

        var items = Object.keys(slotDict).map(function(key) {return [key, slotDict[key]]});
        items.sort(function(first, second) {return second[1] - first[1]});
          

        let commandNameString = [];
        let commandDescriptionString = [];

        if (amountOfGames <= 20) {
            gamesValues.forEach(element => {
                commandNameString.push(`[${element.symbols.join("   ")}]`);
                commandDescriptionString.push(`${element.payout.join(" : ")}`);
            })
        } else {
            items.forEach(element => {
                commandNameString.push(`[${element[0]}]`);
                commandDescriptionString.push(`${element[1]}`);
            })
        }

        commandNameString = commandNameString.join("\n");
        commandDescriptionString = commandDescriptionString.join("\n");

        const embed = new Discord.MessageEmbed()
        .setTitle(`Slots Spin`)
        .setDescription(`User: ${user}, Bet: ${addCommas(wager)}, Games: ${addCommas(amountOfGames)}`)
        .setColor(0x306fd0)
        .addFields( { name: amountOfGames <= 20 ? "Spins" : "Payouts",value: commandNameString, inline: true}, {name: amountOfGames <= 20 ? "Payouts" : "Amounts", value: commandDescriptionString, inline: true} )
        .setFooter(`Bet: ${addCommas(totalWager)}, Won: ${addCommas(totalGross)}, Net: ${addCommas(totalGross-totalWager)}`);
        message.channel.send(embed);
        
        userData.balance = Number(userData.balance) + totalGross-totalWager;
        userData.coinsSinceDaily = Number(userData.coinsSinceDaily) + totalGross-totalWager;
        await writeSlots(data);
    } else {
        message.channel.send('Invalid command!');
    }
};


function weighted(arr){
    total = 0;
    arr.forEach(function(elm){
        total += parseFloat(elm[1]);
    });
    let number = Math.random()*total;
    let returnVal = ""
    arr.forEach(function(elm){
        if (number <= elm[1]){
            if (returnVal == "")returnVal = elm[0];
        }
        else
            number -= elm[1];
    });
    return returnVal;
}
/**
 *
 * @param {Number} value
 * @param {Number} istart @param {Number} istop
 * @param {Number} ostart @param {Number} ostop
 * @param {Boolean} clamped
 * @returns {Number}
 */
function map(value, istart, istop, ostart, ostop, clamped) {
    let mappedValue = ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
    if (clamped) {
        mappedValue = Math.min(ostop, Math.max(mappedValue, ostart));
    }
    return mappedValue;
}