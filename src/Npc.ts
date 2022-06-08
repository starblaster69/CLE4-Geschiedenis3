import * as PIXI from 'pixi.js'

export class Npc extends PIXI.Sprite {
    //variables
    public name: string
    public questName: string
    private url: string
    private direction: number //clockwise, starting at north, 0-3

    constructor(texture: PIXI.Texture, name: string, questName: string, url: string, direction: number, x: number, y: number, scale: number, anchor: number){
        super(texture)
        //console.log("i am an npc!")

        //data is filled in from the static/npcs.json file. alter/add it there
        this.name = name
        this.questName = questName
        this.url = url

        this.direction = direction
        this.x = x
        this.y = y
            
        this.scale.set(scale)
        this.anchor.set(anchor)
    }
    private dialogue() {
        /* switch
            case for each quest flag
                line of dialogue to display
            default
                default dialogue  */

    }
    private questUpdate() {
        /* switch
            case for each quest flag, check if the goal is achieved
                increase quest flag counter
                run dialogue function
            default
                default dialogue  */
    }
}