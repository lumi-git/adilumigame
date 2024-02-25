import { ColliderComponent } from "../GameEngine/Components/ColliderComponent";
import { DrawRectangleComponent } from "../GameEngine/Components/DrawRectangleComponent";
import { PlayerMovementComponent } from "../GameEngine/Components/PlayerMovementComponent";
import { GameObject } from "../GameEngine/GameObject";
import { Serializable } from "../GameEngine/Serialized";
import { Vector2 } from "../GameEngine/Vector2";
import socketWrapper from "../SocketUtils/socketWrapper";

export class player extends GameObject {

    @Serializable
    private clientID: string;

    @Serializable
    private bruh: string = "bruh";

    asyncStart(): void {
        this.clientID = socketWrapper.getInstance().getID();
        console.log(this.clientID);
    }


    start(): void {
    
        if( this.clientID == socketWrapper.getInstance().getID()){
            this.attachCamera();
            this.addComponent(new PlayerMovementComponent(this,0.2));
        }
        this.getTransform().setScale(new Vector2(10, 10));
        this.addDrawComponent(new DrawRectangleComponent(this, "#FF0000"));
        this.addColliderComponent(new ColliderComponent(this));
    }
}
