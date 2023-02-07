import {DynamicCircle} from "./DynamicCircle.js";

export class Player extends DynamicCircle {

    radius = 15;

    constructor(...args) {
        super(...args);
    }

    draw() {
        this.ctx.fillStyle = 'black'
        super.draw()
    }

    move(position) {
        this.position.x = position.x;
        this.position.y = position.y;
    }
}