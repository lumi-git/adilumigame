import { Scene } from "../Scene";
import { gameRequest } from "../gameRequest";
import { messageSubscriber } from "../messageSubscriber";

export abstract class AbstractGame extends messageSubscriber{
    protected scene: Scene;
    constructor(){
        super();
    }

    onRequest(req: gameRequest){

        if (req.Type == "SpawnObject"){
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