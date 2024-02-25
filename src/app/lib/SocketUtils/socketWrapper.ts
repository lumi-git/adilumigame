import { Socket, io } from "socket.io-client";
import { gameRequest } from "../GameEngine/gameRequest";
import { messageSubscriber } from "../GameEngine/messageSubscriber";
import AbsSocketWrapper from "./AbsSocketWrapprt";

class socketWrapper extends AbsSocketWrapper {


    static instance:socketWrapper;
    socket:Socket;
    constructor() {
        super();
        this.socket = io();
    }

    static getInstance() {
        if (socketWrapper.instance === undefined) {
            socketWrapper.instance = new socketWrapper();
        }
        return socketWrapper.instance;
    }

    
    addSubscriber(subscriber:messageSubscriber){
        this.subscribers.push(subscriber);
    }

    removeSubscriber(subscriber:messageSubscriber){
        this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
    }

    getID(){
        return this.socket.id;
    }

    initSocket(){
        console.log('init socket');
        fetch('/api/socket')
        
        this.socket.on('connect', () => {
        });

        this.socket.on('message',(data) => {
            for (var subscriber of this.subscribers){
                subscriber.onMessage(data);
            }
        });

    }

    send(req:gameRequest){
        req.ClientID = this.getID();
        this.socket.emit('message', req);
    }

}

export default socketWrapper;