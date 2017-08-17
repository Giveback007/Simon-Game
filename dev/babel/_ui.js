function toggleStrict() {
 strictOn = !strictOn;
 if (strictOn) {
  document.getElementById("strict").classList.add('on');
 }
 else {document.getElementById("strict").classList.remove("on");}
}

function startGame() {
 document.getElementById("start-btn").style.opacity = 0;
 setTimeout(function() {document.getElementById("now-count").innerHTML = "";}, 650);
 setTimeout(newRound, 700);
}
