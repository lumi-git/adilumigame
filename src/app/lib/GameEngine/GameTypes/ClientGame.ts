import p5 from "p5";
import { Game } from "../Game";
import socketWrapper from "../../SocketUtils/socketWrapper";
import { gameRequest } from "../gameRequest";

export class ClientGame extends Game{
    static instance:ClientGame;
    constructor() {
        super();
        this.getSender().setSocket(socketWrapper.getInstance());
    }

    static getInstance(){
        if(!ClientGame.instance){
            ClientGame.instance = new ClientGame();
        }
        return ClientGame.instance;
    }

    runFrame(p:p5){
        this.Mupdate(p);
        this.draw(p);
    }

    onRequest(req: gameRequest){

        if (req.Type == "SpawnObject"){
            console.log(req);
            var cls:any = this.scene.getTypeRegistry().getTypeClass(req.Metadata.objectData.Type)
            this.scene.addObject((cls)!.fromSerialized(req.Metadata.objectData));
            this.getSender().sendRequest(req);
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