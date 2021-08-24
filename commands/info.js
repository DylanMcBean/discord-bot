const Discord = require('discord.js');
const infoFuncs = require("./infoFunctions.js");
const timeComplex = require("./timeComplexities.js");

const usableLanguages = ["python","py","java","javascript","js","cplusplus","c++","cpp"]

const sortingInfo = [
    "quick sort",
    "merge sort",
    "intro sort", 
    "heap sort", 
    "insertion sort",
    "block sort",
    "tim sort",
    "selection sort",
    "shell sort",
    "bubble sort",
    "radix sort",
    "bogo sort",
    infoFuncs.sortingAlgs
]

const allInformationPoints = {
    "sorting algorithms":sortingInfo,
    "time complexities":timeComplex
}

let specialized = {}

function createSpecial(){
    Object.values(allInformationPoints).forEach(element => {
        if (typeof element !== "function") {
            element.slice(0,-1).forEach(obj =>{
                specialized[obj] = element.slice(-1).pop();
            })
        }
    })
}

module.exports = function (message, args, client) {

    let language = args[args.length-1];
    createSpecial();
    if (args.length == 0) {
        message.channel.send(`You need to add an argument after info like:\n - !info binary search python\n - !info bubble sort java\n - !info all -> this will list all information points.`);
        return;
    } else if (args.length == 1 && args[0] == "all") {
        //display a list of all information points
        let allInformationPointsString = [];
        Object.keys(allInformationPoints).forEach(element => { // get all items into a list
            allInformationPointsString.push(element)
        });
        allInformationPointsString = "◽ " + allInformationPointsString.join("\n◽ ")

        const embed = new Discord.MessageEmbed()
        .setTitle('Information [**All**]')
        .setColor(0xff0000)
        .setDescription('Showing all information points')
        .addFields( { name: "Information",value: allInformationPointsString } );
        message.channel.send(embed);
    } else if (Object.keys(allInformationPoints).includes(args.join(" "))){
        let searchTerm = args.join(" ");
        //display a list of all information points
        if (typeof allInformationPoints[searchTerm] !== "function") { // check of object is an array or a function
            let allInformationPointsString = [];
            allInformationPoints[searchTerm].slice(0,-1).forEach(element => { // get all items into a list
                allInformationPointsString.push(element)
            });
            allInformationPointsString = "◽ " + allInformationPointsString.join("\n◽ ")

            const embed = new Discord.MessageEmbed()
            .setTitle(`Information [${searchTerm}]`)
            .setColor(0x00ddff)
            .addFields( { name: searchTerm,value: allInformationPointsString } );
            message.channel.send(embed);
        } else { // if its a function just run it
            allInformationPoints[searchTerm](message,args,client);
        }
    } else if (Object.keys(specialized).includes(args.join(" "))) {
        let searchTerm = args.join(" ");
        specialized[searchTerm](message,null,searchTerm);
    } else if (Object.keys(specialized).includes(args.slice(0,-1).join(" "))) {
        if (usableLanguages.includes(language)) {
            let searchTerm = args.slice(0,-1).join(" ");
            specialized[searchTerm](message,language,searchTerm);
        } else {
            message.channel.send("I don't support that language yet.");
        }
    }
}