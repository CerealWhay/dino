export class DynamicCricle {

    radius = 15;

    constructor(
        ctx,
        positionX,
        positionY,
    ) {
        this.ctx = ctx;
        this.positionX = positionX;
        this.positionY = positionY;
    }

    getPosition() {
        return {
            x: this.positionX,
            y: this.positionY,
        }
    }

    getRadius() {
        return this.radius;
    }

    draw() {
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
}