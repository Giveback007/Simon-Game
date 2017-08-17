"use strict";

//@prepros-append babel/_globals.js
//@prepros-append babel/_ui.js
//@prepros-append babel/_anim.js
//@prepros-append babel/_main.js

var wrongSound = new Audio("assets/sounds/wrongSound.mp3");
var goodSound = new Audio("assets/sounds/congrats.mp3");
var winSound = new Audio("assets/sounds/fin.mp3");
var sounds = [new Audio("assets/sounds/simonSound1.mp3"), new Audio("assets/sounds/simonSound2.mp3"), new Audio("assets/sounds/simonSound3.mp3"), new Audio("assets/sounds/simonSound4.mp3")];

//    colors =  ['lightst','lighter',  'main' ,'darker' ,'darkest']
var colors = [["#87DF66", "#6DD247", "#55C42C", "#3DAF13", "#2E9209"], // green
["#F36F84", "#E84E66", "#D9314C", "#C11530", "#A10A22"], // red
["#6F63BC", "#5648AA", "#43349F", "#2F208E", "#231676"], // blue
["#FFE274", "#F5D353", "#E6C134", "#CDA717", "#AB890A"]]; // yellow

var gameMem = [];
var nowMem = [];
var counterMain = 0;
var counterNow = 0;
var playerTurn = false;
var strictOn = false;

function toggleStrict() {
  strictOn = !strictOn;
  if (strictOn) {
    document.getElementById("strict").classList.add('on');
  } else {
    document.getElementById("strict").classList.remove("on");
  }
}

function startGame() {
  document.getElementById("start-btn").style.opacity = 0;
  setTimeout(function () {
    document.getElementById("now-count").innerHTML = "";
  }, 650);
  setTimeout(newRound, 700);
}

// </aux> animation;
function lightsOff() {
  for (var j = 0; j < 4; j++) {
    document.getElementById("btn" + j).removeAttribute("style");
    document.getElementById("btn-center").removeAttribute("style");
  }
}

// </aux> animation;
function lightOnBtn(x) {
  var onBtn = document.getElementById("btn" + x);
  onBtn.style.backgroundColor = colors[x][0];
  onBtn.style.borderColor = colors[x][2];
  var center = document.getElementById("btn-center");
  center.style.backgroundColor = colors[x][2];
}

// </aux> animation;
function flash(times) {
  for (var i = 0; i < 4; i++) {
    lightOnBtn(i);
  }
  document.getElementById("btn-center").removeAttribute("style");
  setTimeout(lightsOff, 650);
  function goAgain() {
    if (times > 1) {
      times--;flash(times);
    }
  }
  setTimeout(goAgain, 900);
}

// </aux> animation;
var interval = void 0;
function roundAnimate(times, rate, foo) {
  var i = 0;
  interval = setInterval(function () {
    if (i > 3) {
      i = 0;times--;
    }
    if (times < 1) {
      foo();
    }
    if (times > 0) {
      lightsOff();
      lightOnBtn(i);
      i++;
    }
  }, rate);
}

// </aux>
function speed() {
  if (counterMain >= 13) {
    return 500;
  }
  if (counterMain >= 9) {
    return 650;
  }
  if (counterMain >= 5) {
    return 850;
  } else {
    return 1000;
  }
}

// \/ \/ \/ player functions \/ \/ \/

// </aux>
function playerGo() {
  playerTurn = true;
}

// </master>
function playerClick(x) {
  if (playerTurn) {
    lightsOff();
    sounds[x].play();
    lightOnBtn(x);
    nowMem.push(x);
    var clickNum = nowMem.length;
    var gotRight = isCorrect(clickNum - 1, x);
    if (gotRight) {
      document.getElementById("now-count").innerHTML = clickNum;
      if (clickNum >= gameMem.length) {
        playerTurn = false;
        nowMem = [];
        setTimeout(function () {
          document.getElementById("now-count").innerHTML = '<i class="fa fa-thumbs-up" aria-hidden="true"></i>';
        }, 750);
        if (counterMain >= 20) {
          setTimeout(function () {
            winSound.play();
            document.getElementById("now-count").innerHTML = '<i class="fa fa-trophy" aria-hidden="true"></i>';
            roundAnimate(999, 150, lightsOff);
          }, 1200);
          return;
        } else {
          setTimeout(function () {
            goodSound.play();newRound();
          }, 1200);
          return;
        }
      } else {
        return;
      }
    } else if (!gotRight && !strictOn) {
      playerTurn = false;
      nowMem = [];
      setTimeout(function () {
        wrongSound.play();
        document.getElementById("now-count").innerHTML = '<i class="fa fa-thumbs-down" aria-hidden="true"></i>';
      }, 600);
      setTimeout(function () {
        playGameMem(0);
      }, 1200);
    } else if (!gotRight && strictOn) {
      playerTurn = false;
      gameMem = [];
      nowMem = [];
      setTimeout(function () {
        wrongSound.play();
        document.getElementById("now-count").innerHTML = '<i class="fa fa-thumbs-down" aria-hidden="true"></i>';
      }, 600);
      setTimeout(function () {
        newRound();
      }, 1200);
    }
  }
}

function restart() {
  playerTurn = false;
  gameMem = [];
  nowMem = [];
  setTimeout(function () {
    newRound();
  }, 600);
}

// </aux>
function isCorrect(clk, x) {
  // console.log("click"+clk,gameMem[clk]+" gameMem"+" clk", x);
  if (gameMem[clk] === x) {
    return true;
  } else {
    return false;
  }
}

// /\ /\ /\ player functions /\ /\ /\

// </master> animation;
function playGameMem(x) {
  var nowCount = document.getElementById("now-count");
  lightsOff();
  lightOnBtn(gameMem[x]);
  document.body.style.backgroundColor = colors[gameMem[x]][0];
  sounds[gameMem[x]].play();
  nowCount.innerHTML = x + 1;
  function goAgain() {
    if (x < gameMem.length - 1) {
      x++;
      return playGameMem(x);
    } else {
      setTimeout(function () {
        document.body.style.backgroundColor = "";nowCount.innerHTML = 'GO!';
      }, 650);
      setTimeout(function () {
        nowCount.innerHTML = '';
      }, 1100);
      setTimeout(function () {
        flash(1);
      }, 680);
      setTimeout(playerGo, 1000);
      console.log(gameMem);
    }
  }
  setTimeout(lightsOff, speed() - 150);
  setTimeout(goAgain, speed());
}

// </master>
function newRound() {
  clearInterval(interval);
  var x = 2;
  flash(x);
  function addToGameMem() {
    // </>
    var rand = Math.floor(Math.random() * 4);
    gameMem.push(rand);
    var num = counterMain = gameMem.length;
    if (num < 10) {
      num = "0" + num;
    }
    document.getElementById("main-count").innerHTML = num;
    playGameMem(0);
  } // </>

  setTimeout(addToGameMem, 1000 * x);
}

roundAnimate(999, 500, lightsOff);