import { ColliderComponent } from "../GameEngine/Components/ColliderComponent";
import { DrawElipseComponent } from "../GameEngine/Components/DrawElipseComponent";
import { GameObject } from "../GameEngine/GameObject";
import { Vector2 } from "../GameEngine/Vector2";

export class point extends GameObject {
    private gfx: DrawElipseComponent;
    start(): void {
        this.gfx = new DrawElipseComponent(this, "#FF0000");
        this.getTransform().setScale(new Vector2(10,10));
        this.addDrawComponent(this.gfx);
        this.addColliderComponent(new ColliderComponent(this));

    }

    onCollision(collider: ColliderComponent): void {
        this.gfx.setColor("#00FF00");
    }
}