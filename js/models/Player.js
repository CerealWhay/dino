import {DynamicCricle} from "./DynamicCircle.js";

export class Player extends DynamicCricle {

    radius = 15;

    constructor(...args) {
        super(...args);
    }

    draw() {
        this.ctx.fillStyle = 'black'
        super.draw()
    }

    move(x, y) {
        this.positionX = x;
        this.positionY = y;
    }
}