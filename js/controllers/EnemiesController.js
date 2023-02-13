import {CANVAS} from "../models/Canvas.js";


export class EnemiesController {

    enemies = []

    constructor() {
        this.canvas = CANVAS
    }

    frame() {
    }

    getEnemies() {
        return this.enemies
    }

}