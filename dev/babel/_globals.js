const wrongSound = new Audio("assets/sounds/wrongSound.mp3");
const goodSound = new Audio("assets/sounds/congrats.mp3");
const winSound = new Audio("assets/sounds/fin.mp3");
const sounds = [new Audio("assets/sounds/simonSound1.mp3"),
                new Audio("assets/sounds/simonSound2.mp3"),
                new Audio("assets/sounds/simonSound3.mp3"),
                new Audio("assets/sounds/simonSound4.mp3")]

//    colors =  ['lightst','lighter',  'main' ,'darker' ,'darkest']
const colors = [["#87DF66","#6DD247","#55C42C","#3DAF13","#2E9209"], // green
                ["#F36F84","#E84E66","#D9314C","#C11530","#A10A22"], // red
                ["#6F63BC","#5648AA","#43349F","#2F208E","#231676"], // blue
                ["#FFE274","#F5D353","#E6C134","#CDA717","#AB890A"]];// yellow

let gameMem = [];
let nowMem = [];
let counterMain = 0;
let counterNow = 0;
let playerTurn = false;
let strictOn = false;
