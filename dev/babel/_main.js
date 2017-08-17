// </aux>
function speed() {
 if (counterMain >= 13) {return 500;}
 if (counterMain >= 9) {return 650;}
 if (counterMain >= 5) {return 850;}
 else {return 1000;}
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
  let clickNum = nowMem.length;
  let gotRight = isCorrect(clickNum - 1, x);
  if (gotRight) {
   document.getElementById("now-count").innerHTML = clickNum;
   if (clickNum >= gameMem.length) {
    playerTurn = false;
    nowMem = [];
    setTimeout(function() {
     document.getElementById("now-count")
     .innerHTML = '<i class="fa fa-thumbs-up" aria-hidden="true"></i>';
    }, 750);
    if (counterMain >= 20) {
     setTimeout(function() {
      winSound.play();
      document.getElementById("now-count")
      .innerHTML = '<i class="fa fa-trophy" aria-hidden="true"></i>'
      roundAnimate(999, 150, lightsOff);
     }, 1200);
     return;
    } else {
     setTimeout(function() {goodSound.play(); newRound();}, 1200);
     return;
    }
   } else {return;}
  }
  else if (!gotRight && !strictOn) {
   playerTurn = false;
   nowMem = [];
   setTimeout(function() {
    wrongSound.play();
    document.getElementById("now-count")
     .innerHTML = '<i class="fa fa-thumbs-down" aria-hidden="true"></i>';
   }, 600);
   setTimeout(function() {playGameMem(0);}, 1200);
  }
  else if (!gotRight && strictOn) {
   playerTurn = false;
   gameMem = [];
   nowMem = [];
   setTimeout(function() {
    wrongSound.play();
    document.getElementById("now-count")
     .innerHTML = '<i class="fa fa-thumbs-down" aria-hidden="true"></i>';
   }, 600);
   setTimeout(function() {newRound();}, 1200);
  }
 }
}

function restart() {
 playerTurn = false;
   gameMem = [];
   nowMem = [];
   setTimeout(function() {newRound();}, 600);
}

// </aux>
function isCorrect(clk, x) {
 // console.log("click"+clk,gameMem[clk]+" gameMem"+" clk", x);
 if (gameMem[clk] === x) {return true;}
 else {return false;}
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
  }
  else {
   setTimeout(function() {document.body.style.backgroundColor = ""; nowCount.innerHTML = 'GO!';}, 650);
   setTimeout(function() {nowCount.innerHTML = '';}, 1100);
   setTimeout(function() {flash(1);}, 680);
   setTimeout(playerGo, 1000);
   console.log(gameMem);
  }
 }
 setTimeout(lightsOff, speed() - 150)
 setTimeout(goAgain, speed());
}

// </master>
function newRound() {
 clearInterval(interval);
 let x = 2;
 flash(x);
 function addToGameMem() { // </>
  let rand = Math.floor(Math.random()*4);
  gameMem.push(rand);
  let num = counterMain = gameMem.length;
  if (num < 10) {num = "0" + num}
  document.getElementById("main-count").innerHTML = num;
  playGameMem(0);
 } // </>

 setTimeout(addToGameMem, 1000 * x);
}

roundAnimate(999, 500, lightsOff);
