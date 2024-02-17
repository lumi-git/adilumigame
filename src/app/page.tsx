'use client';
import { SetStateAction, useEffect, useState } from 'react'

import io from 'Socket.IO-client'
let socket:any;

const Home = () => {
  const [input, setInput] = useState('')

  useEffect( () => {
    fetch('/api/socket')
    async function socketInitializer(){
      socket = io()
      socket.on('connect', () => {
        console.log('connected')
      })
      socket.on('update-input', (msg: SetStateAction<string>) => {
        setInput(msg)
      })
      return () => {
        socket.close();
      };
    }
    socketInitializer();
  }, [])

  const onChangeHandler = (e:any) => {
    setInput(e.target.value)
    socket.emit('input-change', e.target.value)
  }

  return (
    <div>
      <h1>Hello</h1>
      <input className = "text-black"
            placeholder="Type something"
            value={input}
            onChange={onChangeHandler}
      />
    </div>
  )
}

export default Home;
