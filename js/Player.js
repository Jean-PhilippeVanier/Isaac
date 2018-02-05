class Player {
  constructor(id) {
    this.x = 250;
    this.y = 250;
    this.speed = 5;
    this.maxSpeed = 10;
    this.atkDelay = 500;
    this.atkSpeed = 8;
    this.atkDamage = 1;
    this.range = 400;
    this.locked = false;
    this.health = 3.5;
    this.keys = 0;
    this.bombs = 0;
    this.coins = 0;
    this.maxHealth = 20;
    this.width = 45;
    this.height = 50;
    this.widthCol = 35;
    this.heightCol = 50;
    this.invulnerable = false;
    this.invulnTimer = 0;
    this.lastAttack = 0;
    //Spaghetti d'animations//////
    this.currentAnimation = new Animation(
      "images/isaac_legs_vertical.png",
      10,
      1,
      100,
      true,
      1.3
    );

    this.spriteHeads = new Animation(
      "images/isaac_heads.png",
      8,
      1,
      50,
      true,
      1.3
    );

    this.currentAnimationVertical = new Animation(
      "images/isaac_legs_vertical.png",
      9.55,
      1,
      100,
      true,
      1.3
    );

    this.currentAnimationHorizontal = new Animation(
      "images/isaac_legs_horizontal.png",
      9.8,
      1,
      100,
      true,
      1.3
    );
    this.currentAnimationHorizontal.changeMinMaxInterval(0, 10);
    this.currentAnimationVertical.changeMinMaxInterval(0, 10);
  }

  tick() {
    ///////////////////////////////Changement d'animations selon la direction///////////////////////////
    if (upPushed || botPushed) {
      this.currentAnimation = this.currentAnimationVertical;
      this.currentAnimation.setLooped(true);
    } else if (leftPushed || rightPushed) {
      this.currentAnimation = this.currentAnimationHorizontal;
      this.currentAnimation.setLooped(true);
    } else if (nothingPushed) {
      this.currentAnimation.setLooped(false);
    }
    if (this.invulnerable) {
      let frequency = 100;
      if (Math.floor(Date.now() / frequency) % 2) {
      }
    }

    if (this.invulnerable) {
      let present = new Date().getTime();
      if (present - this.invulnTimer > 1250) {
        this.invulnerable = false;
      }
    }
    /////////////////////////////////////////////Checks de collision avec les ennemis / obstacles ///////////////////
    for (var i = 0; i < enemyList.length; i++) {
      if (
        col.checkCollision(this, enemyList[i]) &&
        !this.invulnerable &&
        enemyList[i].damage != 0
      ) {
        this.health -= enemyList[i].damage;
        this.invulnerable = true;
        this.invulnTimer = new Date().getTime();
      }
    }
    for (var i = 0; i < obstacles.length; i++) {
      if (
        col.checkCollision(this, obstacles[i]) &&
        obstacles[i] instanceof Bonfire
      ) {
        this.health -= obstacles[i].damage;
        this.invulnerable = true;
        this.invulnTimer = new Date().getTime();
      }
    }
    ////////////////////////////////////////////////Déplacements du personnage/////////////////////////////////////
    if (
      upPushed == true &&
      this.speed < this.maxSpeed &&
      this.y > floor[currentRoom].y + 50
    ) {
      this.spriteHeads.changeMinMaxInterval(4, 4);
      this.y -= this.speed;
      for (var i = 0; i < obstacles.length; i++) {
        if (col.checkCollision(this, obstacles[i])) {
          this.y += this.speed;
        }
      }
    } else if (
      botPushed == true &&
      this.speed < this.maxSpeed &&
      this.y <= floor[currentRoom].y + 470
    ) {
      this.spriteHeads.changeMinMaxInterval(0, 0);
      this.y += this.speed;
      for (var i = 0; i < obstacles.length; i++) {
        if (col.checkCollision(this, obstacles[i])) {
          this.y -= this.speed;
        }
      }
    }
    if (
      leftPushed == true &&
      this.speed < this.maxSpeed &&
      this.x >= floor[currentRoom].x + 60
    ) {
      if (!botPushed || !upPushed) {
        this.spriteHeads.changeMinMaxInterval(6, 6);
      }
      this.currentAnimation.setFlipped(true);
      this.x -= this.speed;
      for (var i = 0; i < obstacles.length; i++) {
        if (col.checkCollision(this, obstacles[i])) {
          this.x += this.speed;
        }
      }
    }
    if (
      rightPushed == true &&
      this.speed < this.maxSpeed &&
      this.x <= floor[currentRoom].x + 790
    ) {
      if (!botPushed || !upPushed) {
        this.spriteHeads.changeMinMaxInterval(2, 2);
      }
      this.currentAnimation.setFlipped(false);
      this.x += this.speed;
      for (var i = 0; i < obstacles.length; i++) {
        if (col.checkCollision(this, obstacles[i])) {
          this.x -= this.speed;
        }
      }
    } else if (
      rightPushed == false &&
      leftPushed == false &&
      upPushed == false &&
      botPushed == false
    ) {
      this.spriteHeads.changeMinMaxInterval(0, 0);
    }
    /////////////////////////////////peut pas passer par dessus max speed///////////////////////////
    if (this.speed >= this.maxSpeed) {
      this.speed = this.maxSpeed;
    }

    //////////////////////////////////////////Délai d'attack pour ne pas pouvoir attack à la vitesse du son///////////////////////
    this.now = new Date().getTime();
    if (this.lastAttack == 0 || this.lastAttack + this.atkDelay <= this.now) {
      if (
        rightArrow &&
        !leftArrow &&
        (rightArrow && !upArrow) &&
        (rightArrow && !botArrow)
      ) {
        projectiles.push(
          new Tears(
            this.x + 45 / 2 - 1,
            this.y + 10,
            this.atkSpeed,
            this.range,
            "right"
          )
        );
        this.lastAttack = new Date().getTime();
      } else if (
        leftArrow &&
        !rightArrow &&
        (leftArrow && !upArrow) &&
        (leftArrow && !botArrow)
      ) {
        projectiles.push(
          new Tears(
            this.x + 45 / 2 - 1,
            this.y + 10,
            this.atkSpeed,
            this.range,
            "left"
          )
        );
        this.lastAttack = new Date().getTime();
      } else if (
        upArrow &&
        !rightArrow &&
        (upArrow && !leftArrow) &&
        (upArrow && !botArrow)
      ) {
        projectiles.push(
          new Tears(
            this.x + 45 / 2 - 1,
            this.y + 10,
            this.atkSpeed,
            this.range,
            "up"
          )
        );
        this.lastAttack = new Date().getTime();
      } else if (
        botArrow &&
        !rightArrow &&
        (botArrow && !leftArrow) &&
        (botArrow && !upArrow)
      ) {
        projectiles.push(
          new Tears(
            this.x + 45 / 2 - 1,
            this.y + 10,
            this.atkSpeed,
            this.range,
            "bot"
          )
        );
        this.lastAttack = new Date().getTime();
      }
    }
    this.currentAnimation.tick(
      ctx,
      this.x + this.width / 2 + 4,
      this.y + this.height / 2 + 21
    );
    this.spriteHeads.tick(
      ctx,
      this.x + this.width / 2,
      this.y + this.height / 2
    );
  }
}
