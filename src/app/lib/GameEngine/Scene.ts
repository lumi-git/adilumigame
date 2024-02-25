import { gameRequestFactory } from "./gameRequestFactory";
import type p5 from "p5";
import { Camera } from "./Camera";
import { Game } from "./Game";
import { GameObject } from "./GameObject";
import { TypeRegistry } from "./TypeRegistry";
import socketWrapper from "../SocketUtils/socketWrapper";

export abstract class Scene {
    private serverSide: boolean = false;
    //this counter will be decrease to avoid id conflicts with server objects
    LocalObjectIdCounter: number = -100;
    
    //now game objects will be stored in the game object with the id as the key

    gameObjects:Map<number, GameObject>;

    objectsByTag:Map<string, GameObject[]>;

    typeRegistry = new TypeRegistry();

    game?:Game;

    constructor() {
        this.gameObjects = new Map<number, GameObject>();
        this.objectsByTag = new Map<string, GameObject[]>();
    }

    setServerSide (serverSide: boolean) {
        this.serverSide = serverSide;
    }

    attachGame(game: Game){
        this.game = game;
    }

    addObjectByTag(obj: GameObject){
        if (!this.objectsByTag.has(obj.getTag())){
            this.objectsByTag.set(obj.getTag(), []);
        }
        obj.setServerSide(this.serverSide);
        this.objectsByTag.get(obj.getTag())?.push(obj);
    }

    getObjectsByTag(tag: string): GameObject[]{
        return this.objectsByTag.get(tag) || [];
    }

    removeObjectByTag(obj: GameObject){
        this.objectsByTag.get(obj.getTag())?.splice(this.objectsByTag.get(obj.getTag())?.indexOf(obj)!, 1);
    }

    addObject(obj: GameObject){
        obj.setServerSide(this.serverSide);
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

    asyncAddObject(obj: GameObject){
        obj.setServerSide(this.serverSide);
        obj.asyncStart();
        var request = gameRequestFactory.getSpawnRequest();
        request.addMetadata("objectData", obj.toSerialized());
        this.sendToGame(request);
    }

    asyncRemoveObject(obj: GameObject){
        var request = gameRequestFactory.getDestroyRequest();
        request.addMetadata("objectData", obj.toSerialized());
        this.sendToGame(request);
    }

    asyncMoveObject(obj: GameObject, x: number, y: number){
        var oldx = obj.getTransform().getPosition().getX();
        var oldy = obj.getTransform().getPosition().getY();
        obj.getTransform().getPosition().setX(x);
        obj.getTransform().getPosition().setY(y);
        obj.setFutureTransform(obj.getTransform().copy());
        var request = gameRequestFactory.getUpdateRequest();
        request.addMetadata("objectData", obj.toSerialized());
        this.sendToGame(request);
    }

    UpdateState(serverState: any) {
        const serverIds = new Set<number>();
    
        // Iterate over server state to update and add new objects
        for (const key in serverState) {
            if (serverState.hasOwnProperty(key)) {
                const obj = serverState[key];
                const type = obj.Type;
                const cls: any = this.getTypeRegistry().getTypeClass(type);
                if (cls) {
                    
                    if (this.gameObjects.has(obj.id)) {
                        console.log("updating from request");

                        this.gameObjects.get(obj.id)?.updateFromRequest(obj);
                    } else {
                        const gameObject = cls.fromSerialized(obj);
                        this.addObject(gameObject);
                    }
                    serverIds.add(obj.id);
                }
            }
        }

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

    ServerMstart(){
        this.Serverstart();
    }

    start(p:p5){
    }

    Serverstart(){
            
    }

    Mupdate(p:p5,dt:number){
        for(var ob of this.gameObjects.values()){
            ob.Mupdate(p,dt);
            if (ob.shouldBeDestroyed()){
                this.removeObject(ob);
            }
        }
        this.update(p,dt);
    }

    ServerMupdate(dt:number){
        
        for(var ob of this.gameObjects.values()){
            ob.ServerMupdate(dt);
            if (ob.shouldBeDestroyed()){
                this.removeObject(ob);
            }
        }
        this.ServerUpdate(dt);
    }

    update(p:p5,dt:number){
    }

    ServerUpdate(dt:number){
    
    }

    Mdraw(p:p5,camera: Camera){
        p.noStroke();
        this.gameObjects.forEach(obj => obj.Mdraw(p,camera));
        this.draw(p,camera);
    }

    draw(p:p5,camera: Camera){
    
    }

    getnewLocalObjectId(): number {
        return this.LocalObjectIdCounter--;
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

    ServerMend(){
        for(var ob of this.gameObjects.values()){
            ob.Mend();
        }
        this.end()
    }

    end(){

    }

    ServerEnd(){
    }

}