import {DynamicCircle} from "./DynamicCircle.js";

export class Enemy extends DynamicCircle {

    radius = 20;

    constructor(...args) {
        super(...args);
    }

    draw() {
        this.ctx.fillStyle = 'red'
        super.draw()
    }

    move() {
        this.position.x += this.velocity.x * 0.5;
        this.position.y += this.velocity.y * 0.5;
    }

    setPosition(canvasRect) {
        if (Math.random() < 0.5) {
            this.position.x =  Math.random() < 0.5 ? 0 : canvasRect.width;
            this.position.y =  Math.random() * canvasRect.height;
        } else {
            this.position.x =  Math.random() * canvasRect.width;
            this.position.y =  Math.random() < 0.5 ? 0 : canvasRect.height;
        }
    }

    setVelocity(playerPosition) {
        const angle = Math.atan2(
            playerPosition.y - this.position.y,
            playerPosition.x - this.position.x,
        )
        this.velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
    }
}