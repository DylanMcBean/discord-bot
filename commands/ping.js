module.exports = async function (message, args, client) {
    let hrStart = process.hrtime();
    let serverEmojis = client.emojis.cache.toJSON();
    let chosenEmoji = serverEmojis[Math.floor(Math.random()*client.emojis.cache.size)].identifier;
    let responce = await message.channel.send(`<:${chosenEmoji}> pong`);
    let hrDiff = process.hrtime(hrStart);

    return responce.edit(`<:${chosenEmoji}> pong, the ball took ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1]/1000000} ms to bounce back, heartbeat ${client.ws.ping}`);
}