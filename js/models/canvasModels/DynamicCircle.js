import {CANVAS} from "../Canvas.js";

export class DynamicCircle {

    radius = 15;
    position = {
        x: 0,
        y: 0,
    }

    constructor() {
        this.canvas = CANVAS;
        this.ctx = this.canvas.getCtx();
    }

    getPosition() {
        return this.position
    }

    setPosition(position) {
        this.position = position
    }

    getRadius() {
        return this.radius;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(
            this.position.x,
            this.position.y,
            this.radius,
            0,
            Math.PI * 2,
            false
        );
        this.ctx.closePath();
        this.ctx.fill();
    }
}