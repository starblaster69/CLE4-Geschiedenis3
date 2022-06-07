import * as PIXI from 'pixi.js'
import townImage from "./images/Map & Terrain/ZeldaWorld.png"
import playerImage from "./images/PlayerCharacters/Player.png"
import npcImage from "./images/NonPlayerCharacters/holbewoner.png"
import knuppelImage from "./images/PlayerCharacters/playerWeapons/WoodenClub.png"
import { TownMap } from "./TownMap"
import { Player} from "./Player"
import { Npc } from "./Npc"
import { UPDATE_PRIORITY } from 'pixi.js'

export class Game{
    public pixi : PIXI.Application //canvas element in de html file
    private loader : PIXI.Loader
    private player : Player
    private npc: Npc
    public townMap : TownMap

    constructor(){
        console.log("ik ben een game")
        this.pixi = new PIXI.Application({ width: 700, height: 500})
        console.log(this.pixi)
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader.add('townTexture', townImage)
        this.loader.add('playerSprite', playerImage)
        this.loader.add('npcSprite', npcImage)
        this.loader.add('woodclubTexture', knuppelImage)
        this.loader.add("attack", "attack.json")

        this.loader.load(()=>this.loadCompleted())


    }

    private loadCompleted() {
        //creates background image
        this.townMap = new TownMap(this.loader.resources["townTexture"].texture!)
        this.pixi.stage.addChild(this.townMap)

        //creates player character
        this.player = new Player(this, this.townMap, this.loader.resources["playerSprite"].texture!, this.loader.resources['woodclubTexture'].texture!)
        this.pixi.stage.addChild(this.player)

        //creates npc
        this.npc = new Npc(this.loader.resources["npcSprite"].texture!)
        this.pixi.stage.addChild(this.npc)

        //updater
        this.pixi.ticker.add((delta) => this.update(delta))

        this.pixi.stage.x = this.pixi.screen.width / 2;
        this.pixi.stage.y = this.pixi.screen.height / 2;

        this.pixi.ticker.add((delta) => this.update(delta));
    }

    public update(delta: number){
        this.player.update(delta)
    
        if(this.collision(this.player, this.npc)){
            console.log("player touches enemy 💀")
        }
    }

    private collision(sprite1:PIXI.Sprite, sprite2:PIXI.Sprite) {
        const bounds1 = sprite1.getBounds()
        const bounds2 = sprite2.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }
}

let g = new Game()