const { Board, Sensor } = require('johnny-five');
const board = new Board();

const flowOne = () => {
  const flowPin = 2;
  let amount = 0;
  let count = 0;
  let startFetching = false;

  console.log('Flow sensor is running');

  board.on('ready', () => {
    // Initialize digital input with debounce and logging
    const flowSensor = new Sensor.Digital(flowPin);

    // Flow interrupt handler with logging
    flowSensor.on('change', (value) => {
      if (value) {
        count++;
        console.log(`Flow detected: ${count}`);
        setTimeout(() => {
          startFetching = true;
        }, 40000);
      }
    });

    setInterval(() => {
      const currentTime = Date.now();
      amount = ((count / 320) * 1000).toFixed(2);
      console.log(`Flow rate: ${amount} ml`);

      // Check if pouring has stopped for 10 seconds
      if (amount > 0 && startFetching === true) {
        const requestBody = JSON.stringify({
          currentTapNumber: 1,
          servedAmount: amount,
        });

        fetch('http://localhost:3000/served', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: requestBody,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            console.log('Server response:', data);
            count = 0;
            console.log('Count reset');
            startFetching = false;
          })
          .catch((error) => {
            console.error(
              'There was a problem with the fetch operation:',
              error
            );
          });

        // Reset count
      }
    }, 1000); // Check every second for pouring stoppage
  });
};

flowOne();
