'use client';
import React, { useEffect } from 'react';
import type p5 from 'p5';
import socketWrapper from './lib/SocketUtils/socketWrapper';
import { mainScene } from './lib/ImplementedGame/mainScene';
import { ClientGame } from './lib/GameEngine/GameTypes/ClientGame';

let sketch: p5;
const Sketch = () => {
  useEffect(() => {

    socketWrapper.getInstance().initSocket();

    while (socketWrapper.getInstance().socket === null) {
    }

    import('p5').then((p5Module) => {

      ClientGame.getInstance().setScene(new mainScene());
      socketWrapper.getInstance().addSubscriber(ClientGame.getInstance());

      sketch = new p5Module.default((p: p5) => {
        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight);
          p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
          };
          ClientGame.getInstance().Mstart(p);
        };

        p.draw = () => {
          p.background('#101010');
          ClientGame.getInstance().runFrame(p);
        };
      });

      // Cleanup on component unmount
      return () => {
        sketch.remove();
        ClientGame.getInstance().end();
        socketWrapper.getInstance().socket.disconnect();
      };
    });
  }, []);

  return (
    <div className="App">
      <div id="canvas-container"></div>
    </div>
  );
};

export default Sketch;
