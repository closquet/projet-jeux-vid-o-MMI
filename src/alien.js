class INAlien {
    constructor( i, j ) {
        this.current = 0;
        this.elapsedTime = 0;
        this.start = Date.now();
        this.steps = 0;
        this.stepDistance = 3;
        this.firstMvt = true;
        this.alive = true;
        this.model = {
            "0": 11,
            "1": 73,
            "2": 131,
        };
        this.bullets = [];
        this.frame = {
            "sx": this.model[i],
            "sy": 523,
            "sw": 32,
            "sh": 16,
            "dx": 155 + 40 * j,
            "dy": 100 + 25 * i,
            "dw": 24,
            "dh": 12,
        };
        this.speed = 1;
    }

    draw( game ) {
        this.alive && game.drawSpriteFromFrames( this.frame );
    }

    shoot(){
        if(Math.round(Math.random()*100 > 98)) {
            this.bullets.push(new INFire(this.frame.dx, this.frame.dy, "down"))
        }
    }

    update() {
        this.current = Date.now();
        this.elapsedTime = this.current - this.start;

        if ( (this.elapsedTime >= 300 / this.speed) && this.alive ) {
            if(this.firstMvt){
                this.frame.dx += this.stepDistance;
                this.steps++;
                if( this.steps === 15 ){
                    this.stepDistance *= -1;
                    this.firstMvt = false;
                    this.steps = 0;
                    this.speed++;
                    this.frame.dy += 15;
                }
            }else{
                this.frame.dx += this.stepDistance;
                this.steps++;
                if( this.steps === 35 ){
                    this.stepDistance *= -1;
                    this.steps = 0;
                    this.speed++;
                    this.frame.dy += 15;
                }
            }
            this.start = Date.now();
            this.shoot();
        }

    }
}