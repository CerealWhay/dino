export class AimLine {


    constructor(
        ctx,
        center,
        target
    ) {
        this.ctx = ctx;
        this.center = center;
        this.target = target;
    }

    getVelocity() {
        return this.target;
    }

    draw() {
        this.ctx.strokeStyle= 'rgba(0, 0, 0, 0.1)'
        this.ctx.beginPath();
        this.ctx.moveTo(this.center.x,this.center.y);
        this.ctx.lineTo(this.target.x,this.target.y);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    move(center, target) {
        this.center = center
        this.target = target
    }


}