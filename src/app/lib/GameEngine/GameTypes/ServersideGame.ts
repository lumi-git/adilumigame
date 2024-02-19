import { Game } from "../Game";

export class ServersideGame extends Game {
    static instance:ServersideGame;
    constructor() {
        super();
    }

    public static getInstance(){
        if(!ServersideGame.instance){
            ServersideGame.instance = new ServersideGame();
        }
        return ServersideGame.instance;
    }
}
