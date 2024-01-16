import { Gpio } from 'onoff';
const sensorController = require('./sensorController');

const flowPin = new Gpio(2, 'in', 'rising', { debounceTimeout: 10 });
let flowRate = 0;
let count = 0;

const setup = () => {
  flowPin.watch(flowInterrupt);
};

const loop = async () => {
  count = 0;
  setTimeout(() => {
    flowRate = count * 2.25;
    console.log(flowRate);
  }, 1000);
  const res = await sensorController(1, flowRate);
  console.log(res);
};

const flowInterrupt = (err, value) => {
  if (err) {
    throw err;
  }
  count++;
};

// Run the setup and loop functions
setup();
setInterval(loop, 1000);
