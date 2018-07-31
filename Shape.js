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