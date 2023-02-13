import {DynamicCircle} from "./DynamicCircle.js";

export class Player extends DynamicCircle {

    radius = 15;

    constructor() {
        super();
        this.position = {
            x: this.canvas.getCanvasRect().width / 2,
            y: this.canvas.getCanvasRect().height / 2,
        }
    }

    draw() {
        this.ctx.fillStyle = 'black'
        super.draw()
    }
}