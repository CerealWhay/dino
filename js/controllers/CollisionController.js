export class CollisionController {

    frame(controllers) {
        const {
            playerController,
            projectilesController,
            enemiesController,
        } = controllers

        this.playerDeath(playerController, enemiesController);
        this.killEnemy(projectilesController, enemiesController);

    }

    playerDeath(playerController, enemiesController) {
        const enemies = enemiesController.getEnemies();

        enemies.forEach((enemyController) => {
            const dist = Math.hypot(
                playerController.getPlayer().getPosition().x - enemyController.getEnemy().getPosition().x,
                playerController.getPlayer().getPosition().y - enemyController.getEnemy().getPosition().y,
            )
            if (dist <= (enemyController.getEnemy().getRadius() + playerController.getPlayer().getRadius())) {
                console.log('you lose!')
            }
        })
    }

    killEnemy(projectilesController, enemiesController) {
        const projectiles = projectilesController.getProjectiles();
        const enemies = enemiesController.getEnemies();

        enemies.forEach((enemyController) => {
            projectiles.forEach((projectileController) => {
                const dist = Math.hypot(
                    projectileController.getProjectile().getPosition().x - enemyController.getEnemy().getPosition().x,
                    projectileController.getProjectile().getPosition().y - enemyController.getEnemy().getPosition().y,
                )
                if (dist <= enemyController.getEnemy().getRadius()) {
                    setTimeout(() => {
                        projectilesController.removeProjectile(projectileController)
                        enemiesController.removeEnemy(enemyController)
                    }, 0)
                }
            })
        })
    }

}