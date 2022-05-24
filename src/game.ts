import * as PIXI from 'pixi.js'
import townImage from "./images/zeldaWorld.png"
import playerImage from "./images/grug.png"
import npcImage from "./images/holbewoner.png"
import { Map } from "./Map"
import { Player} from "./Player"
import { Npc } from "./Npc"
import { UPDATE_PRIORITY } from 'pixi.js'

class Game{
    pixi : PIXI.Application //canvas element in de html file
    loader : PIXI.Loader
    player : Player
    npc: Npc

    constructor(){
        console.log("ik ben een game")
        this.pixi = new PIXI.Application({ width: 800, height: 800 })
        console.log(this.pixi)
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader.add('townTexture', townImage)
        this.loader.add('playerSprite', playerImage)
        this.loader.add('npcSprite', npcImage)
        this.loader.load(()=>this.loadCompleted())
    }

    loadCompleted() {
        //creates background image
        let townMap = new Map(this.loader.resources["townTexture"].texture!)
        this.pixi.stage.addChild(townMap)

        //creates player character
        this.player = new Player(this.loader.resources["playerSprite"].texture!)
        this.pixi.stage.addChild(this.player)

        //creates npc
        this.npc = new Npc(this.loader.resources["npcSprite"].texture!)
        this.pixi.stage.addChild(this.npc)

        //updater
        this.pixi.ticker.add((delta) => this.update(delta))
    }

    public update(delta : number){
        this.player.update()
    
        if(this.collision(this.player, this.npc)){
            console.log("player touches enemy 💀")
        }
    }

    collision(sprite1:PIXI.Sprite, sprite2:PIXI.Sprite) {
        const bounds1 = sprite1.getBounds()
        const bounds2 = sprite2.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }
}

let g = new Game()