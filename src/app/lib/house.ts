import p5 from "p5";
import { Vector2 } from "./Vector2";
import { building } from "./building";

export class house extends building{

    constructor(id: string, name: string, location: Vector2) {
        super(id, name, location,new Vector2(20,20));
        this.type = "house";
    }

    draw(p:p5){
        p.fill(0,255,0);
        p.rect(this.location.getX(), this.location.getY(), this.size.getX(), this.size.getY());
        if (this.hoovered){
            p.fill(255,255,255);
            p.text(this.name, this.location.getX(), this.location.getY());
        }
    }
}
