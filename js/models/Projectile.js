import {DynamicCricle} from "./DynamicCircle.js";

export class Projectile extends DynamicCricle {

    radius = 2;

    constructor(velocity,
        ...args
    ) {
        super(...args);
        this.velocity = velocity
    }

    draw() {
        this.ctx.fillStyle = 'red'
        super.draw()
    }

    move() {
        this.positionX += this.velocity.x * 10;
        this.positionY += this.velocity.y * 10;
    }
}