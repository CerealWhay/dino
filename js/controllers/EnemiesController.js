import {EnemyController} from "./EnemyController.js";
import {throttle} from "../common/throttle.js";


export class EnemiesController {

    constructor() {
        this.enemies = []
        this.throttledAddEnemy = throttle(this.addEnemy, 1000)
    }

    frame(playerPosition) {
        this.throttledAddEnemy(playerPosition)

        this.enemies.forEach(
            (enemyController) => {
                enemyController.setDeltaPosition(playerPosition)
                enemyController.frame()
            }
        )
    }

    addEnemy = (playerPosition) => {
        const enemyController = new EnemyController()
        enemyController.setCoordinates(playerPosition)
        this.enemies.push(enemyController)
    }
}