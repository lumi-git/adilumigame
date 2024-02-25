import type p5 from "p5";
import { Component } from "../Component";
import { Game } from "../Game";
import type { GameObject } from "../GameObject";
import { ClientGame } from "../GameTypes/ClientGame";

export class ColliderComponent extends Component {
    constructor(parent:GameObject) {
        super(parent);
    }
    
    update(p:p5,dt:number) {
        ClientGame.getInstance().getCollisionSystem().insert(this);
    }

    MonCollisionEnter(collider:ColliderComponent) {
        this.getParent().MonCollision(collider);

    }

}