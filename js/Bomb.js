class Bomb {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.widthCol = 15;
        this.heightCol = 15;
    
    }
    tick() {
            ctx.drawImage(imgBomb,0,0,25,25,this.x,this.y,35,35);

    }

}