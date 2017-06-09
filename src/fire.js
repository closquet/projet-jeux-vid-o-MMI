class INFire {
    constructor( x, y, direction ) {
        this.direction = direction == "up"? -1 : 1;
        this.exist = true;
        this.frame = {
            "sx": 57,
            "sy": 816,
            "sw": 6,
            "sh": 12,
            "dx": x + 11,
            "dy": y,
            "dw": 6,
            "dh": 12,
        };
    }

    update() {

        (this.exist) && (this.frame.dy += (3 * this.direction));
    }

    draw( game ) {
        (this.exist) && (game.drawSpriteFromFrames( this.frame ));
    }
}