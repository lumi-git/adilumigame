import type p5 from "p5";
import { Game } from "../Game";
import { GameObject } from "../GameObject";
import { TypeRegistry } from "../TypeRegistry";
import socketWrapper from "../../SocketUtils/socketWrapper";

export abstract class AbstractScene {

    gameObjects:Map<number, GameObject>;

    objectsByTag:Map<string, GameObject[]>;

    typeRegistry = new TypeRegistry();

    game?:Game;

    constructor() {
        this.gameObjects = new Map<number, GameObject>();
        this.objectsByTag = new Map<string, GameObject[]>();
    }

    attachGame(game: Game){
        this.game = game;
    }

    addObjectByTag(obj: GameObject){
        if (!this.objectsByTag.has(obj.getTag())){
            this.objectsByTag.set(obj.getTag(), []);
        }
        this.objectsByTag.get(obj.getTag())?.push(obj);
    }


    getObjectsByTag(tag: string): GameObject[]{
        return this.objectsByTag.get(tag) || [];
    }

    removeObjectByTag(obj: GameObject){
        this.objectsByTag.get(obj.getTag())?.splice(this.objectsByTag.get(obj.getTag())?.indexOf(obj)!, 1);
    }


    addObject(obj: GameObject){
        obj.Mstart();
        if (obj.getId() == -1){
            obj.setId(this.getnewLocalObjectId());
        }
        this.addObjectByTag(obj);
        this.gameObjects.set(obj.getId(),obj);
    }

    removeObject(obj: GameObject){
        obj.Mend();
        this.removeObjectByTag(obj);
        this.gameObjects.delete(obj.getId());
    }

    removeObjectById(id: number){
        this.gameObjects.get(id)?.Mend();
        this.objectsByTag.get(this.gameObjects.get(id)!.getTag())?.splice(this.objectsByTag.get(this.gameObjects.get(id)!.getTag())?.indexOf(this.gameObjects.get(id)!)!, 1);
        this.gameObjects.delete(id);
    }

    moveObject(obj: GameObject, x: number, y: number){
        obj.getTransform().getPosition().setX(x);
        obj.getTransform().getPosition().setY(y);
    }

    UpdateState(serverState: any) {

    }

    updateObject(id:number, state:any){
        this.gameObjects.get(id)?.updateFromRequest(state);
    }


    sendToGame(req: any){
       socketWrapper.getInstance().send(req);
    }

    Mstart(p:p5){
        this.start(p);
    }

    start(p:p5){
    }


    getTypeRegistry(): TypeRegistry {
        return this.typeRegistry;
    }

    Mend(){
        for(var ob of this.gameObjects.values()){
            ob.Mend();
        }
        this.end()
    }

    end(){

    }
    

}