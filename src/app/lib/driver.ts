import p5 from "p5";
import { Vector2 } from "./Vector2";
import { Selectable } from "./selectable";

export class driver extends Selectable {
    id: string;
    constructor(id: string, location: Vector2){
        super(location,id);
        this.type = "driver";
    }

    draw(p:p5)
    {
        p.fill(0,0,255);
        p.ellipse(this.location.getX(), this.location.getY(), 10, 10);
        if(this.hoovered){
            p.text(this.id, this.location.getX(), this.location.getY());
        }
    }

    update(p:p5){
        this.updateSelectable(p);
        this.draw(p);
    }
} 