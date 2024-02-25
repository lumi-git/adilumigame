import { Server as SocketIOServer } from "socket.io";
import { gameRequest } from "../GameEngine/gameRequest";
import { messageSubscriber } from "../GameEngine/messageSubscriber";
import AbsSocketWrapper from "./AbsSocketWrapprt";

class ServerSocketWrapper extends AbsSocketWrapper{
  private static instance: ServerSocketWrapper;
  private io: SocketIOServer | null = null;

  private constructor() {
    super();
  }

  public static getInstance(): ServerSocketWrapper {
    if (!ServerSocketWrapper.instance) {
        ServerSocketWrapper.instance = new ServerSocketWrapper();
    }
    return ServerSocketWrapper.instance;
  }

  public init(server: any): void {
    if (this.io) {
      console.log("Socket.io already initialized.");
      return;
    }

    console.log("Initializing Socket.io");
    this.io = new SocketIOServer(server);

    this.io.on("connection", (socket) => {
      console.log(`New connection: ${socket.id}`);

      socket.on("message", (data) => {
        const req:gameRequest = gameRequest.fromJSON(data);
        this.notifySubscribers(req);
      });
    });
  }

  public addSubscriber(subscriber: messageSubscriber): void {
    this.subscribers.push(subscriber);
  }

  private notifySubscribers(req: gameRequest): void {
    this.subscribers.forEach((subscriber) => {
      subscriber.onMessage(req);
    });
  }

  public handleRemoteRequests(): void {
    this.subscribers.forEach((subscriber) => {
      subscriber.handleRemoteRequests();
    });
  }
}

export default ServerSocketWrapper;
