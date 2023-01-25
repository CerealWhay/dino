export class Circle {
    constructor(
        ctx,
        maxWidth,
        maxHeight,
        minRadius,
        maxRadius
    ) {
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.ctx = ctx;

        this.positionX = Math.random() * this.maxWidth;
        this.positionY = Math.random() * this.maxHeight;
        this.radius = (Math.random() * (maxRadius - minRadius)) + minRadius;
        this.color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
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
        this.ctx.lineWidth = 3;
        this.drawCircle('#fff')
        this.ctx.lineWidth = 1;

        /* ТУТ ВСЯ МАГИЯ */
        // this.drawCircle('#fff')
        // this.drawCircle('#fff0')

        /* рисуем новый круг */
        let newX = this.positionX + (1 *  (Math.random() < 0.5 ? -1 : 1));
        if (newX <= this.maxWidth && newX >= 0) {
            this.positionX = newX;
        }

        let newY = this.positionY + (1 *  (Math.random() < 0.5 ? -1 : 1));
        if (newY <= this.maxHeight && newY >= 0) {
            this.positionY = newY;
        }
        this.drawCircle()
    }

    changeRadius(newMinRadius, newMaxRadius) {
        this.ctx.lineWidth = 3;
        this.drawCircle('#fff')
        this.ctx.lineWidth = 1;
        this.radius = (Math.random() * (newMaxRadius - newMinRadius)) + newMinRadius;
    }

    deleteCircle() {
        this.ctx.lineWidth = 3;
        this.drawCircle('#fff')
        this.ctx.lineWidth = 1;

        this.radius = 0;
    }
}