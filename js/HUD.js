class HUD {
  constructor(id) {}
  tick() {
    let hp_temp = 0;
    let width = 0;
    let health = Isaac.health;
    let bombs = Isaac.bombs;
    let coins = Isaac.coins;
    let keys = Isaac.keys;
    let damage = Isaac.atkDamage;
    let range = Isaac.range;
    let atkDelay = Isaac.atkDelay;
    let atkSpeed = Isaac.atkSpeed;
    let roomX = floor[currentRoom].x;
    let roomY = floor[currentRoom].y;
    //afficher les coeurs.
    while (hp_temp < health) {
      if (imgHeart.complete) {
        if (hp_temp + 0.5 == health) {
          ctx.drawImage(
            imgHeart,
            16,
            0,
            15,
            15,
            roomX + width,
            roomY + 10,
            35,
            35
          ); //Demi coeurs
        } else {
          ctx.drawImage(
            imgHeart,
            0,
            0,
            15,
            15,
            roomX + width,
            roomY + 10,
            35,
            35
          ); // Coeurs complets
        }
      }
      hp_temp += 1;
      width += 35;
    }
    if (imgHud.complete) {
      ctx.drawImage(imgHud, 0, 0, 15, 15, roomX, roomY + 100, 35, 35); //coins
      ctx.drawImage(imgHud, 15, 0, 15, 15, roomX, roomY + 150, 35, 35); //keys
      ctx.drawImage(imgHud, 0, 15, 15, 15, roomX, roomY + 200, 35, 35); //bombs
      ctx.drawImage(imgMoreHud, 0, 0, 61, 240, roomX + 5, roomY + 350, 35, 180); //stats
      ctx.font = "18px Arial";
      //Affiche la valeur des items / stats en text à côté
      ctx.fillText("x " + coins, roomX + 37, roomY + 125);
      ctx.fillText("x " + keys, roomX + 37, roomY + 175);
      ctx.fillText("x " + bombs, roomX + 37, roomY + 225);
      ctx.fillText(atkDelay, roomX + 37, roomY + 375);
      ctx.fillText(range, roomX + 37, roomY + 420);
      ctx.fillText(atkSpeed, roomX + 37, roomY + 465);
      ctx.fillText(damage, roomX + 37, roomY + 515);
    }
  }
}
