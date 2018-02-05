class Stand {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.widthCol = 15;
    this.heightCol = 15;
  }
  tick() {
    ctx.drawImage(imgStand, 0, 0, 118, 93, this.x, this.y + 5, 45, 35);
  }
}
