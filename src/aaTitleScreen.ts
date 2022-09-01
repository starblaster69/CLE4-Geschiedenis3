import * as PIXI from 'pixi.js'
import playButton from "./images/titleScreen/playButton.png"
import background from "./images/titleScreen/openingScreen.png"
import { TilingSprite } from 'pixi.js';

export class theTitleScreen{

    private pixi : PIXI.Application;
    private loader : PIXI.Loader;

    constructor() {
        this.pixi = new PIXI.Application({width: 1440, height: 1129});
        this.pixi.stage.interactive = true;
        this.pixi.stage.hitArea = this.pixi.renderer.screen;
        document.body.appendChild(this.pixi.view);

        this.loader = new PIXI.Loader();
        this.loader.add('pressPlay', playButton)
        this.loader.add('backgroundTitleScreen', background)
        this.loader.load(()=>this.loadCompleted());
    }

    loadCompleted(): void {
        let theTitleScreen = new PIXI.Sprite(this.loader.resources["backgroundTitleScreen"].texture!);
        let thePlayButton = new PIXI.Sprite(this.loader.resources["pressPlay"].texture!);
        this.pixi.stage.addChild(theTitleScreen);
        this.pixi.stage.addChild(thePlayButton);

        thePlayButton.interactive = true;
        thePlayButton.buttonMode = true;
        thePlayButton.on('pointerdown', this.onClick);

        thePlayButton.anchor.set(0.5);
        thePlayButton.y = 50;
        thePlayButton.x = 400;

        background.width = 1440;
        background.height = 1129;
    }

    onClick() {
        console.log("click");
        window.location.href="aatitleScreen.html";
    }
}

new theTitleScreen();