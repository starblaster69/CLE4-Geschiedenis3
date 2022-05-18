import * as PIXI from 'pixi.js'

export class Player extends PIXI.Sprite {
    //variables
    xspeed: number
    yspeed: number
    direction: number //clockwise, starting at north, 0-3
    health: number
    //inventory: [string]


    constructor(texture: PIXI.Texture){
        super(texture)
        console.log("hyaa! i am link!")
        this.xspeed = 0
        this.yspeed = 0
        this.direction = 2

        this.health = 10
        //this.inventory.push("sword", "mysCrystal")

        this.x = 400
        this.y = 400
    
        this.scale.set(0.2)
        this.anchor.set(0.5)

        window.addEventListener("keydown", (e: KeyboardEvent) => this.move(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.unMove(e))
    }

    //operations
    update() {
        this.x += this.xspeed
        this.y += this.yspeed
    }
    move(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()){
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
        }
    }

    unMove(e: KeyboardEvent): void {
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

    interact(){

    }
    openInventory(){

    }
    takeDamage(){

    }
    die(){

    }
}