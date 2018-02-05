class Rock {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.widthCol = 25;
    this.heightCol = 25;
  }
  tick() {
    ctx.drawImage(imgRock, 0, 0, 160, 172, this.x - 10, this.y - 10, 50, 50);
  }
}
