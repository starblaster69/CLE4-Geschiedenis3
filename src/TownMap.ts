import * as PIXI from 'pixi.js'

export class TownMap extends PIXI.Sprite {

    private tree:PIXI.Sprite

    constructor(texture: PIXI.Texture){
        super(texture)
        this.width = 3048
        this.height = 2041 //4041


        this.tree = new PIXI.Sprite(PIXI.Texture.WHITE)
        this.tree.width = 50
        this.tree.height = 50

        this.addChild(this.tree)
    }
}