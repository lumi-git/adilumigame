import ServerSocketWrapper from "../../SocketUtils/ServerSocketWrapper";
import { Game } from "../Game";
import { Scene } from "../Scene";
import { gameRequest } from "../gameRequest";

export class ServerGame extends Game{
    static instance:ServerGame;
    constructor() {
        super();
        this.getSender().setSocket(ServerSocketWrapper.getInstance());
    }

    static getInstance(){
        if(!ServerGame.instance){
            ServerGame.instance = new ServerGame();
            ServerGame.getInstance().setServerSide(true);
        }
        return ServerGame.instance;
    }
    
    runFrame(){
        this.ServerMupdate();
    }

    setScene(scene: Scene){
        this.scene = scene;
        this.scene.attachGame(this);
    }

    onRequest(req: gameRequest){

        if (req.Type == "SpawnObject"){
            console.log(req);
            var cls:any = this.scene.getTypeRegistry().getTypeClass(req.Metadata.objectData.Type)
            this.scene.addObject((cls)!.fromSerialized(req.Metadata.objectData));
        }else

        if (req.Type == "DestroyObject"){
            this.scene.removeObjectById(req.Metadata.objectData.id);
        }else

        if(req.Type == "FullState"){
            this.scene.UpdateState(req.Metadata.objectData);
        }else

        if (req.Type == "UpdateObject"){
            this.scene.updateObject(req.Metadata.objectData.id,req.Metadata.objectData);
        }

    }
}