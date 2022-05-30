import * as PIXI from 'pixi.js'

export class Npc extends PIXI.Sprite {
    //variables
    private direction: number //clockwise, starting at north, 0-3
    public name: string

    private questName: string
    private questStatus: number //0 = not started, 1 = started no progress, 9 = completed, 2-8 is progress flags(optional)
    private questReward: string

    constructor(texture: PIXI.Texture) {
        super(texture)
        console.log("i am an npc!")
        this.direction = 2
        this.name = "steve"

        this.questName = "bunnyMurder"
        this.questStatus = 0
        this.questReward = "flimsyBow"

        this.x = 240
        this.y = 230

        this.scale.set(0.1)
        this.anchor.set(0.5)
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