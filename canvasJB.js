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
var tieFighterImg = new Image();
tieFighterImg.src = "tie_fighter.png";
var deathStarImg = new Image();
deathStarImg.src = "death_star.png";

var render = window.onload = function(){
  ctx.drawImage(backgroundImg, 0, 0);
  ctx.drawImage(vaisseauImg, vaisseau.x, vaisseau.y);
  ctx.drawImage(tieFighterImg, tieFighters.x, tieFighters.y);
  tieFighters.x -= tieFighters.speed;
  ctx.drawImage(deathStarImg, deathStar.x, deathStar.y);
  deathStar.x -= deathStar.speed;
  for (var missile in missiles){
    ctx.fillStyle = "#39FF02";
    ctx.fillRect(missiles[missile].x, missiles[missile].y, 5, 2);
  };
};

var vaisseau = {
  x: 100,
  y: 10,
  speed: 256
};

var tieFighters = {x:650, y: Math.floor((Math.random()*360)), speed: 2};


var deathStar = {
  x: 800,
  y: 100,
  speed: 1
}

var missiles =  [];
var intervalMissiles = [];
var toucheAppuyee = {};


addEventListener("keydown", function(e){
  if (e.keyCode === 32) {
    var missile = {x: vaisseau.x + 15, y: vaisseau.y + 15, speed: 5};
    missiles.push(missile);
    console.log("numMissile ", missiles);
    var  intervalMissile = setInterval(function(){
      missile.x += missile.speed;
      if (missile.x > 600) {
        console.log ("interval missiles : ", intervalMissiles, intervalMissiles[intervalMissiles.indexOf(intervalMissile)]);
        clearInterval(intervalMissiles[intervalMissiles.indexOf(intervalMissile)]);
        intervalMissiles.splice(intervalMissiles.indexOf(intervalMissile), 1);
        missiles.splice(missile, 1);
      }
    }, 16)
    intervalMissiles.push(intervalMissile);
  } else {
    toucheAppuyee[e.keyCode] = true;
  }
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
