import {CANVAS} from "../models/Canvas.js";
import {
    PlayerController,
    AimController,
    ProjectilesController,

    KeyboardController,
} from "../controllers"

/* @todo:
     сделать коллизию вражины и игрока
     сделать рефактор, а то пиздец ваще сложна файл огромный
     сделать score
     сделать усложнение (увеличение потока врагов) с увеличением score
     сделать restart кнопку

     вынести обработку нажатий на клаву куда-то,
     сделать модельки покрасивше
     сделать стрельбу зажимом
     сделать полоску хп, чтобы не от одгного вражины дохнуть
     сделать несколько видов оружия
     сделалть врагов-боссов (кторые не умирают от одного выстрела)
     сделать ходьбу у игрока с инерцией
*/

export const app = Vue.createApp({
    components: {
        KeyboardController
    },
    data() {
        return {
            canvasInstance: null,
            ctx: null,
            canvasRect: null,

            playerController: null,
            aimController: null,
            projectilesController: [],

            enemies: [],
        }
    },
    mounted() {
        this.initCanvas();
        // setInterval(this.createEnemy, 1000)
    },
    methods: {
        initCanvas() {
            this.createCanvas();
            this.playerController = new PlayerController();
            this.aimController = new AimController();
            this.projectilesController = new ProjectilesController();

            this.animateCanvas();
        },
        createCanvas() {
            this.canvasInstance = CANVAS
            this.canvasInstance.setCanvasNode(this.$refs.canvas)

            this.ctx = this.canvasInstance.getCtx();
            this.canvasRect = this.canvasInstance.getCanvasRect();
        },
        // createEnemy() {
        //     const enemy = new Enemy(
        //         this.ctx,
        //         {x:0, y:0}
        //     )
        //     enemy.setPosition(this.canvasRect)
        //     enemy.setVelocity(this.playerPosition)
        //     this.enemies.push(enemy)
        // },
        animateCanvas() {
            // clear rect
            this.ctx.fillStyle = 'rgba(227,227,227,0.8)'
            this.ctx.fillRect(0, 0, this.canvasRect.width, this.canvasRect.height)

            // draw projectiles
            this.projectilesController.frame();

            // draw player
            this.playerController.frame()

            // draw aim
            this.aimController.frame()

            // draw enemies
            // this.enemies.forEach((enemy, enemyIndex) => {
            //     enemy.setVelocity(this.playerPosition)
            //     enemy.move()
            //     enemy.draw()
            //
            //     this.projectiles.forEach((projectile, projectileIndex) => {
            //         const dist = Math.hypot(
            //             projectile.getPosition().x - enemy.getPosition().x,
            //             projectile.getPosition().y - enemy.getPosition().y,
            //         )
            //         if (dist <= enemy.getRadius()) {
            //             setTimeout(() => {
            //                 this.projectiles.splice(projectileIndex, 1);
            //                 this.enemies.splice(enemyIndex, 1);
            //             }, 0)
            //         }
            //     })
            // })

            window.requestAnimationFrame(this.animateCanvas)
        },

        shoot(e) {
            this.projectilesController.addProjectile(
                {x: e.clientX, y: e.clientY},
                this.playerController.getPlayer().getPosition()
            )
        },
        changeAim(e) {
            this.aimController.setPlayerPos(this.playerController.getPlayer().getPosition())
            this.aimController.setMousePos({x: e.clientX, y: e.clientY});
        },
        changeControls(e) {
            this.playerController.setControls(e)
        },
    },
    // language=Vue
    template: `

      <div class="container">

      <canvas
          ref="canvas"
          @mousedown="shoot($event)"
          @mousemove="changeAim"
      ></canvas>

      <KeyboardController 
          v-on:changeControls="changeControls"
      ></KeyboardController>
      </div>

    `
})