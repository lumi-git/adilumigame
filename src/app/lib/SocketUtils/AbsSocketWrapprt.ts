import { gameRequest } from "../GameEngine/gameRequest";
import { messageSubscriber } from "../GameEngine/messageSubscriber";

class AbsSocketWrapper {

    protected subscribers:messageSubscriber[] = [];


    static getInstance() {
    }

    
    addSubscriber(subscriber:messageSubscriber){
        this.subscribers.push(subscriber);
    }

    removeSubscriber(subscriber:messageSubscriber){
        this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
    }

    send(req:gameRequest){
    }

}

export default AbsSocketWrapper;