import * as PIXI from 'pixi.js'
import { TownMap } from './TownMap'
import { Game } from './game'

export class Player extends PIXI.Sprite {
    //variables
    private xspeed: number;
    private yspeed: number;
    private direction: number; //clockwise, starting at north, 0-3
    private health: number;
    private woodclubTexture: PIXI.Texture;
    private townMap: TownMap;
    private game: Game;
     //inventory: [string]

    constructor(game: Game, townMap: TownMap, texture: PIXI.Texture, woodclubTexture: PIXI.Texture) {
        super(texture)
        
        console.log("hyaa! i am link!");
        this.xspeed = 0;
        this.yspeed = 0;
        this.direction = 2;
        this.townMap = townMap;

        this.game = game;
        this.anchor.set(0.5);
        this.x = game.pixi.screen.width / 2;
        this.y = game.pixi.screen.height / 2;

        this.health = 10
        //this.inventory.push("sword", "mysCrystal")

        this.x = 400
        this.y = 400

        this.scale.set(0.2)
        this.anchor.set(0.5)

        this.woodclubTexture = woodclubTexture

        window.addEventListener("keydown", (e: KeyboardEvent) => this.move(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.unMove(e))
    }

    //operations
    public update(delta: number) {

        let mapwidth = 3010
        let mapheight = 1984
        let centerx = 350
        let centery = 250

        // beweeg het karakter over de map maar niet buiten beeld
        this.x = this.clamp(this.x + this.xspeed, 36, mapwidth)
        this.y = this.clamp(this.y + this.yspeed, 48, mapheight)

        let mapx = this.clamp(this.x, centerx, mapwidth - centerx)
        let mapy = this.clamp(this.y, centery, mapheight - centery)
        this.game.pixi.stage.pivot.set(mapx, mapy)    


        console.log("X:", this.x, "Y:", this.y)
    }

    clamp(num: number, min: number, max: number) {
        return Math.min(Math.max(num, min), max)
    }


    private move(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "A":
            case "ARROWLEFT":
                this.direction = 3
                this.xspeed = -3
                break
            case "D":
            case "ARROWRIGHT":
                this.direction = 1
                this.xspeed = 3                
                break
            case "W":
            case "ARROWUP":
                this.direction = 0
                this.yspeed = -3
                break
            case "S":
            case "ARROWDOWN":
                this.direction = 2
                this.yspeed = 3
                break
            case "K":
                this.attack()
        }
    }

    private attack() {

        console.log("ATTACKKKKK")
        this.texture = this.woodclubTexture

    }

    private unMove(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xspeed = 0
                break
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.yspeed = 0
                break
        }
    }

    interact() {

    }
    openInventory() {

    }
    takeDamage() {

    }
    die() {

    }
}