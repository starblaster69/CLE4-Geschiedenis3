import * as PIXI from 'pixi.js'
import { Assets } from './assets'
import { TownMap } from "./TownMap"
import { Player} from "./Player"
import { Npc } from "./Npc"
import { UPDATE_PRIORITY } from 'pixi.js'
import { QuestTracker } from './QuestTracker'

/* 
** alle afbeelding worden nu geladen in assets.ts. assets.ts is extended als pixi.loader.
** als je een nieuwe npc sprite toe wilt voegen, maak een entry aan in static/npcs.json, 
** en import & load het in assets.ts
** zorg dat de npcsToLoad waardes identiek zijn aan de filename excl. .png
*/

export class Game{
    private pixi : PIXI.Application //canvas element in de html file
    public assets = new Assets(this)
    public questTracker : QuestTracker
    private player : Player
    private npcsToLoad : string[] = []
    private npcs: Npc[] = []
    public townMap : TownMap

    // public quests = [{ //TEMPORARY
    //     "questName" : "bunnyMurder",
    //     "questStatus" : 0,
    //     "questReward" : "magicSword",
    //     "stages" : [
    //         "not started",
    //         "objective 1",
    //         "objective 2",
    //         "completed"
    //     ]
    // }]

    constructor(){
        console.log("ik ben een game")
        this.pixi = new PIXI.Application({ width: 800, height: 800 })
        document.body.appendChild(this.pixi.view)
    }

    public loadCompleted() {
        //creates quest tracker object
        this.questTracker = new QuestTracker(this, this.assets.questsJson)

        //creates background image
        this.townMap = new TownMap(this.assets.resources["townTexture"].texture!)
        this.pixi.stage.addChild(this.townMap)

        //creates player character
        this.player = new Player(this.townMap, this.assets.resources["playerSprite"].texture!, this.assets.resources['woodclubTexture'].texture!)
        this.pixi.stage.addChild(this.player)

        //creates npc
        this.npcsToLoad.push("Holbewoner", "Bunny") //maak de string identiek aan de sprite filename zonder .png
        for(let npcName of this.npcsToLoad){
            let npcData = this.assets.npcJson.find(item => item.name === npcName)
            console.log(npcData)
            let npc = new Npc(this.assets.resources[npcName].texture!, npcData.name, npcData.questName, npcData.url, npcData.direction, npcData.x, npcData.y, npcData.scale, npcData.anchor)
            this.pixi.stage.addChild(npc)
            this.npcs.push(npc)
        }
        
        //updater
        this.pixi.ticker.add((delta) => this.update(delta))
    }

    public update(delta : number){
        this.player.update()
        
        for(let npc of this.npcs){
            if(this.collision(this.player, npc)){
            console.log("player touches enemy 💀")
            this.questTracker.checkStatus(npc.questName)
            }
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