var ctx = null;
var spriteList = [];
var enemyList = [];
var obstacles = [];
var projectiles = [];
var floor = [];
var collectibles = [];
var img = new Image();
var imgIsaac = new Image();
var imgTears = new Image();
var imgHeart = new Image();
var imgHud = new Image();
var imgBomb = new Image();
var imgKey = new Image();
var imgRock = new Image();
var imgItemHeart = new Image();
var imgItemDamage = new Image();
var imgItemSpeed = new Image();
var imgGhost = new Image();
var imgStand = new Image();
var imgMoreHud = new Image();
var Isaac = 0;
var col = 0;
var sound = 0;
var roomCount = 0;
var maxItemRoom = 0;
var blockSize = 40;
var incrementX = -900;
var incrementY = -600;
var rightPushed = false;
var leftPushed = false;
var upPushed = false;
var botPushed = false;
var nothingPushed = true;
var upArrow = false;
var botArrow = false;
var leftArrow = false;
var rightArrow = false;
var currentRoom = 4;
//fin variables.
window.onload = function() {
  var arrow_keys_handler = function(e) {
    switch (e.keyCode) {
      case 37:
      case 39:
      case 38:
      case 40: // Arrow keys
      case 32:
        e.preventDefault();
        break; // Space
      default:
        break; // do not block other keys
    }
  };
  window.addEventListener("keydown", arrow_keys_handler, false);
  var canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  //dump d'images.
  img.src = "images/room.png";
  imgIsaac.src = "images/isaac.png";
  imgTears.src = "images/tear.png";
  imgHeart.src = "images/hearts_sprite.png";
  imgHud.src = "images/hud.png";
  imgBomb.src = "images/bombs_sprite.png";
  imgKey.src = "images/Key.png";
  imgRock.src = "images/rocks_sprite.png";
  imgItemHeart.src = "images/Heart.png";
  imgItemDamage.src = "images/Damage.png";
  imgItemSpeed.src = "images/Speed.png";
  imgStand.src = "images/Stand.png";
  imgMoreHud.src = "images/morehud.png";
  imgGhost.src = "images/Ghost.png";

  // Affiche seulement si téléchargée au complet
  col = new Collision("asd");
  // Isaac = new Player("joueur");
  // spriteList.push(Isaac);
  // spriteList.push(new HUD());
  // spriteList.push(new Doors(820,275,"right"));
  // spriteList.push(new Doors(440,514,"bottom"));
  // spriteList.push(new Doors(80,275,"left"));
  // spriteList.push(new Doors(425,50,"top"));
  //haut
  // ctx.translate(0,600);
  // obstacles.push(new Rock(400,400));
  // spriteList.push(new Key(300,300));
  // spriteList.push(new Bomb(400,400));
  // spriteList.push(new Coins(350,325));
  // enemyList.push(new Fly(350, 350));
  // enemyList.push(new Bonfire(450,450));
  //appel la fonction restart pour push les maps, etc.
  restart();
  tick();
};
function tick() {
  //si on meurt, restart.
  if (Isaac.health <= 0) {
    restart();
  }
  if (botPushed || upPushed || leftPushed || rightPushed) {
    nothingPushed = false;
  } else {
    nothingPushed = true;
  }
  if (img.complete) {
    // x,y,newWidth,newHeight
    //    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0,0, imgWidth, imgHeight);
    //top. Ici on affiche le background des rooms à divers endroits.
    ctx.drawImage(img, 0, -600, 900, 600);
    ctx.drawImage(img, -900, -600, 900, 600);
    ctx.drawImage(img, 900, -600, 900, 600);
    //mid
    ctx.drawImage(img, 0, 0, 900, 600);
    ctx.drawImage(img, -900, 0, 900, 600);
    ctx.drawImage(img, 900, 0, 900, 600);
    //bot
    ctx.drawImage(img, 0, 600, 900, 600);
    ctx.drawImage(img, -900, 600, 900, 600);
    ctx.drawImage(img, 900, 600, 900, 600);
  }
  //Ticks pour les listes variées.///////////////////////////////////////////////
  for (var i = 0; i < spriteList.length; i++) {
    spriteList[i].tick();
  }
  for (var i = 0; i < collectibles.length; i++) {
    collectibles[i].tick();
    if (col.checkCollision(collectibles[i], Isaac)) {
      if (collectibles[i] instanceof Key) {
        Isaac.keys += 1;
      } else if (collectibles[i] instanceof Bomb) {
        Isaac.bombs += 1;
      } else {
        if (collectibles[i] instanceof Coins) {
          Isaac.coins += 1;
        }
      }
      collectibles.splice(i, 1);
      i--;
    }
  }
  for (var i = 0; i < obstacles.length; i++) {
    obstacles[i].tick();
  }
  for (var i = 0; i < projectiles.length; i++) {
    let alive = projectiles[i].tick();
    if (!alive) {
      projectiles.splice(i, 1);
      i--;
    }
  }
  for (var i = 0; i < enemyList.length; i++) {
    let alive2 = enemyList[i].tick();
    if (!alive2) {
      enemyList.splice(i, 1);
      i--;
      floor[currentRoom].enemyCount -= 1;
      if (floor[currentRoom].enemyCount == 0) {
        floor[currentRoom].emptyRoom = true;
      }
      if (floor[currentRoom].enemyCount != 0) {
        floor[currentRoom].emptyRoom = false;
      }
    }
  }
  for (var i = 0; i < floor.length; i++) {
    floor[i].tick();
  }
  /////////////////////////////////// Fin des ticks//////////////////////////////////////
  window.requestAnimationFrame(tick);
}
//Key presses
document.onkeydown = function(e) {
  if (e.which == 65) leftPushed = true;
  else if (e.which == 68) rightPushed = true;
  else if (e.which == 87) upPushed = true;
  else if (e.which == 83) botPushed = true;
  else if (e.which == 38) upArrow = true;
  else if (e.which == 40) botArrow = true;
  else if (e.which == 37) leftArrow = true;
  else if (e.which == 39) rightArrow = true;
  else if (e.which == 80) pPushed = true;
};

document.onkeyup = function(e) {
  if (e.which == 65) leftPushed = false;
  else if (e.which == 68) rightPushed = false;
  else if (e.which == 87) upPushed = false;
  else if (e.which == 83) botPushed = false;
  else if (e.which == 38) upArrow = false;
  else if (e.which == 40) botArrow = false;
  else if (e.which == 37) leftArrow = false;
  else if (e.which == 39) rightArrow = false;
  else if (e.which == 80) pPushed = false;
};
//Fonction pour restart à 0.
function restart() {
  ctx.restore();
  if (sound != 0) {
    sound.unload();
  }
  sound = new Howl({
    src: ["music/Thecaves.mp3", "test.ogg"],
    loop: true
  });
  sound.volume(0.1);
  sound.play();
  incrementX = -900;
  incrementY = -600;
  currentRoom = 4;
  maxItemRoom = 0;
  spriteList = [];
  enemyList = [];
  projectiles = [];
  collectibles = [];
  obstacles = [];
  floor = [];
  Isaac = new Player("joueur");
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      floor.push(
        new Room(incrementX, incrementY, Math.floor(Math.random() * 4) + 0)
      );
      // floor.push(new Room(-900, -600, Math.floor(Math.random() * 4) + 0));
      // floor.push(new Room(0, -600, Math.floor(Math.random() * 4) + 0));
      // floor.push(new Room(900, -600, Math.floor(Math.random() * 4) + 0));
      // //midsection
      // floor.push(new Room(-900, 0, Math.floor(Math.random() * 4) + 0));
      // floor.push(new Room(0, 0, Math.floor(Math.random() * 4) + 0));
      // floor.push(new Room(900, 0, Math.floor(Math.random() * 4) + 0));
      // //lower
      // floor.push(new Room(-900, 600, Math.floor(Math.random() * 4) + 0));
      // floor.push(new Room(0, 600, Math.floor(Math.random() * 4) + 0));
      // floor.push(new Room(900, 600, Math.floor(Math.random() * 4) + 0));

      incrementX += 900;
    }
    incrementX = -900;
    incrementY += 600;
    roomCount += 1;
  }
  spriteList.push(Isaac);
  spriteList.push(new HUD());
  ctx.save();
}
//Fonction de son qui fonctionne pas, laisser là quand même.
// function Sound(source,volume,loop)
// {
//     this.source=source;
//     this.volume=volume;
//     this.loop=loop;
//     var son;
//     this.son=son;
//     this.finish=false;
//     this.stop=function()
//     {
//         document.body.removeChild(this.son);
//     }
//     this.start=function()
//     {
//         if(this.finish)return false;
//         this.son=document.createElement("embed");
//         this.son.setAttribute("src",this.source);
//         this.son.setAttribute("hidden","true");
//         this.son.setAttribute("volume",this.volume);
//         this.son.setAttribute("autostart","true");
//         this.son.setAttribute("loop",this.loop);
//         document.body.appendChild(this.son);
//     }
//     this.remove=function()
//     {
//         document.body.removeChild(this.son);
//         this.finish=true;
//     }
//     this.init=function(volume,loop)
//     {
//         this.finish=false;
//         this.volume=volume;
//         this.loop=loop;
//     }
// }
