const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const resetController = async (req, res) => {
  if (!req.body.currentTapNumber && req.body.AUTH_TOKEN) {
    return res.status(400).json({
      error: 'currentTapNumber is required',
    });
  }

  if (req.body.currentTapNumber <= 0) {
    return res.status(400).json({
      error: 'currentTapNumber must be a positive number',
    });
  }
  if (!process.env.VENUE && !process.env.AUTH_TOKEN) {
    return res.status(500).json({
      error: 'Environment variables VENUE and AUTH_TOKEN are required',
    });
  }
  try {
    const { currentTapNumber } = req.body;
    const response = await fetch(
      `https://api.taplist.io/api/v1/venues/${process.env.VENUE}/taps/${currentTapNumber}/current-keg`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Token ${process.env.AUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          served_volume_ml: 0,
        }),
      }
    );
    const data = await response.json();
    console.log('keg volume reset');
    res.status(200).json(data);
  } catch (err) {
    console.error('Error occurred while resetting tap volume:', err);
    res.status(500).json({
      error: `An error occurred while resetting tap volume`,
    });
  }
};

module.exports = resetController;
