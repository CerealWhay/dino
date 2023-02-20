

class Canvas {

    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    setCanvasNode(canvasNode) {
        this.canvas = canvasNode
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    getCtx() {
        return this.canvas.getContext('2d')
    }

    getCanvasRect() {
        return this.canvas.getBoundingClientRect()
    }
}

export const CANVAS = new Canvas(innerWidth, innerHeight)