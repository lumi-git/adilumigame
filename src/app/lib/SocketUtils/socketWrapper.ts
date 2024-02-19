import { Socket, io } from "socket.io-client";

class socketWrapper {
    static instance:socketWrapper;
    socket:Socket;
    constructor() {
        this.socket = io();
    }

    static getInstance() {
        if (socketWrapper.instance === undefined) {
            socketWrapper.instance = new socketWrapper();
        }
        return socketWrapper.instance;
    }

    initSocket(){
        fetch('/api/socket')
        this.socket.on('connect', () => {
        });
    }

    send(req:any){
        this.socket.emit('message', req);
    }

}

export default socketWrapper;