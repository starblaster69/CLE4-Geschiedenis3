import * as PIXI from 'pixi.js'
import townImage from "./images/zeldaTown.png"
import playerImage from "./images/grug.png"
import npcImage from "./images/holbewoner.png"
import { Map } from "./Map"
import { Player} from "./Player"
import { Npc } from "./Npc"
import { UPDATE_PRIORITY } from 'pixi.js'
let playerGlobal: Player

class Game{
    pixi : PIXI.Application //canvas element in de html file
    loader : PIXI.Loader
    player : PIXI.Sprite

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
        let player = new Player(this.loader.resources["playerSprite"].texture!)
        this.pixi.stage.addChild(player)
        playerGlobal = player

        //creates npc
        let npc = new Npc(this.loader.resources["npcSprite"].texture!)
        this.pixi.stage.addChild(npc)

        //updater
        this.pixi.ticker.add((delta) => update(delta))
    }
}

let g = new Game()


function update(delta : number){
    playerGlobal.update()
}