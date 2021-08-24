var fs = require("fs");
const bigmon = require('./moneyHandler.js');

let mostRecentMessage = null;
let mostRecentTimeStamp = null;
let timeToWait = null;
let checkingRunning = false;

let mostRecentTimeStampPayment = null;
let timeToWaitPayment = null;

let facts = [];
let jokes = [];

module.exports = function (message, client) {
    mostRecentMessage = message;
    mostRecentTimeStamp = Date.now();
    if (!checkingRunning) {
        checkMostRecent();
        checkingRunning = true;
        getFacts();
        getJokes();
    }
}

function checkMostRecent(){
    //min 1 hours = 3600 milliseconds
    //max 3 hours = 10800 milliseconds

    let minimumTime = 3600;  //seconds
    let maximumTime = 10800; //seconds
    let minimumTimePayment = 1800; //seconds
    let maximumTimePayment = 5400; //seconds
    
    if (timeToWait == null) {
        timeToWait = Math.floor(Math.random()*(maximumTime-minimumTime)+minimumTime) * 1000;
        mostRecentTimeStampPayment = Date.now();
        timeToWaitPayment = Math.floor(Math.random()*(maximumTimePayment-minimumTimePayment)+minimumTimePayment) * 1000;
    }

    if (mostRecentMessage != null && (Date.now() - mostRecentTimeStamp) > timeToWait){
        decisions();
        mostRecentTimeStamp = Date.now();
        timeToWait = Math.floor(Math.random()*(maximumTime-minimumTime)+minimumTime) * 1000;
    }

    if ((Date.now() - mostRecentTimeStampPayment) > timeToWaitPayment){
        bigmon(mostRecentMessage);
        mostRecentTimeStampPayment = Date.now();
        timeToWaitPayment = Math.floor(Math.random()+(maximumTimePayment-minimumTimePayment)+minimumTimePayment) * 1000;
    }

    setTimeout(checkMostRecent,60000);
    let total = timeToWait - (Date.now() - mostRecentTimeStamp)
    let seconds = Math.floor((total/1000)%60);
    let minutes = Math.floor((total/60000)%60);
    let hours = Math.floor((total/3600000)%60);

    let totalPayment = timeToWaitPayment - (Date.now() - mostRecentTimeStampPayment)
    let secondsPayment = Math.floor((totalPayment/1000)%60);
    let minutesPayment = Math.floor((totalPayment/60000)%60);
    let hoursPayment = Math.floor((totalPayment/3600000)%60);

    console.log(`Idle: ${hours}:${minutes}:${seconds}\tPayment: ${hoursPayment}:${minutesPayment}:${secondsPayment}`);
}

//select what the bot should do
function decisions(){
    let messageTypeIndex = Math.floor(Math.random()*2);
    switch(messageTypeIndex){
        case 0: //tell fact
            var headings = ["Here is a fact","Random fact","Here is something you might not know","Did you know","Want to know something I just learned today","I just learned this today, its pretty intresting I think","Do you think this is as intresting as I found it?"];
            var index = Math.floor(Math.random()*headings.length);
            var factIndex = Math.floor(Math.random()*facts.length);
            mostRecentMessage.channel.send(`**${headings[index]}**:\n${facts[factIndex]}`);
            break;
        case 1: //tell joke
            var headings = ["Here is a joke","One joke coming up","This one will make you giggle. Or sigh","Prepere to sew up your sides","Let's hope this one makes you laugh","Random joke time"];
            var index = Math.floor(Math.random()*headings.length);
            var jokeIndex = Math.floor(Math.random()*jokes.length);
            mostRecentMessage.channel.send(`**${headings[index]}**:\n${jokes[jokeIndex]}`);
            break;
    }
}

//load all the facts into the facts array
function getFacts(){
    fs.readFile("./bot_idle_files/facts.txt", function(err,data){
        if (err) {
            return console.error(err);
        }
        let lines = data.toString().split("\n");
        lines.forEach(line => {
            facts.push(line.split(" | ").join("\n"));
        });
    });
}

function getJokes(){
    fs.readFile("./bot_idle_files/jokes.txt", function(err,data){
        if (err) {
            return console.error(err);
        }
        let lines = data.toString().split("\n");
        lines.forEach(line => {
            jokes.push(line.split(" | ").join("\n"));
        });
    });
}