import ServerSocketWrapper from '@/app/lib/SocketUtils/ServerSocketWrapper';
import { ServerGame } from '@/app/lib/GameEngine/GameTypes/ServerGame';
import { mainScene } from '@/app/lib/ImplementedGame/mainScene';
const SocketHandler = (req: any, res: any) => {
  if (!res.socket.server.io) {
    console.log('Socket is initializing');
    ServerSocketWrapper.getInstance().init(res.socket.server);


    //game setup, maybe move later
    ServerSocketWrapper.getInstance().addSubscriber(ServerGame.getInstance());
    ServerGame.getInstance().setScene(new mainScene());

    setInterval(() => {
      ServerGame.getInstance().runFrame();
      console.log(ServerGame.getInstance().getScene().gameObjects.size);
      console.log('frame');
    }, 1000);
  }
  res.end();
};

export default SocketHandler;
