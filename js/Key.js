class Key {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 15;
    this.height = 15;
    this.widthCol = 15;
    this.heightCol = 15;
  }
  tick() {
    ctx.drawImage(imgKey, 0, 0, 25, 25, this.x, this.y, 35, 35);
  }
}
