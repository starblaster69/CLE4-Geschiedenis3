import * as PIXI from 'pixi.js'
import { Assets } from './assets'
import { Map } from "./Map"
import { Player} from "./Player"
import { Npc } from "./Npc"
import { UPDATE_PRIORITY } from 'pixi.js'


export class Game{
    pixi : PIXI.Application //canvas element in de html file
    assets = new Assets(this)
    player : Player
    npcsToLoad : string[] = []
    npcs: Npc[] = []

    constructor(){
        console.log("ik ben een game")
        this.pixi = new PIXI.Application({ width: 800, height: 800 })
        document.body.appendChild(this.pixi.view)
    }

    loadCompleted() {
        //creates background image
        let townMap = new Map(this.assets.resources["townTexture"].texture!)
        this.pixi.stage.addChild(townMap)

        //creates player character
        this.player = new Player(this.assets.resources["playerSprite"].texture!)
        this.pixi.stage.addChild(this.player)

        //creates npc
        this.npcsToLoad.push("Holbewoner", "Bunny")
        for(let npcName of this.npcsToLoad){
            let npcData = this.assets.npcJson.find(item => item.name === npcName)
            console.log(npcData)
            let npc = new Npc(this.assets.resources[`npc${npcName}`].texture!, npcData.name, npcData.questName, npcData.url, npcData.direction, npcData.x, npcData.y, npcData.scale, npcData.anchor)
            this.pixi.stage.addChild(npc)
            this.npcs.push(npc)
        }
        
        //updater
        this.pixi.ticker.add((delta) => this.update(delta))
    }

    public update(delta : number){
        this.player.update(delta)
        
        for(let npc of this.npcs){
            if(this.collision(this.player, npc)){
            console.log("player touches enemy 💀")
            }
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