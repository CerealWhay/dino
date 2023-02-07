export class DynamicCircle {

    radius = 15;
    position = {
        x: 0,
        y: 0,
    }

    constructor(
        ctx,
        position,
    ) {
        this.ctx = ctx;
        this.position.x = position.x;
        this.position.y = position.y;
    }

    getPosition() {
        return {
            x: this.position.x,
            y: this.position.y,
        }
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