import p5 from "p5";
import { Vector2 } from "./Vector2";
import { building } from "./building";

export class intersection extends building{
    constructor(id: string, location: Vector2) {
        super(id, "intersection" + id.toString(), location,new Vector2(20,20));
        this.type = "intersection";
    }

    draw(p:p5){ 
        p.fill(255,255,255);
        p.ellipse(this.location.getX(), this.location.getY(), this.size.getX(), this.size.getY());
    }
}
