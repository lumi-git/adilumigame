import { Vector2 } from "./Vector2";
import p5 from "p5";

export class Selectable {
    hoovered: boolean = false;
    public location: Vector2;
    id:string ;
    type: string = "selectable";
    constructor(location: Vector2,id:string){
        this.location = location;
        this.id = id;
    }

    protected updateSelectable(p:p5){
        this.hoovered = false;
        if (p.mouseX > this.location.getX() && p.mouseX < this.location.getX() + 20 && p.mouseY > this.location.getY() && p.mouseY < this.location.getY() + 20){
            this.hoovered = true;
        }
    }

}
