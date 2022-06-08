import * as PIXI from 'pixi.js'
import townImage from "./images/Map & Terrain/ZeldaWorld.png"
import playerImage from "./images/PlayerCharacters/Player.png"
import npcImageHolbewoner from "./images/NonPlayerCharacters/Holbewoner.png"
import npcImageBunny from "./images/NonPlayerCharacters/Bunny.png"
import knuppelImage from "./images/PlayerCharacters/playerWeapons/WoodenClub.png"
import { Game } from './game'

type AssetFile = { name: string, url: string }

export class Assets extends PIXI.Loader {
    public npcJson: any[] = []
    public questsJson: any[] = []
    private toLoad: AssetFile[] = []

    constructor(g: Game) {
        super()

        this.questsJson = [{ //TEMPORARY
            "questName" : "bunnyMurder",
            "questStatus" : 0,
            "questReward" : "magicSword",
            "stages" : [
                "not started",
                "objective 1",
                "objective 2",
                "completed"
            ]
        }]

        this.fetchRequest("npc")
        //this.fetchRequest("quest")

        //all the images and other files to be added to the loader, can be freely added to
        this.toLoad = [
            { name: 'townTexture', url: townImage },
            { name: 'playerSprite', url: playerImage },
            { name: 'Holbewoner', url: npcImageHolbewoner },
            { name: 'Bunny', url: npcImageBunny },
            { name: 'woodclubTexture', url: knuppelImage },
            //{ name: 'attack', url: 'attack.json' } //attack.json does not exist. gives an error
        ]

        //adds all above assets
        this.toLoad.forEach(asset => {
            // Add to loader
            this.add(asset.name, asset.url)
        })

        //shows loading progress and any errors in the console
        this.onError.add((arg) => { console.error(arg) })
        this.onProgress.add((loader) => this.showProgress(loader))
        // call load and point to callback
        this.load(() => g.loadCompleted())
    }

    private showProgress(loader: PIXI.Loader) {
        console.log(`Loading ${loader.progress}%`)
    }

    //fetches JSON from selected file. currently npcs only, ask Roxy of you want to fetch other files as well
    private fetchRequest(type: string) {
        // let fetchAdress : string
        // let fetchHeader : any

        // switch (type) {
        //     case "npc":
        //         fetchAdress = `../npcs.json`
        //         fetchHeader = this.npcFetchHeader
        //         break
        //     case "quest":
        //         fetchAdress = `../quests.json`
        //         fetchHeader = this.questFetchHeader
        //         break    
        // }

        fetch(`../npcs.json`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((data: any) => this.npcFetchHeader(data))
            .catch((err: string) => this.AJAXErrorHandler(err));
    }

    /** fetch request error handler */
    private AJAXErrorHandler(data: string) {
        console.error("AJAX load error: " + data)
    }

    //npc fetch success handler, pushes all the npc data into the npcJson array for easy access
    private npcFetchHeader(data: any) {
        for (let i = 0; i < data.length; i++) {
            this.npcJson.push(data[i])
        }
    }
    private questFetchHeader(data: any) {
        console.log(data)
    }
}
