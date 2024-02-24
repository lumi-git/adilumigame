import p5 from "p5";
import { Vector2 } from "./Vector2";
import { Selectable } from "./selectable";

export class driver extends Selectable {
    id: string;
    constructor(id: string, location: Vector2){
        super(location,new Vector2(10,10),id);
        this.type = "driver";
    }

    draw(p:p5)
    {
        p.fill(0,0,255);
        p.ellipse(this.location.getX(), this.location.getY(), this.size.getX(), this.size.getY());
        if(this.hoovered){
            p.fill(255,255,255);
            p.text(this.id, this.location.getX(), this.location.getY());
        }
    }

    update(p:p5){
        this.updateSelectable(p);
        p.ellipseMode(p.CORNER);
        this.draw(p);
    }
} 