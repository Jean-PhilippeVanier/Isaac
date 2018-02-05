class Collision {
  constructor(id) {}

  checkCollision(object1, object2) {
    //Détection de collision minimale.
    return !(
      object1.y + object1.heightCol < object2.y ||
      object1.y > object2.y + object2.heightCol ||
      object1.x + object1.widthCol < object2.x ||
      object1.x > object2.x + object2.widthCol
    );
  }
}
