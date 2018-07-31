const { Ball } = require('./Ball')
const { EvilCircle } = require('./EvilCircle')

// setup canvas
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var score = 0;
var count = 50;
var gaming = true;
var startTime = +new Date();

canvas.addEventListener('touchstart', (e)=>{
  circle.x = e.targetTouches[0].clientX;
  circle.y = e.targetTouches[0].clientY;
})
canvas.addEventListener('touchmove', (e)=>{
  circle.x = e.targetTouches[0].clientX;
  circle.y = e.targetTouches[0].clientY;
})


// function to generate random number
function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

// define array to store balls

var circle = new EvilCircle(200,200,20,20,20);
var balls = [];
// define loop that keeps drawing the scene constantly
circle.serControls();

function loop() {
  // ctx.clearRect(0,0,width,height);
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(0,0,width,height);
  while(balls.length < 50) {
    var size = random(10,20);
    var ball = new Ball(
      // ball position always drawn at least one ball width
      // away from the adge of the canvas, to avoid drawing errors
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-15,15),
      random(-15,15),
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      size
    );
    balls.push(ball);
  }
  for(var i = 0; i < balls.length; i++) {
    if(!balls[i].exists){
      continue;
    }
    balls[i].draw(ctx);
    balls[i].update(width,height);
    balls[i].collisionDetect(balls);
  }

  circle.draw(ctx);
  circle.checkBounds(width,height);
  count = circle.collisionDetect(balls,score,count);
  let countSpan = document.getElementsByClassName('count')[0];
  countSpan.innerHTML = count;

  if(gaming){
    requestAnimationFrame(loop);
  }
}



loop();