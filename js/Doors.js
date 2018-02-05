class Doors {
  constructor(x, y, position) {
    this.x = x;
    this.y = y;
    this.position = position;
    this.width = 40;
    this.height = 40;
    this.widthCol = 2;
    this.heightCol = 2;
    this.open = false;
    this.image = new Image();
  }
  tick() {
    //si les portes sont fermées on affiche une image, sinon l'autre.
    if (this.open == false) {
      this.image.src = "images/Closed.png";
    } else {
      this.image.src = "images/Open.png";
    } //Si la pièce est vide, les portes ouvrent.
    if (floor[currentRoom].emptyRoom) {
      this.open = true;
    } else {
      this.open = false;
    } //positions du dessin des portes.
    if (this.position == "right") {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(Math.PI * 0.5);
      ctx.drawImage(this.image, 0, 0, 51, 35, 0 - 15, 0 - 72, 81, 65);
      ctx.restore();
    } else if (this.position == "bottom") {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(Math.PI);
      ctx.drawImage(this.image, 0, 0, 51, 35, 0 - 45, 0 - 72, 81, 65);
      ctx.restore();
    } else if (this.position == "left") {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(Math.PI * -0.5);
      ctx.drawImage(this.image, 0, 0, 51, 35, 0 - 70, 0 - 72, 81, 65);
      ctx.restore();
    } else {
      ctx.drawImage(this.image, 0, 0, 51, 35, this.x - 30, this.y - 32, 81, 65);
    }
  }
}
