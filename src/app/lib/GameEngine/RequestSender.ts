import  socketWrapper  from "../SocketUtils/socketWrapper"
import type { gameRequest } from "./gameRequest";


export class RequestSender {
    socket: socketWrapper;
    constructor() {
        this.socket = socketWrapper.getInstance();
    }

    sendRequest(req: gameRequest) {
        this.socket.send(req);
    }


}