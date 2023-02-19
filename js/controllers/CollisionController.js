export class CollisionController {

    frame(controllers) {
        const {
            playerController,
            projectilesController,
            enemiesController,
        } = controllers

        const isDeath = this.playerDeath(playerController, enemiesController);
        const kills = this.killEnemy(projectilesController, enemiesController);

        return  {
            kills: kills,
            isDeath: isDeath
        };
    }

    playerDeath(playerController, enemiesController) {
        const enemies = enemiesController.getEnemies();
        let isDeath = false;

        enemies.forEach((enemyController) => {
            const dist = Math.hypot(
                playerController.getPlayer().getPosition().x - enemyController.getEnemy().getPosition().x,
                playerController.getPlayer().getPosition().y - enemyController.getEnemy().getPosition().y,
            )
            if (dist <= (enemyController.getEnemy().getRadius() + playerController.getPlayer().getRadius())) {
                isDeath = true
            }
        })
        return isDeath;
    }

    killEnemy(projectilesController, enemiesController) {
        const projectiles = projectilesController.getProjectiles();
        const enemies = enemiesController.getEnemies();

        let kills = 0;

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
                    kills++;
                }
            })
        })
        return kills;
    }

}