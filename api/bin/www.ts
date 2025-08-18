import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import type { Socket } from 'socket.io';
import type { ServerToClientEvents } from '@taplist-keg-level-manager/shared';

import tapsRoute from '../routes/tapsRoute.ts';
import servedRoute from '../routes/servedRoute.ts';
import resetRoute from '../routes/resetRoute.ts';
import brewfatherRoute from '../routes/brewfatherRoute.ts';

const app = express();
app.use(cors());
app.use(express.json());

const server = createServer(app);

type TypedIO = Server<ServerToClientEvents>;
const io: TypedIO = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  },
});

io.on('connection', (socket: Socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.set('io', io);

app.use('/taps', tapsRoute);
app.use('/served', servedRoute);
app.use('/reset', resetRoute);
app.use('/brewfather', brewfatherRoute);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

export default app;
