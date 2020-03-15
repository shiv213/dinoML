import Actor from './Actor.js'
import config from '../config.js'

export default class Dino extends Actor {
    constructor(canvasHeight) {
        super();

        this.canvasHeight = canvasHeight;
        this.isDucking = false;
        this.legFrames = 0;
        this.legShowing = 'Left';
        this.sprite = `dino${this.legShowing}Leg`;
        this.velocity = 0;
        this.x = 25;
        this.relativeY = 0;
        this.score = 0;
        this.dead = false;
        this.bestMember = false;
    }

    y() {
        return this.canvasHeight - this.height - 4 + this.relativeY;
    }

    jump() {
        if (this.relativeY === 0) {
            this.velocity = -config.settings.dinoLift;
        }
    }

    duck(value) {
        this.isDucking = Boolean(value);
    }

    nextFrame() {
        // use gravity to gradually decrease velocity
        this.velocity += config.settings.dinoGravity;
        this.relativeY += this.velocity;

        // stop falling once back down to the ground
        if (this.relativeY > 0) {
            this.velocity = 0;
            this.relativeY = 0;
        }

        if (this.shouldRender) {
            this.determineSprite();
        }

    }

    determineSprite() {
        if (this.relativeY < 0) {
            // in the air stiff
            this.sprite = 'dino'
        } else {
            // on the ground running
            if (this.legFrames >= config.settings.dinoLegsRate) {
                this.legShowing = this.legShowing === 'Left' ? 'Right' : 'Left';
                this.legFrames = 0;
            }

            if (this.isDucking) {
                this.sprite = `dinoDuck${this.legShowing}Leg`;
            } else {
                this.sprite = `dino${this.legShowing}Leg`;
            }

            this.legFrames++;
        }
    }

    static closestObstacle(state) {
        if (state.cacti.length > 0 && state.birds.length > 0) {
            if (state.cacti[0].x < state.birds[0].x) {
                return state.cacti[0];
            } else {
                return state.birds[0];
            }
        } else if (state.birds.length > 0) {
            return state.birds[0];
        } else if (state.cacti.length > 0) {
            return state.cacti[0];
        } else {
            return {x: 600, width: 0, height: 0};
        }
    }

    static birdYPos(state) {
        if (state.birds.length > 0) {
            return state.birds[0].y;
        } else {
            return 0;
        }
    }

    static map(n, start1, stop1, start2, stop2) {
        let x = (((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2);
        if (!isNaN(x)) {
            return x;
        } else {
            return 0;
        }
    }

    inputs(state) {
        let inputs = [];
        let closest = Dino.closestObstacle(state);
        // Dino's y position
        inputs[0] = Dino.map(this.y(), 0, 150, 0, 1);
        // Dino's y velocity
        inputs[1] = Dino.map(this.velocity, -5, 5, 0, 1);
        // - Distance to next obstacle
        inputs[2] = Dino.map(closest.x - this.x, 0, 600, 0, 1);
        // - Width of obstacle
        inputs[3] = Dino.map(closest.width, 0, 200, 0, 1);
        // - Height of obstacle
        inputs[4] = Dino.map(closest.height, 0, this.canvasHeight, 0, 1);
        // Y position of bird
        inputs[5] = Dino.map(Dino.birdYPos(state), 0, this.canvasHeight, 0, 1);
        return inputs;
    }
}
