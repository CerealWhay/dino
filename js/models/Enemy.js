import {DynamicCircle} from "./DynamicCircle.js";

export class Enemy extends DynamicCircle {

    radius = 15;

    constructor(velocity, ...args) {
        super(...args);
        this.velocity = velocity
    }

    draw() {
        this.ctx.fillStyle = 'red'
        super.draw()
    }

    move() {
        this.position.x += this.velocity.x * 0.5;
        this.position.y += this.velocity.y * 0.5;
    }

    setVelocity(velocity) {
        this.velocity = velocity
    }
}