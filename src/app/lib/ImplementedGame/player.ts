import { ColliderComponent } from "../GameEngine/Components/ColliderComponent";
import { DrawRectangleComponent } from "../GameEngine/Components/DrawRectangleComponent";
import { PlayerMovementComponent } from "../GameEngine/Components/PlayerMovementComponent";
import { GameObject } from "../GameEngine/GameObject";
import { Vector2 } from "../GameEngine/Vector2";

export class player extends GameObject {
    start(): void {
        this.addComponent(new PlayerMovementComponent(this,0.2));
        this.getTransform().setScale(new Vector2(10, 10));
        this.attachCamera();
        this.addDrawComponent(new DrawRectangleComponent(this, "#FF0000"));
        this.addColliderComponent(new ColliderComponent(this));
    }
}