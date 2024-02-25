import type p5 from "p5";
import type { GameObject } from "./GameObject";

export class Component {
    private parent: GameObject;
    private serverSide: boolean = false;
    constructor(parent: GameObject) {
        this.parent = parent;
    }

    setServerSide (serverSide: boolean) {
        this.serverSide = serverSide;
    }

    getParent() {
        return this.parent;
    }

    start() {
    }

    ServerStart() {
        
    }

    update(p: p5,dt:number) {
    
    }

    ServerUpdate(dt:number) {
        
    }

    end() {
    
    }

    Serverend() {
    
    }

}
