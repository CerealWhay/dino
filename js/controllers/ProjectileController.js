import {Projectile} from "../models/index.js";

export class ProjectileController {
    constructor() {
        this.projectile = new Projectile();
        this.deltaPosition = {
            x: 0,
            y: 0,
        }
    }

    getProjectile() {
        return this.projectile
    }

    frame() {
        this.move()
        this.projectile.draw()
    }

    move() {
        this.projectile.getPosition().x += this.deltaPosition.x * 15;
        this.projectile.getPosition().y += this.deltaPosition.y * 15;
    }
    setCoordinates(mousePosition, playerPosition) {
        this.projectile.setPosition({x:playerPosition.x, y: playerPosition.y})

        const mousePos = mousePosition;

        const angle = Math.atan2(
            mousePos.y - playerPosition.y,
            mousePos.x - playerPosition.x,
        )
        this.deltaPosition = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
    }

}