const { Board, Sensor } = require('johnny-five');
const board = new Board();

const flow = () => {
  let amount = 0;
  let countOne = 0;
  let countTwo = 0;

  board.on('ready', () => {
    const flowSensorOne = new Sensor.Digital(2);
    flowSensorOne.on('change', (value) => {
      if (value) {
        countOne++;
        setTimeout(() => {
          startTaplistUpdate(1);
        }, 20000);
      }
    });

    // const flowSensorTwo = new Sensor.Digital(3);
    // flowSensorTwo.on('change', (value) => {
    //   if (value) {
    //     countTwo++;
    //     setTimeout(() => {
    //       startTaplistUpdate(2);
    //     }, 20000);
    //   }
    // });

    const startTaplistUpdate = (tap) => {
      setInterval(() => {
        let count;
        if (tap === 1) {
          count = countOne;
        } else if (tap === 2) {
          count = countTwo;
        }
        amount = ((count / 320) * 1000).toFixed(2);
        console.log(`Dispensed Volume: ${amount} ml from tap ${tap}`);

        // Check if pouring has stopped for 10 seconds
        if (amount > 0) {
          const requestBody = JSON.stringify({
            currentTapNumber: tap,
            servedAmount: amount,
            flow: true,
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
        }
      }, 1000); // Check every second for pouring stoppage
    };
  });
};

flow();

