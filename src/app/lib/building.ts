import p5 from "p5";
import { Vector2 } from "./Vector2";
import { Selectable } from "./selectable";

export class building extends Selectable {
    
    name: string;
    buildingType: string;

    constructor(id: string, name: string, location: Vector2) {
        super(location,id);
        this.name = name;
        this.type = "building";
        this.buildingType = "default";
    }

    draw(p:p5){

    }

    update(p:p5){
        this.updateSelectable(p);
        this.draw(p);
    }
}
