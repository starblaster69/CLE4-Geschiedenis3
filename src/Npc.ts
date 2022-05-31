import * as PIXI from 'pixi.js'
//import npcsJson from "./npcs.json"

export class Npc extends PIXI.Sprite {
    //variables
    direction: number //clockwise, starting at north, 0-3
    name: string
    questName: string
    url: string

    constructor(texture: PIXI.Texture, name: string, questName: string, url: string, direction: number, x: number, y: number, scale: number, anchor: number){
        super(texture)
        console.log("i am an npc!")

        this.name = name
        this.questName = questName
        this.url = url

        this.direction = direction
        this.x = x
        this.y = y
            
        this.scale.set(scale)
        this.anchor.set(anchor)
    }
    dialogue(){
        /* switch
            case for each quest flag
                line of dialogue to display
            default
                default dialogue  */
        
    }
    questUpdate(){
        /* switch
            case for each quest flag, check if the goal is achieved
                increase quest flag counter
                run dialogue function
            default
                default dialogue  */
    }
}