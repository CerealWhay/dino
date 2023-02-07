import {DynamicCircle} from "./DynamicCircle.js";

export class Projectile extends DynamicCircle {

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
        this.position.x += this.velocity.x * 10;
        this.position.y += this.velocity.y * 10;
    }
}