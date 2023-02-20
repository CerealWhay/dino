import {AimLine} from "../models/index.js";

export class AimController {

    playerPos = {
        x: 0,
        y: 0,
    }

    mousePos = {
        x: 0,
        y: 0,
    }

    constructor() {
        this.aim = new AimLine();
    }

    frame() {
        this.aim.draw(this.playerPos, this.getTarget());
    }

    setPlayerPos(playerPos) {
        this.playerPos = playerPos
    }

    setMousePos(mousePos) {
        this.mousePos = mousePos;
    }

    getTarget() {
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
}