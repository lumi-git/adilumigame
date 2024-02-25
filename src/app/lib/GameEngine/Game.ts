import { RequestSender } from './RequestSender';
import { messageSubscriber } from './messageSubscriber';
import type p5 from 'p5';
import { Camera } from './Camera';
import { SpatialHashmap } from './SpatialHashmap';
import { Vector2 } from './Vector2';
import { Scene } from './Scene';
import { defaultScene } from './defaultScene';
import { gameRequest } from './gameRequest';
import { gameRequestFactory } from './gameRequestFactory';

export class Game extends messageSubscriber{
    private serverSide: boolean = false;
    protected sender: RequestSender;
    protected camera: Camera;
    protected collisionSystem: SpatialHashmap;
    protected scene: Scene;


    protected mousePosition:Vector2 = new Vector2(0,0); 

    keys: any = {};

    constructor(){
        super();
        this.camera = new Camera();
        this.sender = new RequestSender();
        this.collisionSystem = new SpatialHashmap(100);
        this.scene = new defaultScene(); 
    }

    setServerSide (serverSide: boolean) {
        this.serverSide = serverSide;
    }

    setScene(scene: Scene){
        this.scene = scene;
        this.scene.setServerSide(this.serverSide);
        this.scene.attachGame(this);
    }

    getScene(){
        return this.scene;
    }

    getSender(): RequestSender {
        return this.sender;
    }

    onMessage(req: gameRequest): void {
        this.RemoteRequestQueue.push(req);
    }

    start(p:p5){
        this.sender.sendRequest(gameRequestFactory.getFullStateRequest());
    }

    Serverstart(){

    }

    Mstart(p:p5){
        this.start(p);
        this.scene.Mstart(p);
    }

    ServerMstart(){
        this.Serverstart();
        this.scene.ServerMstart();
    }

    private lastUpdateTime: number = Date.now(); 
    deltaTime = 0;
    Mupdate(p:p5){
        
        const now = Date.now();
        this.deltaTime = now - this.lastUpdateTime;
        this.lastUpdateTime = now; 
    
        this.handleRemoteRequests();
        this.mousePosition.setX(p.mouseX + this.camera.getTransform().getPosition().getX());
        this.mousePosition.setY(p.mouseY + this.camera.getTransform().getPosition().getY());
        
        this.collisionSystem.getHashMap().clear();
        this.scene.Mupdate(p, this.deltaTime );
        this.collisionSystem.update();
    }

    ServerMupdate(){
        const now = Date.now();
        this.deltaTime = now - this.lastUpdateTime;
        this.lastUpdateTime = now; 
    
        this.handleRemoteRequests();
        
        this.collisionSystem.getHashMap().clear();
        //this.scene.ServerMupdate(this.deltaTime);
        this.collisionSystem.update();
    }
    



    getMousePosition():Vector2{
        return this.mousePosition;
    }

    getCollisionSystem(): SpatialHashmap {
        return this.collisionSystem;
    }

    getCamera(): Camera {
        return this.camera;
    }

    draw(p:p5) {
        this.scene.Mdraw(p,this.camera);
        //this.collisionSystem.draw(p);
        p.textSize(32);
        p.fill("black");
        p.text("FPS: " + Math.round(1000/this.deltaTime), 500, 30);
    }

    getnewLocalObjectId(): number {
        return this.scene.getnewLocalObjectId();
    }

    end(){
        this.scene.Mend();
    }

}