const { SerialPort } = require('serialport');
const flowOne = require('./flowOne');
// const flowTwo = require('./flowTwo');

const retryAfterDelay = (delay) => {
  setTimeout(() => {
    checkArduinoAndStart();
  }, delay);
};

const checkArduinoAndStart = () => {
  SerialPort.list()
    .then((ports) => {
      let arduinoConnected = ports.some((port) => {
        return port.vendorId === '2341' && port.productId === '0043';
      });
      if (arduinoConnected) {
        console.log('Arduino connected. Starting flow sensors.');
        flowOne();
        flowTwo();
      } else {
        console.log('Arduino not connected. Retrying in 1 minute.');
        retryAfterDelay(60000);
      }
    })
    .catch((err) => {
      console.error('Error occurred while listing serial ports:', err);
      retryAfterDelay(60000);
    });
};

checkArduinoAndStart();
