import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import type { ServerToClientEvents } from '@taplist-keg-level-manager/shared';

interface UseSocketConnectionOptions {
  onServed: () => void;
  serverUrl?: string;
}

const useSocketConnection = ({
  onServed,
  serverUrl = 'http://localhost:3000',
}: UseSocketConnectionOptions) => {
  const socketRef = useRef<Socket<ServerToClientEvents> | null>(null);

  useEffect(() => {
    const socket: Socket<ServerToClientEvents> = io(serverUrl, {
      autoConnect: true,
    });

    socketRef.current = socket;

    // Attach event listeners
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    socket.on('served', onServed);

    // Clean up on unmount
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('served');
      socket.disconnect();
      socketRef.current = null;
    };
  }, [onServed, serverUrl]);

  return socketRef.current;
};

export default useSocketConnection;
