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

    closestObstacle(obstacles) {
        if (typeof obstacles.birds[0] !== 'undefined') {
            if (obstacles.cacti[0].x < obstacles.birds[0].x) {
                return obstacles.cacti[0];
            } else {
                return obstacles.birds[0];
            }
        } else {
            return obstacles.cacti[0];
        }
    }

    static map(n, start1, stop1, start2, stop2) {
        let x = (((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2);
        if (!isNaN(x)) {
            return x;
        } else {
            return 0;
        }
    };

    inputs(obstacles) {
        let inputs = [];
        let closest = this.closestObstacle(obstacles);
        // Dino's y position
        inputs[0] = Dino.map(this.y(), 0, 150, 0, 1);
        // Dino's y velocity
        inputs[1] = Dino.map(this.velocity, -5, 5, 0, 1);
        // - Distance to next obstacle
        inputs[2] = Dino.map(closest.x - this.x, 0, 600, 0, 1);
        // - Width of obstacle
        inputs[3] = Dino.map(closest.width, 0, 200, 0, 1); // TODO Add correct max obstacle width
        // - Height of obstacle
        inputs[4] = Dino.map(closest.height, 0, this.canvasHeight, 0, 1); // TODO Add correct max obstacle height
        // TODO return bird height
        // TODO return distance between closest obstacle and 2nd closest obstacles
        return inputs;
    }

}
