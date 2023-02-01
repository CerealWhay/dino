import {Player} from "../models/Player.js";
import {Projectile} from "../models/Projectile.js";
import {KeyboardEvents} from "./keyboardEvents.js";
import {AimLine} from "../models/Aim.js";

/* @todo:
     сделать врагов (просто будут появляться с краев и идти на игрока)
     сделать score
     сделать усложнение (увеличение потока врагов) с увеличением score
     сделать restart кнопку

     вынести обработку нажатий на клаву куда-то,
     сделать стрельбу зажимом
     сделать несколько видов оружия
     сделалть врагов-боссов (кторые не умирают от одного выстрела)
     сделать ходьбу у игрока с инерцией
*/


export const app = Vue.createApp({
    components: {
        KeyboardEvents
    },
    data() {
        return {
            canvasWidth: 1200,
            canvasHeight: 600,
            canvas: null,
            ctx: null,

            player: null,
            isPlayerUp: false,
            isPlayerDown: false,
            isPlayerLeft: false,
            isPlayerRight: false,

            projectiles: [],
            isShooting: false,

            aim: null
        }
    },
    computed: {
        playerPosition() {
            return this.player.getPosition();
        },
        canvasRect() {
            return this.canvas.getBoundingClientRect()
        }
    },
    mounted() {
        this.initCanvas();
    },
    methods: {
        initCanvas() {
            this.canvas = this.$refs.canvas;
            this.ctx = this.canvas.getContext('2d')
            this.canvas.width = this.canvasWidth;
            this.canvas.height = this.canvasHeight;

            this.createPlayer();
            this.createAim();
            this.animateCanvas();
        },
        createPlayer() {
            this.player = new Player(
                this.ctx,
                this.canvasWidth / 2,
                this.canvasHeight / 2,
            );
        },
        createAim() {
            this.aim = new AimLine(
                this.ctx,
                this.playerPosition,
                {
                    x: this.canvasWidth / 2,
                    y: this.canvasHeight / 2,
                }
            );
        },
        animateCanvas() {
            // clear rect
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
            this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)

            // draw projectiles
            this.projectiles.forEach((projectile) => {
                projectile.move()
                projectile.draw()
            })
            this.clearProjectiles();

            // draw player
            this.movePlayer();
            this.player.draw()

            // draw aim
            this.aim.move(this.playerPosition, this.aim.getVelocity());
            this.aim.draw();

            window.requestAnimationFrame(this.animateCanvas)
        },
        keyboardEventKeydown (e) {
            switch(e.code) {
                case 'KeyW' :
                    this.isPlayerUp = true;
                    break
                case 'KeyS' :
                    this.isPlayerDown = true;
                    break
                case 'KeyA' :
                    this.isPlayerLeft = true;
                    break
                case 'KeyD' :
                    this.isPlayerRight = true;
                    break
            }
        },
        keyboardEventKeyup (e) {
            switch(e.code) {
                case 'KeyW' :
                    this.isPlayerUp = false;
                    break
                case 'KeyS' :
                    this.isPlayerDown = false;
                    break
                case 'KeyA' :
                    this.isPlayerLeft = false;
                    break
                case 'KeyD' :
                    this.isPlayerRight = false;
                    break
            }
        },
        movePlayer() {
            const newPosition = {
                x: this.playerPosition.x,
                y: this.playerPosition.y,
            }

            if (
                this.isPlayerUp
                && newPosition.y > this.player.getRadius()
            ) {
                newPosition.y -= 5;
            }
            if (
                this.isPlayerDown
                && newPosition.y < this.canvasHeight - this.player.getRadius()
            ) {
                newPosition.y += 5;
            }
            if (
                this.isPlayerLeft
                && newPosition.x > this.player.getRadius()
            ) {
                newPosition.x -= 5;
            }
            if (
                this.isPlayerRight
                && newPosition.x < this.canvasWidth - this.player.getRadius()
            ) {
                newPosition.x += 5;
            }

            this.player.move(newPosition.x, newPosition.y);
        },
        clearProjectiles() {
            this.projectiles.forEach((projectile, index) => {
                const {x, y} = projectile.getPosition()
                const radius = projectile.getRadius()
                if (
                    x + radius < 0
                    || x - radius > this.canvasWidth
                    || y + radius < 0
                    || y - radius > this.canvasHeight
                ) {
                    setTimeout(() => this.projectiles.splice(index, 1), 0)
                }
            })
        },
        shoot(e) {
            const angle = Math.atan2(
                e.clientY - this.canvasRect.top - this.playerPosition.y,
                e.clientX - this.canvasRect.left - this.playerPosition.x,
            )
            const velocity = {
                x: Math.cos(angle),
                y: Math.sin(angle)
            }
            this.projectiles.push(new Projectile(
                velocity,
                this.ctx,
                this.playerPosition.x,
                this.playerPosition.y
            ))
        },
        changeAim(e) {

            const mousePos = {
                x: e.clientX - this.canvasRect.left,
                y: e.clientY - this.canvasRect.top
            }

            const angle = Math.atan2(
                mousePos.y - this.playerPosition.y,
                mousePos.x - this.playerPosition.x,
            )

            // удлинение прицела
            const extension = 1500;
            const x = (Math.cos(angle) * extension) + mousePos.x;
            const y = (Math.sin(angle) * extension) + mousePos.y;

            this.aim.move(this.playerPosition, {x, y});
            this.aim.draw();
        }
    },
    // language=Vue
    template: `

      <div class="container"
      >

      <canvas
          ref="canvas"
          @mousedown="shoot($event)"
          @mousemove="changeAim"
      ></canvas>

      <KeyboardEvents 
          v-on:keydown="keyboardEventKeydown" 
          v-on:keyup="keyboardEventKeyup" 
      ></KeyboardEvents>
      </div>

    `
})