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