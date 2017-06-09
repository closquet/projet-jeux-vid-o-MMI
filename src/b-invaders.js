const SPRITESHEET_PATH = "./resources/sprite.png";

class Invaders {
    constructor( { canvas, context, width, height } ) {
        // init canvas-related properties
        this.canvas = canvas;
        this.context = context;
        this.width = width;
        this.height = height;
        this.animationRequestId = null;

        // load spritesheet
        this.sprites = new Image();
        this.sprites.addEventListener( "load", () => {
            this.setup();
        } );
        this.sprites.src = SPRITESHEET_PATH;
    }

    setup() {
        this.reset();

        document.addEventListener( "keyup", this.handleAction.bind( this ) );

        this.animate();
    }

    reset() {
        let { width, height } = this,i,j;

        this.background = new INBackground( width, height );
        this.starting = new INStarting( width, height );
        this.ship = new INShip( width );
        this.gameOver = new INGameOver( width, height );
        this.aliens = [];
        for(i = 0; i < 3; i++){
            for(j = 0; j < 6; j++){
                this.aliens.push(new INAlien(i, j))
            }
        }

        // init game-related properties
        this.started = false;
        this.ended = false;
        this.score = 0;
    }

    animate() {
        this.animationRequestId = window.requestAnimationFrame( this.animate.bind( this ) );

        // check game state
        if ( this.started ) {
            this.checkState();
        }
        // update elements
        if ( this.started ) {
            this.ship.bullets.forEach( ( oBullet, ) => {
                if(oBullet.frame.dy < -20){
                    oBullet.exist = false;
                }else{
                    oBullet.update();
                }
            } );

            let i,j;
            for(i=0; i<this.aliens.length; i++){
                this.aliens[i].update();
                this.aliens[i].bullets.forEach( ( oBullet ) => {
                    if(oBullet.frame.dy > 360){
                        oBullet.exist = false;
                    }else{
                        oBullet.update();
                        if( (oBullet.frame.dx > this.ship.frame.dx) && (oBullet.frame.dx < this.ship.frame.dx + 20) && (oBullet.frame.dy > this.ship.frame.dy) && (oBullet.frame.dy < this.ship.frame.dy +10)) {
                            this.over();
                        }
                    }
                    for(j=0; j<this.ship.bullets.length; j++){
                        if( (this.ship.bullets[j].frame.dx > this.aliens[i].frame.dx) && (this.ship.bullets[j].frame.dx < this.aliens[i].frame.dx + 20) && (this.ship.bullets[j].frame.dy > this.aliens[i].frame.dy) && (this.ship.bullets[j].frame.dy < this.aliens[i].frame.dy +10)){

                            this.aliens[i].alive = false;
                            this.aliens[i].frame.dx = -500;
                            this.ship.bullets[j].exist = false;
                            this.ship.bullets[j].frame.dx = -500;
                            this.score += 10;
                            if(this.score == 180){
                                this.over();
                            }
                        }
                    }
                } );
                if( (this.aliens[i].frame.dy > this.ship.frame.dy -20) ){
                    this.over();
                }
            }

        }
        // draw
        this.context.clearRect( 0, 0, this.width, this.height );
        this.background.draw( this );
        if ( this.started ) {
            this.aliens.forEach( ( oAlien ) => {
                oAlien.draw( this );
                oAlien.bullets.forEach( ( oBullet ) => oBullet.draw( this ));
            } );
            this.ship.draw( this );
            this.ship.bullets.forEach( ( oBullet ) => oBullet.draw( this ));
            if ( this.ended ) {
                this.gameOver.draw( this );
            }
        } else {
            this.starting.draw( this );
        }
    }

    handleAction( oEvent ) {
        if ( oEvent.keyCode !== 32 && oEvent.keyCode !== 37 && oEvent.keyCode !== 39 ) {
            return;
        }

        if ( this.started ) {
            this.ship.handleAction(oEvent.keyCode);
        } else {
            this.started = true;
        }

        if ( this.ended ) {
            if ( window.confirm( "Voulez-vous rejouer ?" ) ) {
                this.reset();
                this.animate();
            }
        }
    }

    over() {
        this.ended = true;
        window.cancelAnimationFrame( this.animationRequestId );
    }

    drawSpriteFromFrames( { sx, sy, sw, sh, dx, dy, dw, dh } ) {
        this.context.drawImage( this.sprites, sx, sy, sw, sh, dx, dy, dw, dh );
    }
}
