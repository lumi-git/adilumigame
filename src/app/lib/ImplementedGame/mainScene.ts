
import { Scene } from "../GameEngine/Scene";
import type p5 from "p5";
import { point } from "./point";
import { player } from "./player";
import { Game } from "../GameEngine/Game";


export class mainScene extends Scene {

    constructor() {
        super();
    }

    start(p: p5) {

        this.addObject(new player());

        p.mouseClicked = () => {
            var pt = new point();
            pt.getTransform().getPosition().setX(Game.getInstance().getMousePosition().getX());
            pt.getTransform().getPosition().setY(Game.getInstance().getMousePosition().getY());
            this.addObject(pt);
        }

        console.log("Hello from default Scene");
        for (let i = 0; i < 100; i++) {
            var pt = new point();
            pt.getTransform().getPosition().setX(Math.random()*p.windowWidth);
            pt.getTransform().getPosition().setY(p.random()*p.windowHeight);
            this.addObject(pt);
        }



    }

}

