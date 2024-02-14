const express = require('express');
const tapsRoute = require('../routes/tapsRoute');
const authRoute = require('../routes/authRoute');
const servedRoute = require('../routes/servedRoute');
const resetRoute = require('../routes/resetRoute');
const flowOne = require('../controllers/flowOne');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
flowOne();

app.use('/taps', tapsRoute);
app.use('/auth', authRoute);
app.use('/served', servedRoute);
app.use('/reset', resetRoute);

const port = 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
