class INShip {
    constructor( width ) {
        this.width = width;
        this.bullets = [];
        this.frame = {
            "sx": 272,
            "sy": 551,
            "sw": 28,
            "sh": 16,
            "dx": ( width - 28 ) / 2,
            "dy": 340,
            "dw": 28,
            "dh": 16,
        };
    }

    handleAction(key) {
        (key === 37) && (this.frame.dx > 100) && (this.frame.dx -= 10);
        (key === 39) && (this.frame.dx < 380) && (this.frame.dx += 10);
        (key === 32) && (this.shoot());
    }

    shoot(){
        this.bullets.push(new INFire(this.frame.dx, this.frame.dy, "up"))
    }

    draw( game ) {
        game.drawSpriteFromFrames( this.frame );
    }
}

