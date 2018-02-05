class Coins {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.widthCol = 15;
    this.heightCol = 15;

    this.spriteCoins = new Animation(
      "images/coins_sprite.png",
      6,
      1,
      120,
      true,
      1.3
    );
    this.spriteCoins.changeMinMaxInterval(0, 6);
    this.spriteCoins.setFlipped(true);
  }
  tick() {
    this.spriteCoins.tick(ctx, this.x, this.y);
  }
}
