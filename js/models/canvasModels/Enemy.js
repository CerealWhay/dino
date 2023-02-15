import {DynamicCircle} from "./DynamicCircle.js";

export class Enemy extends DynamicCircle {

    radius = 20;

    constructor(...args) {
        super(...args);
    }

    draw() {
        this.ctx.fillStyle = 'red'
        super.draw()
    }
}