class INStarting {
    constructor( width ) {
        this.frame = {
            "sx": 172,
            "sy": 5,
            "sw": 233,
            "sh": 164,
            "dx": ( width - 233 ) / 2,
            "dy": 100,
            "dw": 233,
            "dh": 164,
        };
    }

    draw( game ) {
        game.drawSpriteFromFrames( this.frame );
        game.context.fillStyle = "white";
        game.context.font = "16px Monospace";
        game.context.textBaseline = "top";
        game.context.fillText( "Appuyez sur ESPACE pour commencer!", 105, 300 );
    }
}
