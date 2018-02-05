class Tears {
  constructor(x, y, speed, range, direction) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.widthCol = 10;
    this.heightCol = 10;
    this.speed = speed;
    this.range = x + range;
    this.range2 = x - range;
    this.range3 = y + range;
    this.range4 = y - range;
    this.direction = direction;
    this.alive = true;
  }
  tick() {
    ctx.drawImage(imgTears, 0, 0, 13, 13, this.x, this.y, 15, 15);
    ///////////////////////////////////////Checks variés pour déterminer quand les projectiles meurent/////////////////////////
    if (this.direction == "right") {
      this.x += this.speed;
      if (this.x >= this.range || this.x >= floor[currentRoom].x + 820) {
        this.alive = false;
      }
    } else if (this.direction == "left") {
      this.x -= this.speed;
      if (this.x <= this.range2 || this.x <= floor[currentRoom].x + 60) {
        this.alive = false;
      }
    } else if (this.direction == "up") {
      this.y -= this.speed;
      if (this.y <= this.range4 || this.y <= floor[currentRoom].y + 60) {
        this.alive = false;
      }
    } else if (this.direction == "bot") {
      this.y += this.speed;
      if (this.y >= this.range3 || this.y >= floor[currentRoom].y + 510) {
        this.alive = false;
      }
    }
    for (var i = 0; i < obstacles.length; i++) {
      if (col.checkCollision(this, obstacles[i])) {
        if (obstacles[i] instanceof Bonfire) {
          obstacles[i].health -= Isaac.atkDamage;
        }
        this.alive = false;
      }
    } //Hit detection pour les projectiles
    for (var i = 0; i < enemyList.length; i++) {
      if (col.checkCollision(this, enemyList[i])) {
        this.alive = false;
        enemyList[i].health -= Isaac.atkDamage;
      }
    }
    return this.alive;
  }
}
