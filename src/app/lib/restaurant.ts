import p5 from "p5";
import { Vector2 } from "./Vector2";
import { building } from "./building";

export class restaurant extends building {

    constructor(id: string, name: string, location: Vector2) {
        super(id, name, location);
        this.type = "restaurant";
    }

    draw(p:p5){
        p.fill(255,0,0);
        p.rect(this.location.getX(), this.location.getY(), 20, 20);
    }
}
