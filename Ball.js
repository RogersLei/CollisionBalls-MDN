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