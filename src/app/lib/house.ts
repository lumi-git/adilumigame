import p5 from "p5";
import { Vector2 } from "./Vector2";
import { building } from "./building";

export class house extends building{

    constructor(id: string, name: string, location: Vector2) {
        super(id, name, location);
        this.type = "house";
    }

    draw(p:p5){
        p.fill(0,255,0);
        p.rect(this.location.getX(), this.location.getY(), 20, 20);
    }
}
