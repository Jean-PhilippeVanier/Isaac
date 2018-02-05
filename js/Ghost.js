class Ghost {
  constructor(x, y, room) {
    this.x = x;
    this.y = y;
    this.room = room;
    this.speed = 6;
    this.health = 3;
    this.damage = 1;
    this.width = 20;
    this.height = 20;
    this.widthCol = 30;
    this.heightCol = 30;
    this.atkDelay = 50;
    this.distance = 0;
    this.alive = true;
    this.lastAttack = 0;
    this.now;
    this.invisible = true;
    this.invisTimer = 1500;
    this.lastInvis = 1002;
    //update angle
    this.UpdateAngle = function() {
      this.dx = Isaac.x + 20 - this.x;
      this.dy = Isaac.y + 25 - this.y;
      this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
      this.angle = Math.atan2(this.dy, this.dx) * 180 / Math.PI;
    }; //check la vitesse
    this.UpdateSpeed = function() {
      this.speedX = this.speed * (this.dx / this.distance);
      this.speedY = this.speed * (this.dy / this.distance);
    }; //mouvements
    this.Move = function() {
      this.UpdateAngle();
      this.UpdateSpeed();
      this.x += this.speedX;
      this.y += this.speedY;
    };
  }

  tick() {
    //pour le flicker effect, fantôme invisible
    this.now = new Date().getTime();
    if (this.invisible) {
      let frequency = 2000;
      if (Math.floor(Date.now() / frequency) % 2) {
        ctx.drawImage(imgGhost, 0, 0, 48, 48, this.x, this.y, 60, 60);
      }
    }

    if (this.invisible) {
      let present = new Date().getTime();
      if (present - this.invulnTimer > 1250) {
        this.invisible = false;
      }
    }
    //attack check
    if (this.room == currentRoom) {
      if (this.lastAttack == 0 || this.lastAttack + this.atkDelay <= this.now) {
        this.Move();
        this.lastAttack = new Date().getTime();
      }
    }
    if (this.health <= 0) {
      this.alive = false;
    }
    return this.alive;
  }
}
