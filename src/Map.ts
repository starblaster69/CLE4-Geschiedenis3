import * as PIXI from 'pixi.js'

export class Map extends PIXI.Sprite {
    constructor(texture: PIXI.Texture){
        super(texture)
        this.width = 800
        this.height = 800
    }
}