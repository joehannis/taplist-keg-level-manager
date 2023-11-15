const getAuth = require('../models/getAuth');

const tapsController = async (req, res) => {
  try {
    const details = await getAuth();
    console.log('this is from tapsController');
    console.log(details.rows[0]);

    const auth_token = details.rows[0].auth_token;
    console.log('this is auth_token from tapsController');
    console.log(auth_token);
    const venue = details.rows[0].venue;
    const response = await fetch(
      `https://api.taplist.io/api/v1/venues/${venue}/taps`,
      {
        headers: { Authorization: `Token ${auth_token}` },
      }
    );
    const data = await response.json();
    console.log('this is data from tapsController');
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.error('Error occurred while fetching taps:', err);
    res.status(500).json({
      error: `An error occurred while fetching taps: ${err.message}`,
    });
  }
};

module.exports = tapsController;
