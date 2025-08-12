import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import type { ServerToClientEvents } from '@taplist-keg-level-manager/shared';

const useSocketConnection = (onServed: () => void) => {
  useEffect(() => {
    const socket: Socket<ServerToClientEvents> = io('http://localhost:4000');
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('served', onServed);

    return () => {
      socket.disconnect();
    };
  }, [onServed]);
};

export default useSocketConnection;
