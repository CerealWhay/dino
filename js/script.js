
/* index script */

const MAX_WIDTH = 1200;
const MAX_HEIGHT = 600;

const canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
canvas.width = MAX_WIDTH;
canvas.height = MAX_HEIGHT;


class Circle {
    ctx;
    positionX = Math.random() * 1200;
    positionY = Math.random() * 600;
    radius = 10;
    color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    constructor(ctx) {
        this.ctx = ctx;
    }

    drawCircle = (color = this.color) => {
        this.ctx.strokeStyle = color
        this.ctx.beginPath();
        this.ctx.arc(
            this.positionX,
            this.positionY,
            this.radius,
            0,
            Math.PI * 2,
            false
        );
        this.ctx.closePath();
        this.ctx.stroke();
    }

    moveCircle = () => {
        /* Зарисовывваем круг на прошлом его месте */
        ctx.lineWidth = 3;
        this.drawCircle('#fff')
        ctx.lineWidth = 1;

        /* ТУТ ВСЯ МАГИЯ */
        // this.drawCircle('#fff')
        // this.drawCircle('#fff0')

        /* рисуем новый круг */
        let newX = this.positionX + (1 *  (Math.random() < 0.5 ? -1 : 1));
        if (newX <= canvas.width && newX >= 0) {
            this.positionX = newX;
        }

        let newY = this.positionY + (1 *  (Math.random() < 0.5 ? -1 : 1));
        if (newY <= canvas.height && newY >= 0) {
            this.positionY = newY;
        }
        this.drawCircle()
    }
}

const animateCircle = (circle) => {
    circle.moveCircle()
    window.requestAnimationFrame(() => animateCircle(circle))
}

for (let i = 0; i < 100; i++) {
    let circle = new Circle(ctx);
    animateCircle(circle)
}





