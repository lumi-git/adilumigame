import AbsSocketWrapper from "../SocketUtils/AbsSocketWrapprt";
import ServerSocketWrapper from "../SocketUtils/ServerSocketWrapper";
import  socketWrapper  from "../SocketUtils/socketWrapper"
import type { gameRequest } from "./gameRequest";


export class RequestSender {
    socket: AbsSocketWrapper;

    setSocket(socket: AbsSocketWrapper) {
        this.socket = socket;
    }

    sendRequest(req: gameRequest) {
        this.socket.send(req);
    }


}