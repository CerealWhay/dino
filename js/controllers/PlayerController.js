import {Player} from "../models/index.js";

export class PlayerController {

    controls = null;
    constructor() {
        this.player = new Player();
        this.controls = {
            isPlayerUp: false,
            isPlayerDown: false,
            isPlayerLeft: false,
            isPlayerRight: false,
        }
    }

    frame() {
        this.move();
        this.player.draw()
    }

    getPlayer() {
        return this.player
    }

    setControls(controls) {
        this.controls = controls
    }

    move() {
        const {
            isPlayerUp,
            isPlayerDown,
            isPlayerLeft,
            isPlayerRight,
        } = this.controls

        const newPosition = this.player.getPosition()

        if (
            isPlayerUp
            && newPosition.y > this.player.getRadius()
        ) {
            newPosition.y -= 5;
        }
        if (
            isPlayerDown
            && newPosition.y < this.player.canvas.getCanvasRect().height - this.player.getRadius()
        ) {
            newPosition.y += 5;
        }
        if (
            isPlayerLeft
            && newPosition.x > this.player.getRadius()
        ) {
            newPosition.x -= 5;
        }
        if (
            isPlayerRight
            && newPosition.x < this.player.canvas.getCanvasRect().width - this.player.getRadius()
        ) {
            newPosition.x += 5;
        }

        this.player.setPosition(newPosition);
    }
}