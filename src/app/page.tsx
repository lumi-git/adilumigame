'use client';
import React, { useEffect } from 'react';
import type p5 from 'p5';
import { Game } from './lib/GameEngine/Game';
import socketWrapper from './lib/SocketUtils/socketWrapper';
import { mainScene } from './lib/ImplementedGame/mainScene';

let sketch: p5;
const Sketch = () => {
  useEffect(() => {

    socketWrapper.getInstance().initSocket();

    import('p5').then((p5Module) => {

      Game.getInstance().setScene(new mainScene());

      sketch = new p5Module.default((p: p5) => {
        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight);
          p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
          };
          Game.getInstance().Mstart(p);
        };

        p.draw = () => {
          p.background('#101010');
          Game.getInstance().runFrame(p);
        };
      });

      // Cleanup on component unmount
      return () => {
        sketch.remove();
        Game.getInstance().end();
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
