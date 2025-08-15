import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import tapsRoute from '../routes/tapsRoute.ts';
import servedRoute from '../routes/servedRoute.ts';
import resetRoute from '../routes/resetRoute.ts';
import brewfatherRoute from '../routes/brewfatherRoute.ts';
import { createServer } from 'http';
import { Server } from 'socket.io';
import type { Socket } from 'socket.io';
import type {
  ServerToClientEvents,
  ClientToServerEvents,
} from '@taplist-keg-level-manager/shared';

const app = express();
app.use(cors());
app.use(express.json());

type TypedIO = Server<ServerToClientEvents, ClientToServerEvents>;

const server = createServer(app).listen(4000);
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

app.use('/taps', tapsRoute);
app.use('/served', servedRoute);
app.use('/reset', resetRoute);
app.use('/brewfather', brewfatherRoute);

app.set('io', io);

const port = 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server started on port ${port}`);
});

export default app;
