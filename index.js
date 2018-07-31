(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
  const { Shape } = require('./Shape.js');
// define Ball constructor
  function Ball(x, y, velX, velY, color, size) {
    Shape.call(this,x,y,velX, velY,size)
    this.color = color;
    this.exists = true;
  }
  
  Ball.prototype = new Shape();
  Ball.prototype.constructor = Ball;


  // define ball draw method
  
Ball.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// define ball update method

Ball.prototype.update = function(width,height) {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

// define ball collision detection

Ball.prototype.collisionDetect = function(balls) {
  for(var j = 0; j < balls.length; j++) {
    if(!this.exists) continue;
    if(!(this === balls[j])) {
      let dx = this.x - balls[j].x;
      let dy = this.y - balls[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + this.random(0,255) + ',' + this.random(0,255) + ',' + this.random(0,255) +')';
      }
    }
  }
};


module.exports.Ball = Ball;
},{"./Shape.js":3}],2:[function(require,module,exports){
const { Shape } = require('./Shape.js');
  function EvilCircle(x, y, velX, velY,size){
    Shape.call(this,x,y,velX, velY,size)
    this.color = "white";
  }

  EvilCircle.prototype = new Shape();
  EvilCircle.prototype.constructor = EvilCircle;
  
  EvilCircle.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }
  
  EvilCircle.prototype.checkBounds = function (width,height) {
    if((this.x + this.size) >= width) {
      this.x -= this.size;
    }
  
    if((this.x - this.size) <= 0) {
      this.x += this.size;
    }
  
    if((this.y + this.size) >= height) {
      this.y -= this.size;
    }
  
    if((this.y - this.size) <= 0) {
      this.y += this.size;
    }
  
  }
  
  EvilCircle.prototype.serControls = function () {
    window.onkeydown = (e) => {
      if(e.keyCode === 40) {
        this.y += this.velX;
      } else if(e.keyCode === 38) {
        this.y -= this.velX;
      } else if(e.keyCode === 37) {
        this.x -= this.velX;
      } else if(e.keyCode === 39) {
        this.x += this.velX;
      }
    }
  }
  
  EvilCircle.prototype.collisionDetect = function (balls,score,count) {
    for(var k = 0; k < balls.length; k++) {
      if(balls[k].exists){
        let dx = this.x - balls[k].x;
        let dy = this.y - balls[k].y;
        let ds = Math.sqrt(dx * dx + dy * dy);
        if (ds < this.size + balls[k].size) {
          balls[k].exists = false;
          score ++ ;
          count -- ;
        }
      }
    }
    return count;
  }

  module.exports.EvilCircle = EvilCircle;
},{"./Shape.js":3}],3:[function(require,module,exports){
function Shape(x,y,velX,velY,size){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.size = size;
}

Shape.prototype.random = function (min,max){
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

module.exports.Shape = Shape;
},{}],4:[function(require,module,exports){
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
},{"./Ball":1,"./EvilCircle":2}]},{},[4]);
