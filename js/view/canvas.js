import {CANVAS} from "../models/Canvas.js";
import {
    PlayerController,
    AimController,
    ProjectilesController,
    EnemiesController,

    KeyboardController,
    CollisionController,
} from "../controllers"
import {PlayButton} from "../models/canvasModels";
import {getCanvasMousePosition} from "../common/canvasMousePosition.js";

/* @todo:
     сделать интерфейс меню, с главным окном (кнопка play), счетчиком убийств, паузой
     сделать score
     сделать усложнение (увеличение потока врагов) с увеличением score
     сделать restart кнопку

     сделать модельки покрасивше
     сделать стрельбу зажимом
     сделать полоску хп, чтобы не от одгного вражины дохнуть
     сделать несколько видов оружия
     сделалть врагов-боссов (кторые не умирают от одного выстрела)
     сделать ходьбу у игрока с инерцией (под вопросом)
     сделать звуки
     система улучшений (лвла, улучшеные шмотки, плюсы к хп, скорости)
     сделать милишное оружие
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
            projectilesController: null,
            enemiesController: null,
            collisionController: null,

            isPause: true,
            pauseBtn: null,
        }
    },
    mounted() {
        this.init();

        this.pauseBtn = new PlayButton()

        this.animateCanvas();


    },
    methods: {
        init() {
            this.createCanvas();
            this.playerController = new PlayerController();
            this.aimController = new AimController();
            this.projectilesController = new ProjectilesController();
            this.enemiesController = new EnemiesController();
            this.collisionController = new CollisionController();
        },
        createCanvas() {
            this.canvasInstance = CANVAS
            this.canvasInstance.setCanvasNode(this.$refs.canvas)
            this.ctx = this.canvasInstance.getCtx();
            this.canvasRect = this.canvasInstance.getCanvasRect();
        },
        animateCanvas() {
            if (!this.isPause) {
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
                this.enemiesController.frame(
                    this.playerController.getPlayer().getPosition()
                )

                this.collisionController.frame({
                    playerController: this.playerController,
                    projectilesController: this.projectilesController,
                    enemiesController: this.enemiesController,
                });
            } else {
                this.ctx.fillStyle = 'rgba(204,204,204,0.8)'
                this.ctx.fillRect(0, 0, this.canvasRect.width, this.canvasRect.height)

                this.pauseBtn.draw();
            }
            window.requestAnimationFrame(this.animateCanvas)
        },

        clickEvent(e) {
            const canvasMousePos = getCanvasMousePosition(this.canvasRect, {x: e.clientX, y: e.clientY})

            if (
                this.isPause
                && canvasMousePos.x > this.pauseBtn.getRectangle().x
                && canvasMousePos.x < this.pauseBtn.getRectangle().x + this.pauseBtn.getRectangle().width
                && canvasMousePos.y > this.pauseBtn.getRectangle().y
                && canvasMousePos.y < this.pauseBtn.getRectangle().y + this.pauseBtn.getRectangle().height
            ) {
                this.isPause = false
                return;
            }
            this.projectilesController.addProjectile(
                canvasMousePos,
                this.playerController.getPlayer().getPosition()
            )
        },
        changeAim(e) {
            this.aimController.setPlayerPos(this.playerController.getPlayer().getPosition())
            this.aimController.setMousePos(
                getCanvasMousePosition(this.canvasRect, {x: e.clientX, y: e.clientY})
            );
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
          @mousedown="clickEvent($event)"
          @mousemove="changeAim"
      ></canvas>

      <KeyboardController 
          v-on:changeControls="changeControls"
          v-on:pause="isPause = $event"
      ></KeyboardController>
      </div>

    `
})