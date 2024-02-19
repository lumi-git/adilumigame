
import { Scene } from "../GameEngine/Scene";
import type p5 from "p5";
import { point } from "./point";


export class mainScene extends Scene {

    constructor() {
        super();
    }

    start(p: p5) {


        p.mouseClicked = () => {
            var pt = new point();
            pt.getTransform().getPosition().setX(p.mouseX);
            pt.getTransform().getPosition().setY(p.mouseY);
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

