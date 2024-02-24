import { Server } from 'socket.io';

const SocketHandler = (req:any, res:any) => {
  if (res.socket.server.io) {
      return;
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    io.on('connection', (socket) => {
      socket.on('message', (data) => {
        io.emit('message', data);
      });
    });
  }
  res.end();
};

export default SocketHandler;
