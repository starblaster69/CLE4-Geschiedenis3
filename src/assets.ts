import * as PIXI from 'pixi.js'
import townImage from "./images/zeldaWorld.png"
import playerImage from "./images/grug.png"
import npcImageHolbewoner from "./images/npcHolbewoner.png"
import npcImageBunny from "./images/npcBunny.png"
import { Game } from './game'

export class Assets extends PIXI.Loader {
    public npcJson: any[] = []

    constructor(g: Game) {
        super()

        this.fetchRequest("npc")

        this.add('townTexture', townImage)
        this.add('playerSprite', playerImage)
        this.add('npcHolbewoner', npcImageHolbewoner)
        this.add('npcBunny', npcImageBunny)
        this.load(()=>g.loadCompleted())

        /*this.npcAssets.forEach(asset => {
            // Add to loader
            this.add(asset.name, asset.url)
        })

        this.onError.add((arg) => { console.error(arg) })
                this.onProgress.add((loader) => this.showProgress(loader))
                // call load and point to callback
                this.load(() => g.loadCompleted())*/        
    }

    /*private showProgress(loader: PIXI.Loader) {
        console.log(`Loading ${loader.progress}%`)
    }*/

    private fetchRequest(type: string) {
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
    private npcFetchHeader(data: any) {
        //console.log(data.length)
        //console.log(data)
        for (let i = 0; i < data.length; i++) {
            //console.log(data)
            this.npcJson.push(data[i])
            console.log(this.npcJson[i])
        }
        console.log(this.npcJson)
    }
}
