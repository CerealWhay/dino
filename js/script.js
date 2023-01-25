
/* index script */

/*
* max-radios
* circle numbers
* type of coloring
* */

import {Circle} from "./Circle.js";

Vue.createApp({
    data() {
        return {
            canvasWidth: 1200,
            canvasHeight: 600,


            coloringTypes: {
                noPaint: 'noPaint',
                fullPaint: 'fullPaint',
                borderPaint: 'borderPaint',
            },

            minRadius: 10,
            maxRadius: 100,
            circlesAmount: 1,
            coloringType: null,

            canvas: null,
            ctx: null,
            circles: [],
        }
    },
    mounted() {
        this.initCanvas();

        for (let i = 0; i < this.circlesAmount; i++) {
            const circle = new Circle(
                this.ctx,
                this.canvasWidth,
                this.canvasHeight,
                this.minRadius,
                this.maxRadius,
            );
            this.animateCircle(circle)
            this.circles.push(circle)
        }
    },
    watch: {
        minRadius(newMinRadius) {
            const intValue = parseInt(newMinRadius);
            this.circles.forEach((circle) => circle.changeRadius(intValue, this.maxRadius))
        },
        maxRadius(newMaxRadius) {
            const intValue = parseInt(newMaxRadius);
            this.circles.forEach((circle) => circle.changeRadius(this.minRadius, intValue))
        },
        circlesAmount(newCirclesAmount, oldCirclesAmount) {
            if (parseInt(newCirclesAmount) >= parseInt(oldCirclesAmount)) {
                const value = parseInt(newCirclesAmount) - parseInt(oldCirclesAmount);
                for (let i = 0; i < value; i++) {
                    const circle = new Circle(
                        this.ctx,
                        this.canvasWidth,
                        this.canvasHeight,
                        this.minRadius,
                        this.maxRadius,
                    );
                    this.animateCircle(circle)
                    this.circles.push(circle)
                }
            } else {
                const value = parseInt(oldCirclesAmount) - parseInt(newCirclesAmount);
                for (let i = 0; i < value; i++) {
                    let circle = this.circles.pop();
                    circle.deleteCircle()
                }
            }
        }
    },
    methods: {
        initCanvas() {
            this.canvas = this.$refs.canvas;
            this.ctx = this.canvas.getContext('2d')

            this.canvas.width = this.canvasWidth;
            this.canvas.height = this.canvasHeight;
        },
        animateCircle(circle) {
            circle.moveCircle()
            window.requestAnimationFrame(() => this.animateCircle(circle))
        }
    },
    template: `
    
    <div class="container">
        <canvas ref="canvas"></canvas>
        
        <div>
            <label>
                <div>
                    min radius : {{ minRadius }}
                </div>
                <input v-model="minRadius" type="range" min="0" :max="maxRadius" step="10">
            </label>
        </div>
        <div>
            <label>
                <div>
                    max radius : {{ maxRadius }}
                </div>
                <input v-model="maxRadius" type="range" :min="minRadius" max="1000" step="10">
            </label>
        </div>
        
                <div>
            <label>
                <div>
                    circles amount : {{ circlesAmount }}
                </div>
                <input v-model="circlesAmount" type="range" :min="1" max="10" step="1">
            </label>
        </div>

        
    </div>
    
    `
}).mount('#app')





