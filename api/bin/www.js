const express = require('express');
const tapsRoute = require('../routes/tapsRoute');
const servedRoute = require('../routes/servedRoute');
const resetRoute = require('../routes/resetRoute');
const brewfatherRoute = require('../routes/brewfatherRoute');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config({ path: '../.env' });

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app).listen(4000);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    /* istanbul ignore next */
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

module.exports = app;
