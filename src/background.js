class INBackground {
    constructor( width, height ) {
        this.frame = {
            "sx": 5,
            "sy": 993,
            "sw": 256,
            "sh": 224,
            "dx": 0,
            "dy": 0,
            "dw": width,
            "dh": height,
        };
    }

    draw( game ) {
        game.drawSpriteFromFrames( this.frame );
    }
}
