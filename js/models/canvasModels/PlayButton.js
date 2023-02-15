import {CANVAS} from "../Canvas.js";

export class PlayButton {

    rectangle = {
        dx: 400,
        dy: 150,
    }

    constructor() {
        this.canvas = CANVAS;
        this.ctx = this.canvas.getCtx();

        this.btnPosition = {
            x: (this.canvas.getCanvasRect().width / 2),
            y: (this.canvas.getCanvasRect().height / 2),
        }
    }

    draw() {
        this.ctx.fillStyle = 'rgb(185,185,185)'
        this.ctx.fillRect(
            this.btnPosition.x - (this.rectangle.dx / 2),
            this.btnPosition.y - (this.rectangle.dy / 2),
            this.rectangle.dx,
            this.rectangle.dy,
        );

        this.ctx.fillStyle = 'rgb(65,65,65)'
        this.ctx.font = "130px sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText("Play", this.btnPosition.x, this.btnPosition.y)
    }

    getRectangle() {
        return {
            height: this.rectangle.dy,
            width: this.rectangle.dx,
            x: this.btnPosition.x - (this.rectangle.dx / 2),
            y:this.btnPosition.y - (this.rectangle.dy / 2),
        }
    }
}