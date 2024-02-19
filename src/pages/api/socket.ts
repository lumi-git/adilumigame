import { Server } from 'socket.io';

const SocketHandler = (req:any, res:any) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('A client connected');
      socket.on('message', (data) => {
        // Broadcast the received point data to all clients except the sender
        socket.broadcast.emit('Gamerequest', data);
      });
    });
  }
  res.end();
};

export default SocketHandler;
