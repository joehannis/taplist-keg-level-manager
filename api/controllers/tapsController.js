const getAuth = require('../models/getAuth');

const tapsController = async (req, res) => {
  try {
    const details = await getAuth();
    const auth_token = details.rows[0].auth_token;
    const venue = details.rows[0].venue;
    const response = await fetch(
      `https://api.taplist.io/api/v1/venues/${venue}/taps`,
      {
        headers: { Authorization: `Token ${auth_token}` },
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error occurred while fetching taps:', err);
    res.status(500).json({
      error: `An error occurred while fetching taps: ${err.message}`,
    });
  }
};

module.exports = tapsController;
