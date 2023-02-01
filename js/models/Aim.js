export class AimLine {


    constructor(
        ctx,
        playerPos,
        mousePos
    ) {
        this.ctx = ctx;
        this.playerPos = playerPos;
        this.mousePos = mousePos;
    }

    getMousePos() {
        return this.mousePos;
    }

    target() {
        const angle = Math.atan2(
            this.mousePos.y - this.playerPos.y,
            this.mousePos.x - this.playerPos.x,
        )
        // удлинение прицела
        const extension = 1500;
        const x = (Math.cos(angle) * extension) + this.mousePos.x;
        const y  = (Math.sin(angle) * extension) + this.mousePos.y;

        return {x: x, y: y}
    }

    draw() {
        this.ctx.strokeStyle= 'rgba(0, 0, 0, 0.1)'
        this.ctx.beginPath();
        this.ctx.moveTo(this.playerPos.x,this.playerPos.y);
        this.ctx.lineTo(this.target().x,this.target().y);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    move(playerPos, mousePos) {
        this.playerPos = playerPos
        this.mousePos = mousePos
    }




}