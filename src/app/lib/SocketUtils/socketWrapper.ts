import { Socket, io } from "socket.io-client";

class socketWrapper {
    static instance:socketWrapper;
    socket:Socket;
    gameRequestCallback:Function;
    constructor() {
        this.socket = io();
    }

    static getInstance() {
        if (socketWrapper.instance === undefined) {
            socketWrapper.instance = new socketWrapper();
        }
        return socketWrapper.instance;
    }

    setgameRequestCallback(callback:Function){
        this.gameRequestCallback = callback;
    }


    getID(){
        return this.socket.id;
    }

    initSocket(){
        fetch('/api/socket')
        this.socket.on('connect', () => {
        });

        this.socket.on('Gamerequest', (data:any) => {
            this.gameRequestCallback(data);
        });
    }

    send(req:any){
        this.socket.emit('message', req);
    }

}

export default socketWrapper;