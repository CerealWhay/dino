import {CANVAS} from "../Canvas.js";

export class AimLine {
    constructor() {
        this.canvas = CANVAS;
        this.ctx = this.canvas.getCtx();
    }

    draw(begin, end) {
        this.ctx.strokeStyle= 'rgba(0, 0, 0, 0.1)'
        this.ctx.beginPath();
        this.ctx.moveTo(begin.x,begin.y);
        this.ctx.lineTo(end.x,end.y);
        this.ctx.closePath();
        this.ctx.stroke();
    }
}