class Room {
  constructor(x, y, preset) {
    this.x = x;
    this.y = y;
    this.preset = preset;
    this.width = 900;
    this.height = 600;
    this.maxEnemy = 5;
    this.enemyCount = 0;
    this.increment = 0;
    this.room = 0;
    this.emptyRoom = false;
    //Les portes par pièces
    //Différentes pièces requièrent différents portes//////
    if (this.x == -900) {
      spriteList.push(new Doors(this.x + 820, this.y + 275, "right"));
    } else if (this.x == 0) {
      spriteList.push(new Doors(this.x + 80, this.y + 275, "left"));
      spriteList.push(new Doors(this.x + 820, this.y + 275, "right"));
    } else if (this.x == 900) {
      spriteList.push(new Doors(this.x + 80, this.y + 275, "left"));
    }
    if (this.y == -600) {
      spriteList.push(new Doors(this.x + 440, this.y + 514, "bottom"));
    } else if (this.y == 0) {
      spriteList.push(new Doors(this.x + 440, this.y + 514, "bottom"));
      spriteList.push(new Doors(this.x + 425, this.y + 50, "top"));
    } else if (this.y == 600) {
      spriteList.push(new Doors(this.x + 425, this.y + 50, "top"));
    }
    /////////////on push des ennemis au hazard avec un maximum////////////
    for (var i = 0; i < this.maxEnemy; i++) {
      if (Math.random() > 0.5) {
        enemyList.push(
          new Fly(
            this.x + Math.random() * (800 - 100) + 100,
            this.y + Math.random() * (500 - 100) + 100,
            floor.length
          )
        );
      } else {
        enemyList.push(
          new Ghost(
            this.x + Math.random() * (800 - 100) + 100,
            this.y + Math.random() * (500 - 100) + 100,
            floor.length
          )
        );
      }
      this.enemyCount += 1;
    }
    ///////////////////////////////les pre-sets différents pour les pièces/////////////////////////////
    switch (this.preset) {
      case 0:
        break;
      case 1:
        this.increment = 50;
        for (var i = 1; i < 7; i++) {
          obstacles.push(
            new Rock(
              this.x + 250 + this.increment,
              this.y + 100 + this.increment
            )
          );
          obstacles.push(
            new Rock(
              this.x + 250 + this.increment,
              this.y + 450 - this.increment
            )
          );
          this.increment += 50;
        }
        break;
      case 2:
        this.increment = 50;
        for (var i = 1; i < 7; i++) {
          obstacles.push(
            new Bonfire(
              this.x + 250 + this.increment,
              this.y + 100 + this.increment
            )
          );
          obstacles.push(
            new Bonfire(
              this.x + 250 + this.increment,
              this.y + 450 - this.increment
            )
          );
          this.increment += 50;
        }
        break;
      case 3:
        obstacles.push(new Bonfire(this.x + 100, this.y + 100));
        obstacles.push(new Bonfire(this.x + 800, this.y + 490));
        obstacles.push(new Bonfire(this.x + 100, this.y + 490));
        obstacles.push(new Bonfire(this.x + 800, this.y + 100));
        if (maxItemRoom < 1) {
          collectibles.push(
            new Pickup(
              this.x + 400,
              this.y + 280,
              Math.floor(Math.random() * 3)
            )
          );
          obstacles.push(new Stand(this.x + 400, this.y + 300));
          maxItemRoom += 1;
        }
        break;
    }
    //////////////////////////////////On push des items au hazard dans les pièces.////////////////////////////
    if (Math.random() < 0.5) {
      collectibles.push(
        new Bomb(
          this.x + Math.random() * (700 - 100) + 100,
          this.y + Math.random() * (350 - 200) + 200
        )
      );
    }
    if (Math.random() < 0.5) {
      collectibles.push(
        new Key(
          this.x + Math.random() * (700 - 100) + 100,
          this.y + Math.random() * (350 - 200) + 200
        )
      );
    }
    if (Math.random() < 0.5) {
      collectibles.push(
        new Coins(
          this.x + Math.random() * (700 - 100) + 100,
          this.y + Math.random() * (350 + 200) + 200
        )
      );
    }
  }
  tick() {
    /////////////////////////////////////Changements de pièces//////////////////////////////////
    for (var i = 0; i < spriteList.length; i++) {
      if (spriteList[i] instanceof Doors) {
        if (col.checkCollision(spriteList[i], Isaac) && spriteList[i].open) {
          if (spriteList[i].position == "left") {
            ctx.translate(900, 0);
            Isaac.x -= 200;
            currentRoom -= 1;
          }
          if (spriteList[i].position == "right") {
            ctx.translate(-900, 0);
            Isaac.x += 200;
            currentRoom += 1;
          }
          if (spriteList[i].position == "top") {
            ctx.translate(0, 600);
            Isaac.y -= 200;
            currentRoom -= 3;
          }
          if (spriteList[i].position == "bottom") {
            ctx.translate(0, -600);
            Isaac.y += 200;
            currentRoom += 3;
          }
        }
      }
    }
  }
}
