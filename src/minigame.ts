import * as PIXI from 'pixi.js'

import berryImage from "./images/berry.png"
import bushImage from "./images/bush.png"
import { Application } from 'pixi.js'



const pixi = new PIXI.Application({ width: 1800, height : 960, backgroundColor : 0xFFFF00});
document.body.appendChild(pixi.view);

const berry = PIXI.Sprite.from(berryImage)
const blackberry = PIXI.Sprite.from(berryImage)
const blackberry1 = PIXI.Sprite.from(berryImage)
const blackberry2 = PIXI.Sprite.from(berryImage)
const blackberry3 = PIXI.Sprite.from(berryImage)
const blackberry4 = PIXI.Sprite.from(berryImage)
const background = PIXI.Sprite.from(bushImage)


//Radius of the filter, the size of the filter
const radius = 100;

//The sharpness of the filter
const blurSize = 3; //32 normal


const circle = new PIXI.Graphics()
    .beginFill(0xFF0000)
    .drawCircle(radius + blurSize, radius + blurSize, radius) //making the circle
    .endFill();
circle.filters = [new PIXI.filters.BlurFilter(blurSize)];

const bounds = new PIXI.Rectangle (0, 0, (radius + blurSize) * 2, (radius + blurSize) * 2);
const texture = pixi.renderer.generateTexture(circle, PIXI.SCALE_MODES.NEAREST, 0, bounds);
const focus = new PIXI.Sprite(texture);



    background.width = pixi.screen.width;
    background.height = pixi.screen.height;
    pixi.stage.addChild(background)

    
    pixi.stage.addChild(focus);
    berry.mask = focus;
    blackberry.mask = focus;
    blackberry1.mask = focus;
    blackberry2.mask = focus;
    blackberry3.mask = focus;
    blackberry4.mask = focus;
    
    pixi.stage.interactive = true;
    pixi.stage.on('mousemove', pointerMove);

    function pointerMove(event) {
        focus.position.x = event.data.global.x - focus.width / 2;
        focus.position.y = event.data.global.y - focus.height / 2;
    }


berry.interactive = true;
berry.buttonMode = true;

berry
    .on('pointerdown', onBerryDown)
berry.anchor.set (0.5);
berry.scale.set(0.5);
berry.x = pixi.screen.width / 2;
berry.y = pixi.screen.height / 2;
berry.x = Math.random() * 1800;
berry.y = Math.random() * 960;

function onBerryDown() {
    console.log("back to game");
    window.location.href="index.html";
}


blackberry.anchor.set (0.5);
blackberry.scale.set(0.5);
blackberry.x = pixi.screen.width / 2;
blackberry.y = pixi.screen.height / 2;
blackberry.x = Math.random() * 1800;
blackberry.y = Math.random() * 960;
blackberry.tint = 0x000000

blackberry1.anchor.set (0.5);
blackberry1.scale.set(0.5);
blackberry1.x = pixi.screen.width / 2;
blackberry1.y = pixi.screen.height / 2;
blackberry1.x = Math.random() * 1800;
blackberry1.y = Math.random() * 960;
blackberry1.tint = 0x000000

blackberry2.anchor.set (0.5);
blackberry2.scale.set(0.5);
blackberry2.x = pixi.screen.width / 2;
blackberry2.y = pixi.screen.height / 2;
blackberry2.x = Math.random() * 1800;
blackberry2.y = Math.random() * 960;
blackberry2.tint = 0x000000

blackberry3.anchor.set (0.5);
blackberry3.scale.set(0.5);
blackberry3.x = pixi.screen.width / 2;
blackberry3.y = pixi.screen.height / 2;
blackberry3.x = Math.random() * 1800;
blackberry3.y = Math.random() * 960;
blackberry3.tint = 0x000000

blackberry4.anchor.set (0.5);
blackberry4.scale.set(0.5);
blackberry4.x = pixi.screen.width / 2;
blackberry4.y = pixi.screen.height / 2;
blackberry4.x = Math.random() * 1800;
blackberry4.y = Math.random() * 960;
blackberry4.tint = 0x000000

pixi.stage.addChild(berry);
pixi.stage.addChild(blackberry);
pixi.stage.addChild(blackberry1);
pixi.stage.addChild(blackberry2);
pixi.stage.addChild(blackberry3);
pixi.stage.addChild(blackberry4);