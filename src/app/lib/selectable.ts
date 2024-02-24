import { Vector2 } from "./Vector2";
import p5 from "p5";

export class Selectable {
    hoovered: boolean = false;
    public location: Vector2 = new Vector2(0,0);
    public size: Vector2 = new Vector2(20,20);
    id:string ;
    type: string = "selectable";
    constructor(location: Vector2,size:Vector2,id:string){
        this.location = location;
        this.size = size;
        this.id = id;
    }

    protected updateSelectable(p:p5){
        this.hoovered = false;
        if (p.mouseX > this.location.getX() && p.mouseX < this.location.getX() + this.size.getX() && p.mouseY > this.location.getY() && p.mouseY < this.location.getY() + this.size.getY()){
            this.hoovered = true;
        }
    }

}
