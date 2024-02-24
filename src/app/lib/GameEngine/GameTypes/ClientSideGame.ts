import { AbstractGame } from "./AbstractGame";

export class ClientSideGame extends AbstractGame {
    static instance:ClientSideGame;
    constructor() {
        super();
    }

    public static getInstance(){
        if(!ClientSideGame.instance){
            ClientSideGame.instance = new ClientSideGame();
        }
        return ClientSideGame.instance;
    }
}
