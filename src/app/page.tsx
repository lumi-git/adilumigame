'use client';
import React, { useEffect } from 'react';
import type p5 from 'p5';

import socketWrapper from './lib/SocketUtils/socketWrapper';
import { Vector2 } from './lib/Vector2';
import { restaurant } from './lib/restaurant';
import { house } from './lib/house';
import { Road } from './lib/Road';
import { building } from './lib/building';
import { driver } from './lib/driver';
import { Selectable } from './lib/selectable';


let sketch: p5;
const Sketch = () => {
  useEffect(() => {

    var driverID:string = "-1";
    var endid:string = "-1";

    socketWrapper.getInstance().initSocket();

    socketWrapper.getInstance().setgameRequestCallback((data:any) => {
      builds = new Map<string, building>();
      roads = [];
      drivers = [];
      console.log(data);
      for (var iterbuilds of data.builds){
        if (iterbuilds.type == "house"){
          var h = new house(iterbuilds.id, iterbuilds.name, new Vector2(iterbuilds.location.x,iterbuilds.location.y));
          builds.set(iterbuilds.id,h);
        }
        if (iterbuilds.type == "restaurant"){
          var rest = new restaurant(iterbuilds.id, iterbuilds.name, new Vector2(iterbuilds.location.x,iterbuilds.location.y));
          builds.set(iterbuilds.id,rest);
        }
      }

      for (var iterDrivers of data.drivers){
        console.log(iterDrivers);
        var d = new driver(iterDrivers.id, new Vector2(iterDrivers.location.x,iterDrivers.location.y));
        drivers.push(d);
      }


      for (var iterRoad of data.roads){
        var road = new Road(iterRoad.startid,iterRoad.endid);
        roads.push(road);
      }

    });

    window.addEventListener('contextmenu', (event) => {
      event.preventDefault(); // Prevent the default context menu
      endid = "-1";
      driverID = "-1";
  });


    var builds: Map<string,building> = new Map<string, building>();
    var roads: Array<Road> = [];
    var drivers: Array<driver> = [];



    var selected:Selectable = null;



    import('p5').then((p5Module) => {

      sketch = new p5Module.default((p: p5) => {
        p.setup = () => {

          p.mouseClicked = (event: MouseEvent) => {
            if(selected != null){
              if (selected.type == "driver")
              driverID = selected.id;
              else if (selected instanceof building)
                endid = selected.id;
              if (driverID != "-1" && endid != "-1"){
                socketWrapper.getInstance().send({clientID: socketWrapper.getInstance().getID() , driverID:driverID,end:endid});
              }
            }
          }

          var canvas = p.createCanvas(p.windowWidth, p.windowHeight);
          canvas.parent('canvas-container');
          
          p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
          };

        };


        p.draw = () => {
          p.background('#101010');
          p.fill(255);
          selected = null;
          for (var b of builds.values()){
            b.update(p);
            if (b.hoovered){
              p.text(b.name, p.mouseX, p.mouseY);
              selected = b;
            }
          }
          for(var road of roads){
            p.stroke(255);
            var startbuild = builds.get(road.startid).location;
            var endbuild = builds.get(road.endid).location;
            p.line(startbuild.getX(),startbuild.getY(),endbuild.getX(),endbuild.getY());
          }

          for (var d of drivers){
            d.update(p);
            if (d.hoovered){
              selected = d;
            }
          }

        };
      });

      // Cleanup on component unmount
      return () => {
        
        sketch.remove();
        socketWrapper.getInstance().socket.disconnect();
      };
    });
  }, []);

  return (
    <div className="App">
      <div id="canvas-container" ></div>
    </div>
  );
};

export default Sketch;
