var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var minutes = 4;
var secondes = 60;
var interval;
var timer = document.getElementById("timer");
timer.textContent = "5 : 00";

function go(){
  interval = setInterval(function(){
    secondes --;
    timer.textContent = minutes + " : " + secondes;
    if (secondes < 10) {
      timer.textContent = minutes + " : 0" + secondes;
    }
    if (minutes === 0 && secondes === 0){
      arret();
    }
    if (secondes === 0) {
      minutes --;
      secondes = secondes + 60;
    }
  }, 1000);
}

function arret(){
  clearInterval(interval);
  minutes = 4;
  secondes = 60;
  timer.textContent = "5 : 00";
}

var backgroundImg = new Image();
backgroundImg.src = "spaceBG.jpg";
var vaisseauImg = new Image();
vaisseauImg.src = "vaisseau.png";

var render = window.onload = function(){
ctx.drawImage(backgroundImg, 0, 0);
for (var missile in missiles){
ctx.fillStyle = "white";
ctx.fillRect(missiles[missile].x, missiles[missile].y, 5, 2);
};
ctx.drawImage(vaisseauImg, vaisseau.x, vaisseau.y);
};

var vaisseau = {
  x: 100,
  y: 10,
  speed: 256
};

var missiles =  [];
var intervalMissile ;
var toucheAppuyee = {};

addEventListener("keydown", function(e){
  toucheAppuyee[e.keyCode] = true;
});
addEventListener("keyup", function(e){
  delete toucheAppuyee[e.keyCode];
});

function update(modifier) {
  if ((38 in toucheAppuyee) && (vaisseau.y > 0)){
    vaisseau.y -= vaisseau.speed * modifier;
  }
  if ((40 in toucheAppuyee) && (vaisseau.y < 370)) {
    vaisseau.y += vaisseau.speed * modifier;
  }
  if ((39 in toucheAppuyee) && (vaisseau.x < 570)) {
    vaisseau.x += vaisseau.speed * modifier;
  }
  if ((37 in toucheAppuyee) && (vaisseau.x > 0)) {
    vaisseau.x -= vaisseau.speed * modifier;
  }
  if (32 in toucheAppuyee) {
    missiles.push({x: vaisseau.x,y: vaisseau.y,speed: 5});

      if (! intervalMissile){
        missiles[0].y = vaisseau.y;
        // missile.x = vaisseau.x;
        intervalMissile = setInterval(function(){
          missiles[0].x += missiles[0].speed;
          if (missiles[0].x > 600) {
            clearInterval(intervalMissile);
            console.log("interval missile : ", intervalMissile);
            intervalMissile = null;
            missiles[0].x = vaisseau.x;
            missiles[0].y = vaisseau.y;
            // console.log("missile.x :", missiles.x);
            // console.log("vaisseau.x :", vaisseau.x);
          }
        }, 16)
        console.log("interval missile",intervalMissile);
      }
    }
};


function main(){
  var now = Date.now();
  var delta = now - then;
  update(delta/1000);
  render();
  then = now;
  requestAnimationFrame(main);
};

var then = Date.now();

main();
