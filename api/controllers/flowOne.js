const JohnnyFive = require('johnny-five');
const board = new JohnnyFive.Board();
const sensorController = require('../controllers/sensorController');

const flowOne = () => {
  const flowPin = 2;

  let flowRate = 0;
  let count = 0;

  console.log('Flow sensor is running');

  board.on('ready', () => {
    // Initialize digital input with debounce and logging
    const flowSensor = new JohnnyFive.Pin(flowPin, {
      type: 'digital',
      mode: 'in',
      debounce: 10,
      pinChange: () => {
        console.log('Pin change detected');
      },
    });

    // Flow interrupt handler with logging
    flowSensor.on('change', (value) => {
      if (value) {
        count++;
        console.log(`Interrupt triggered, count: ${count}`);
      }
    });

    // Loop every second with logging
    setInterval(() => {
      flowRate = count * 2.25;
      console.log(`Flow rate: ${flowRate}`);

      // Call sensor controller with data and logging
      sensorController(1, flowRate)
        .then((res) => {
          console.log(`sensorController response: ${res}`);
        })
        .catch((err) => {
          console.error('Error with sensor controller:', err);
        });

      // Reset count for next interval and logging
      count = 0;
      console.log('Count reset');
    }, 1000);
  });
};

module.exports = flowOne;
