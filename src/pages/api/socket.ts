import { Vector2 } from '@/app/lib/Vector2';
import { building } from '@/app/lib/building';
import { clientState } from '@/app/lib/clientState';
import { house } from '@/app/lib/house';
import { restaurant } from '@/app/lib/restaurant';
import { Road } from '@/app/lib/Road';
import { Server } from 'socket.io';
import { driver } from '@/app/lib/driver';
import { intersection } from '@/app/lib/intersection';

const SocketHandler = (req:any, res:any) => {

  function sendState(io:Server){
    io.emit('Gamerequest', getState());
  }


  function getState():any{

    return {
      builds: builds,
      roads: roads,
      drivers:drivers,
      clientStates: ClientStatesJson()
    }

  }

  function ClientStatesJson(){
    var res = [];
    for (var [key, value] of clientStates.entries()) {
      res.push(value.toJSON());
    }
    return res;
  }

  var clientStates:Map<string, clientState> = new Map<string, clientState>();
  var builds: Array<building> = [];
  var roads: Array<Road> = [];
  var drivers: Array<driver> = [];


  if (res.socket.server.io) {
      return;
  } else {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    var nbHouses = 10;
    var nbRestaurants = 10;
    var nbIntersections = 5;
    var nbbuilds = nbHouses + nbRestaurants + nbIntersections;

    var id = 0;

    for (var i = 0; i < nbRestaurants; i++, id++){
      builds.push(new restaurant(id.toString(), "restaurant " + i.toString(), new Vector2(i*10,Math.random()*500)));
    }
    for (var i = 0; i < nbHouses; i++, id++){
      builds.push(new house(id.toString(), "house " + i.toString(), new Vector2(i*10,Math.random()*500)));
    }
    for (var i = 0; i < nbIntersections; i++, id++){
      builds.push(new intersection(id.toString(), new Vector2(Math.random()*500,Math.random()*500)));
    }

    for (var i = 0; i < nbbuilds-1; i++){
      var start = builds[i].id;
      var end = builds[i+1].id;
      var r = new Road(start,end);
      roads.push(r);
    }
  
    io.on('connection', (socket) => {
      drivers.push(new driver(socket.id + "-1", new Vector2(Math.random()*200,Math.random()*200)));
      sendState(io);
      clientStates.set(socket.id,new clientState(socket.id));
      socket.on('message', (data) => {
        
        var clientState = clientStates.get(socket.id);
        clientState.updateFromJSON(data);
        sendState(io);
        console.log('clientStates', clientStates);
      });
      socket.on('disconnect', function() {
        clientStates.delete(socket.id);
        drivers = drivers.filter((d) => d.id != socket.id + "-1");
        sendState(io);
        });

    });



  }
  res.end();
};

export default SocketHandler;
