import { Vector2 } from "./Vector2";

export class Road {
    startid: string;
    endid: string;
    constructor( start: string, end: string){
        this.startid = start;
        this.endid = end;
    }

    setStart(start: string){
        this.startid = start;
    }

    setEnd(end: string){
        this.endid = end;
    }



}