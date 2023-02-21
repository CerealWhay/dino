import {CANVAS} from "../models/Canvas.js";
import {
    PlayerController,
    AimController,
    ProjectilesController,
    EnemiesController,

    KeyboardController,
    CollisionController,
} from "../controllers/index.js"
import {getCanvasMousePosition} from "../common/canvasMousePosition.js";
import {MainMenu} from "./mainMenu.js";
import {Overlay} from "./overlay.js";

/* @todo:
     сделать усложнение (увеличение потока врагов) с увеличением score
     сделать полоску хп, чтобы не от одгного вражины дохнуть
     сделать стрельбу зажимом
     сделать звуки

     сделать сохранение на беке (что то вроде таблицы рекордов)
     сделать модельки покрасивше
     сделать несколько видов оружия
     сделалть врагов-боссов (кторые не умирают от одного выстрела)
     система улучшений (лвла, улучшеные шмотки, плюсы к хп, скорости)
     сделать милишное оружие
*/

export const app = Vue.createApp({
    components: {
        KeyboardController,
        MainMenu,
        Overlay
    },
    data() {
        return {
            animation: null,

            canvasInstance: null,
            ctx: null,
            canvasRect: null,

            playerController: null,
            aimController: null,
            projectilesController: null,
            enemiesController: null,
            collisionController: null,

            pause: false,
            isNewGame: true,
            score: null,
        }
    },
    watch: {
        isNewGame(b) {
            if (b) {
                window.cancelAnimationFrame(this.animation)
            }
        }
    },
    methods: {
        init() {
            this.score = 0;
            this.isNewGame = false;

            this.createCanvas();
            this.playerController = new PlayerController();
            this.aimController = new AimController();
            this.projectilesController = new ProjectilesController();
            this.enemiesController = new EnemiesController();
            this.collisionController = new CollisionController();

            this.animation = window.requestAnimationFrame(this.animateCanvas)
        },
        createCanvas() {
            this.canvasInstance = CANVAS
            this.canvasInstance.setCanvasNode(this.$refs.canvas)
            this.ctx = this.canvasInstance.getCtx();
            this.canvasRect = this.canvasInstance.getCanvasRect();
        },
        animateCanvas() {
            if (!this.pause) {
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

                const collision = this.collisionController.frame({
                    playerController: this.playerController,
                    projectilesController: this.projectilesController,
                    enemiesController: this.enemiesController,
                });
                if (collision.isDeath) {
                    console.log('loser!!!');
                    this.isNewGame = true;
                }
                if (collision.kills) {
                    this.score += collision.kills * 10;
                }
            }
            this.animation = window.requestAnimationFrame(this.animateCanvas)
        },

        shoot(e) {
            const canvasMousePos = getCanvasMousePosition(this.canvasRect, {x: e.clientX, y: e.clientY})
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

      <MainMenu
          v-show="pause || isNewGame"
          :is-new-game="isNewGame"
          :score="score"
          @start="init"
          @resume="pause = false"
      ></MainMenu>
      
      <Overlay 
          v-show="!pause && !isNewGame"
          :score="score"
      ></Overlay>

      <canvas
          ref="canvas"
          @mousedown="shoot($event)"
          @mousemove="changeAim"
      ></canvas>

      <KeyboardController 
          v-if="ctx"
          @changeControls="changeControls"
          @pause="pause = !pause"
      ></KeyboardController>
      </div>

    `
})