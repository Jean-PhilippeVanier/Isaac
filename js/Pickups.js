class Pickup {
  constructor(x, y, itemNumber) {
    this.x = x;
    this.y = y;
    this.number = itemNumber;
    this.width = 20;
    this.height = 20;
    this.widthCol = 15;
    this.heightCol = 15;
  }
  tick() {
    //Regarde la classe pour savoir quel item incrémenter quand on le pickup
    switch (this.number) {
      case 0:
        ctx.drawImage(imgItemHeart, 0, 0, 80, 80, this.x, this.y, 40, 35);
        if (col.checkCollision(Isaac, this)) {
          Isaac.maxHealth += 1;
          Isaac.health += 1;
        }
        break;
      case 1:
        ctx.drawImage(imgItemDamage, 0, 0, 32, 32, this.x, this.y, 45, 45);
        if (col.checkCollision(Isaac, this)) {
          Isaac.atkDamage += 1;
        }
        break;
      case 2:
        ctx.drawImage(imgItemSpeed, 0, 0, 23, 19, this.x, this.y, 30, 30);
        if (col.checkCollision(Isaac, this)) {
          Isaac.atkDelay -= 100;
        }
        break;
    }
  }
}
