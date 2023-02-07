import {Player} from "../models/Player.js";
import {Enemy} from "../models/Enemy.js";
import {Projectile} from "../models/Projectile.js";
import {KeyboardEvents} from "./keyboardEvents.js";
import {AimLine} from "../models/Aim.js";

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

            aim: null,

            enemies: [],
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
        setInterval(this.createEnemy, 1000)
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
                {
                    x: this.canvasWidth / 2,
                    y: this.canvasHeight / 2,
                }
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
        createEnemy() {
            let position = {
                x: 0,
                y: 0,
            }
            if (Math.random() < 0.5) {
                position.x =  Math.random() < 0.5 ? 0 : this.canvasWidth;
                position.y =  Math.random() * this.canvasHeight;
            } else {
                position.x =  Math.random() * this.canvasWidth;
                position.y =  Math.random() < 0.5 ? 0 : this.canvasHeight;
            }

            const angle = Math.atan2(
                this.playerPosition.y - position.y,
                this.playerPosition.x - position.x,
            )
            const velocity = {
                x: Math.cos(angle),
                y: Math.sin(angle)
            }
            this.enemies.push(new Enemy(
                velocity,
                this.ctx,
                position
            ))
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
            this.aim.move(this.playerPosition, this.aim.getMousePos());
            this.aim.draw();

            // draw aim
            this.enemies.forEach((enemy, enemyIndex) => {
                const angle = Math.atan2(
                    this.playerPosition.y - enemy.getPosition().y,
                    this.playerPosition.x - enemy.getPosition().x,
                )
                const velocity = {
                    x: Math.cos(angle),
                    y: Math.sin(angle)
                }
                enemy.setVelocity(velocity)
                enemy.move()
                enemy.draw()

                this.projectiles.forEach((projectile, projectileIndex) => {
                    const dist = Math.hypot(
                        projectile.getPosition().x - enemy.getPosition().x,
                        projectile.getPosition().y - enemy.getPosition().y,
                    )
                    if (dist <= enemy.getRadius()) {
                        setTimeout(() => {
                            this.projectiles.splice(projectileIndex, 1);
                            this.enemies.splice(enemyIndex, 1);
                        }, 0)
                    }
                })
            })

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

            this.player.move({x: newPosition.x, y: newPosition.y});
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
        mousePos(e) {
            return {
                x: e.clientX - this.canvasRect.left,
                y: e.clientY - this.canvasRect.top
            }
        },
        shoot(e) {
            const angle = Math.atan2(
                this.mousePos(e).y - this.playerPosition.y,
                this.mousePos(e).x - this.playerPosition.x,
            )
            const velocity = {
                x: Math.cos(angle),
                y: Math.sin(angle)
            }
            this.projectiles.push(new Projectile(
                velocity,
                this.ctx,
                {
                    x: this.playerPosition.x,
                    y: this.playerPosition.y,
                }
            ))
        },
        changeAim(e) {
            this.aim.move(this.playerPosition, this.mousePos(e));
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

      <KeyboardEvents 
          v-on:keydown="keyboardEventKeydown" 
          v-on:keyup="keyboardEventKeyup" 
      ></KeyboardEvents>
      </div>

    `
})