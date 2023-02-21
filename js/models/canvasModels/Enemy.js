import {DynamicCircle} from "./DynamicCircle.js";

export class Enemy extends DynamicCircle {

    radius = 20;

    constructor() {
        super();
    }

    draw() {
        this.ctx.fillStyle = 'red'
        super.draw()
    }
}