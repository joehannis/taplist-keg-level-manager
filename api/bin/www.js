const express = require('express');
const tapsRoute = require('../routes/tapsRoute');
const authRoute = require('../routes/authRoute');
const servedRoute = require('../routes/servedRoute');
const resetRoute = require('../routes/resetRoute');
const cors = require('cors');

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());

app.use('/taps', tapsRoute);
app.use('/auth', authRoute);
app.use('/served', servedRoute);
app.use('/reset', resetRoute);

const port = 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
