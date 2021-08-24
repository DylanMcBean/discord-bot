const Discord = require('discord.js');
const p5 = require('node-p5');
const crypto = require("crypto");

let globalArgs = null;

module.exports = function (message, args, client) {
    globalArgs = args;
    p5.createSketch(sketch);
    setTimeout(() => {
        message.channel.send("**Logo**",{files: ["myCanvas.png"]});
    },600);
}


function sketch(p) {

    let gridSize = 50;
    let username = globalArgs.join(" ")
    const sha256Hasher = crypto.createHmac("sha256", "y45vfu654632g4324");
    const hash = hex2bin(sha256Hasher.update(username).digest("hex"));

    p.setup = () => {
        let canvas = p.createCanvas(500, 500);
        p.background("#515151");
        p.noStroke();
        p.fill(51);
        p.rect(50,50,p.width-100,p.height-100);
        p.stroke("#00abc0");
        p.strokeWeight(8);


        for(let x = 50; x < 450; x += gridSize){
            for(let y = 50; y < 450; y += gridSize){
                let number = parseInt(hash.substring(((y-50)/gridSize)*8+((x-50)/gridSize),(((y-50)/gridSize)*8+((x-50)/gridSize))+2),2);
                switch(number){
                    case 0:
                        p.line(x,y,x+gridSize,y+gridSize);
                        break;
                    case 1:
                        p.line(x+gridSize,y,x,y+gridSize);
                        break;
                    case 2:
                        p.line(x+(gridSize/2),y,x+(gridSize/2),y+gridSize);
                        break;
                    case 3:
                        p.line(x,y+(gridSize/2),x+gridSize,y+(gridSize/2));
                        break;
                }
            }
        }

        p.noFill();
        p.strokeWeight(10);
        p.stroke("#f8f8ff");
        p.rect(50,50,400,400);

        p.saveCanvas(canvas, 'myCanvas', 'png').then(filename => { console.log(`saved the canvas as ${filename}`);});
    }
}

function hex2bin(hex){
    let binary = "";
    for(let i = 0; i < hex.length; i+=2){
        binary += (parseInt(hex.substring(i,i+2), 16).toString(2)).padStart(8, '0');
    }
    return binary;
}