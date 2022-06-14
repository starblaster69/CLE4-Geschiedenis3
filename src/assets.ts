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

        this.fetchRequest("npcs")
        this.fetchRequest("quests")

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

    //shows loading progress and any errors in the console
    private showProgress(loader: PIXI.Loader) {
        console.log(`Loading ${loader.progress}%`)
    }

    private fetchRequest(type: string) {
        fetch(`../${type}.json`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((data: any) => { 
                if (type === "npcs") {
                    this.npcFetchHeader(data)
                } else if (type === "quests") {
                    this.questFetchHeader(data)
                }
            }) 
            .catch((err: string) => this.AJAXErrorHandler(err));
    }

    /** fetch request error handler */
    private AJAXErrorHandler(data: string) {
        console.error("AJAX load error: " + data)
    }

    // NPC Json fetch success handler, loads everything into a global array.
    private npcFetchHeader(data: any) {
        //console.log(data.length)
        //console.log(data)
        for (let i = 0; i < data.length; i++) {
            // console.log(data)
            this.npcJson.push(data[i])
            // console.log(this.npcJson[i])
        }
        // console.log(this.npcJson)
    }

    // Quests Json fetch success handler, loads everything into a global array.
    private questFetchHeader(data: any){
        for (let i = 0; i < data.length; i++) {
            // console.log(data)
            this.questsJson.push(data[i])
            // console.log(this.questsJson[i])
        }
    }
}
