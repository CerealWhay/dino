import {Circle} from "../Circle.js";
import {ColorPicker} from "./colorpicker.js";

export const app = Vue.createApp({
    components: {
        'color-picker':  ColorPicker
    },
    data() {
        return {
            canvasWidth: 1200,
            canvasHeight: 600,

            radius: 10,
            color: 'blue',

            canvas: null,
            ctx: null,
            pen: null,

            isDrawing: false,
            drawedCircles: [],
        }
    },
    computed: {
        canvasRect() {
            return this.canvas.getBoundingClientRect()
        }
    },
    mounted() {
        this.initCanvas();
    },
    watch: {
        radius() {
            this.createDefaultPen()
        },
        color() {
            this.createDefaultPen()
        },
    },
    methods: {
        initCanvas() {
            this.canvas = this.$refs.canvas;
            this.ctx = this.canvas.getContext('2d')

            this.canvas.width = this.canvasWidth;
            this.canvas.height = this.canvasHeight;

            this.createDefaultPen()
            this.animateCircle(this.pen)
        },
        createDefaultPen() {
            this.pen = new Circle(
                this.ctx,
                10 + parseInt(this.radius),
                this.canvasRect.height - this.radius - 10,
                this.radius,
                this.color
            )
        },
        animateCircle() {
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
            this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
            this.drawedCircles.forEach((drawedCircle) => drawedCircle.draw())
            this.pen.draw()
            window.requestAnimationFrame(this.animateCircle)
        },
        moveCircle(event) {
            const x = event.pageX - this.canvasRect.left;
            const y = event.pageY - this.canvasRect.top;
            this.pen.moveCircleMouse(x, y)
            if (this.isDrawing) {
                setTimeout(() => {
                    this.drawedCircles.push(new Circle(this.ctx, x, y, this.radius, this.color))
                }, 0)

            }
        },
    },
    // language=Vue
    template: `

      <div class="container">

      <canvas
          ref="canvas"
          @mousemove="moveCircle($event)"
          @mousedown="isDrawing = true"
          @mouseup="isDrawing = false"
      ></canvas>

      <div>
        <label>
          <div>
            radius : {{ radius }}
          </div>
          <input v-model="radius" type="range" min="0" max="100">
        </label>
      </div>
      <color-picker v-model:color="color"></color-picker>

      </div>

    `
})