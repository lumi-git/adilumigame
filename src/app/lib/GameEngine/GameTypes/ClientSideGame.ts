import { Game } from "../Game";

export class ClientSideGame extends Game {
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
