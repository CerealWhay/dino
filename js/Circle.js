export class Circle {
    constructor(
        ctx,
        positionX,
        positionY,
        radius,
        color
    ) {
        this.ctx = ctx;
        this.positionX = positionX;
        this.positionY = positionY;
        this.radius = radius;
        this.color = color;
    }

    draw = (color = this.color) => {
        this.ctx.fillStyle = color
        this.ctx.beginPath();
        this.ctx.arc(
            this.positionX,
            this.positionY,
            this.radius,
            0,
            Math.PI * 2,
            false
        );
        this.ctx.closePath();
        this.ctx.fill();
    }

    moveCircleMouse(x, y) {
        this.positionX = x;
        this.positionY = y;
        this.draw()
    }
}