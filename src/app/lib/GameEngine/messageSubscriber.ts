import { gameRequest } from "./gameRequest";

export class messageSubscriber {
    protected RemoteRequestQueue: gameRequest[] = [];
    onMessage(req: gameRequest): void {
        this.RemoteRequestQueue.push(req);
    }

    handleRemoteRequests(){
        for (var req of this.RemoteRequestQueue){
            this.onRequest(req);
        }
        this.RemoteRequestQueue = [];
    }

    onRequest(req: gameRequest): void {
    }
}
