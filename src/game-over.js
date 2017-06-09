class INGameOver {
    constructor( width ) {
        this.frames = {
            "title": {
                "sx": 53,
                "sy": 260,
                "sw": 85,
                "sh": 22,
                "dx": ( width - 204 ) / 2,
                "dy": 201,
                "dw": 85,
                "dh": 22,
            },
            "cyphers": {
                "sy": 262,
                "sw": 20,
                "sh": 22,
                "sx": {
                    "0": 150,
                    "1": 170,
                    "2": 190,
                    "3": 210,
                    "4": 230,
                    "5": 247,
                    "6": 268,
                    "7": 287,
                    "8": 305,
                    "9": 323,
                },
            }
        };
    }

    draw( game ) {
        game.drawSpriteFromFrames( this.frames.title );
        game.context.fillStyle = "rgb(255,100,100)";
        game.context.font = "50px Monospace";
        game.context.textBaseline = "top";
        game.context.fillText( "GAME OVER", 130, 125 );
        this.drawScore( game, game.score, false );
    }

    drawScore( game, iScore) {
        let aScoreParts = `${ iScore }`.split( "" ).reverse(),
            { sx, sy, sw, sh } = this.frames.cyphers;

        aScoreParts.forEach( ( sScorePart, iIndex ) => {
            let dx = ( game.width / 2 ) + 100 - sw;

            game.drawSpriteFromFrames( {
                "sx": sx[ sScorePart ],
                sy,
                sw, sh,
                "dx": dx - ( iIndex * ( sw + 2 ) ),
                "dy": 202,
                "dw": sw,
                "dh": sh,
            } );
        } );
    }
}
