import {DynamicCircle} from "./DynamicCircle.js";

export class Projectile extends DynamicCircle {

    radius = 2;

    constructor() {
        super();
    }

    draw() {
        this.ctx.fillStyle = 'red'
        super.draw()
    }
}