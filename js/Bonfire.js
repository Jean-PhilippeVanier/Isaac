class Bonfire {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.health = 3;
    this.width = 40;
    this.height = 40;
    this.widthCol = 10;
    this.heightCol = 10;
    this.damage = 1;
    this.alive = true;
    //animations
    this.spriteFeu = new Animation(
      "images/fire_sprite.png",
      6,
      2,
      50,
      true,
      1.3
    );
    this.spriteFeu.changeMinMaxInterval(0, 6);
    this.spriteFeu.setFlipped(true);
    this.spriteBois = new Animation(
      "images/bois_sprite.png",
      2,
      1,
      50,
      true,
      1.3
    );
    this.spriteBois.changeMinMaxInterval(1, 1);
    this.spriteBois.setFlipped(true);
  }
  tick() {
    //check la survie
    if (this.health <= 0) {
      this.alive = false;
    }
    if (this.alive) {
      this.spriteBois.tick(ctx, this.x, this.y + 22);
      this.spriteFeu.tick(ctx, this.x, this.y);
    } else {
      this.spriteBois.changeMinMaxInterval(1, 2);
      this.spriteBois.tick(ctx, this.x, this.y + 22);
      this.damage = 0;
    }
    return this.alive;
  }
}
