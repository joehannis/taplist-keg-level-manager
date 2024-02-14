const getAuth = require('../models/getAuth');

const sensorController = async (currentTapNumber, servedAmount) => {
  console.log('sensorController called');
  try {
    const parsedServedAmount = parseInt(servedAmount);
    const details = await getAuth();
    const auth_token = details.rows[0].auth_token;
    const venue = details.rows[0].venue;
    const response = await fetch(
      `https://api.taplist.io/api/v1/venues/${venue}/taps/${currentTapNumber}/current-keg`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Token ${auth_token}`,
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          add_served_volume_ml: parsedServedAmount,
        }),
      }
    );
    const data = await response.json();
    console.log('keg volume updated from Flow Sensor');
    res.status(200).json(data);
  } catch (err) {
    console.error('Error occurred while updating tap volume from sensor:', err);
    res.status(500).json({
      error: `An error occurred while updatng tap volume from sensor: ${err.message}`,
    });
  }
};

module.exports = sensorController;
