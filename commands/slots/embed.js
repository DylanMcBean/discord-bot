/* eslint-disable guard-for-in */
const Discord = require('discord.js');
const { payoutChart } = require('./slots-payouts.js');

const names = [];
const descriptions = [];

for (const el of payoutChart) {
    names.push(el.name);
    descriptions.push(el.description);
}

const slotsEmbed = new Discord.MessageEmbed()
    .setTitle('Slots')
    .setColor(0xEE6633) // #ee6633
    .setDescription('Showing slot Commands/Stats')
    .addFields(
        { name: 'Symbol', value: names.join('\n'), inline: true },
        { name: 'Payout', value: descriptions.join('\n'), inline: true })
    .addFields({ name: 'Commands', value: ['**!slots bet X**', '**!slots/!slots help**'] });

module.exports = {slotsEmbed};