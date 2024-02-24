import { AbstractGame } from "./AbstractGame";

export class ServersideGame extends AbstractGame {
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
