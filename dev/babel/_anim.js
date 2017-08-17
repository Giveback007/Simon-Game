// </aux> animation;
function lightsOff() {
  for (let j = 0; j < 4; j++) {
    document.getElementById("btn"+j).removeAttribute("style");
    document.getElementById("btn-center").removeAttribute("style");
  }
 }

// </aux> animation;
function lightOnBtn(x) {
  let onBtn = document.getElementById("btn"+x);
  onBtn.style.backgroundColor = colors[x][0];
  onBtn.style.borderColor = colors[x][2];
  let center = document.getElementById("btn-center");
  center.style.backgroundColor = colors[x][2];
}

// </aux> animation;
function flash(times) {
  for (let i = 0; i < 4; i++) {lightOnBtn(i);}
  document.getElementById("btn-center").removeAttribute("style");
  setTimeout(lightsOff, 650);
  function goAgain() {
   if (times > 1) {times--; flash(times);}
  }
  setTimeout(goAgain, 900);
}

// </aux> animation;
let interval;
function roundAnimate(times, rate, foo) {
 let i = 0;
 interval = setInterval(function(){
  if (i > 3) {i = 0; times--;}
  if (times < 1) {foo();}
  if (times > 0) {
   lightsOff();
   lightOnBtn(i);
   i++;
  }
 }, rate);
}
