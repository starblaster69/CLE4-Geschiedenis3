import * as PIXI from 'pixi.js'
import { TownMap } from './TownMap'

export class Player extends PIXI.Sprite {
    //variables
    private xspeed: number
    private yspeed: number
    private direction: number //clockwise, starting at north, 0-3
    private health: number
    private woodclubTexture: PIXI.Texture
    //inventory: [string]
    private townMap: TownMap

    constructor(townMap: TownMap, texture: PIXI.Texture, woodclubTexture: PIXI.Texture) {
        super(texture)
        console.log("hyaa! i am link!")
        this.xspeed = 0
        this.yspeed = 0
        this.direction = 2
        this.townMap = townMap

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
    public update() {
        // todo only aan de rand van het scherm
       

        console.log(this.x + this.y)
    

        if (this.townMap.x <= 0 && this.townMap.y <= 0) {
            this.townMap.x -= this.xspeed
            this.townMap.y -= this.yspeed
        } else {
            this.x += this.xspeed
            this.y += this.yspeed
        }

        // if (this.x <= 0 && this.y <= 0) {
        //     this.x += this.xspeed
        //     this.y += this.yspeed
        // } else {
        //     this.townMap.x -= this.xspeed
        //     this.townMap.y -= this.yspeed
        // }


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