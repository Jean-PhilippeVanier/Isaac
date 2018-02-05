class Fly {
  constructor(x, y, room) {
    this.x = x;
    this.y = y;
    this.room = room;
    this.speed = 3;
    this.health = 2;
    this.damage = 0.5;
    this.width = 20;
    this.height = 20;
    this.widthCol = 15;
    this.heightCol = 15;
    this.distance = 0;
    this.alive = true;
    this.sprite = new Animation("images/FliesAlone.png", 3.7, 1, 50, true, 1.2);
    this.sprite.changeMinMaxInterval(0, 4);
    this.sprite.setFlipped(true);

    //update angle de direction
    this.UpdateAngle = function() {
      this.dx = Isaac.x + 20 - this.x;
      this.dy = Isaac.y + 25 - this.y;
      this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
      this.angle = Math.atan2(this.dy, this.dx) * 180 / Math.PI;
    }; //speed
    this.UpdateSpeed = function() {
      this.speedX = this.speed * (this.dx / this.distance);
      this.speedY = this.speed * (this.dy / this.distance);
    };
    //mouvement
    this.Move = function() {
      this.UpdateAngle();
      this.UpdateSpeed();
      this.x += this.speedX;
      this.y += this.speedY;
    };
  }

  tick() {
    //Si on est dans la même pièce, les ennemis bougent.
    if (this.room == currentRoom) {
      this.Move();
    } //death check
    if (this.health <= 0) {
      this.alive = false;
    }
    this.sprite.tick(ctx, this.x, this.y);
    return this.alive;
  }
}
