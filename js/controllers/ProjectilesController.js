import {CANVAS} from "../models/Canvas.js";
import {ProjectileController} from "./ProjectileController.js";


export class ProjectilesController {

    projectiles = []

    frame() {
        this.projectiles.forEach(
            (projectileController) => projectileController.frame()
        )
        this.clearProjectiles()
    }

    addProjectile(mousePosition, playerPosition) {
        const projectileController = new ProjectileController()
        projectileController.setCoordinates(mousePosition, playerPosition)

        this.projectiles.push(projectileController)
    }

    clearProjectiles() {
        this.projectiles.forEach((projectileController, index) => {
            const {x, y} = projectileController.projectile.getPosition()
            if (
                x < 0
                || x > CANVAS.getCanvasRect().width
                || y < 0
                || y > CANVAS.getCanvasRect().height
            ) {
                setTimeout(() => this.projectiles.splice(index, 1), 0)
            }
        })
    }
}