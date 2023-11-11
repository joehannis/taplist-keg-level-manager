const createAuth = require('../models/auth');
const getAuth = require('../models/getAuth');

const authController = {
  createAuth: async (req, res) => {
    try {
      const { venue, auth_token } = req.body; // Extract venue and auth_token from the request

      const newAuth = await createAuth(venue, auth_token);
      console.log('this is from authController');

      res.json({
        message: 'Authorization saved successfully.',
        AuthId: newAuth.id,
      });
    } catch (err) {
      console.error('Error occurred while saving authorization:', err);
      res.status(500).json({
        error: `An error occurred while saving authorisation: ${err.message}`,
      });
    }
  },
  getAuth: async (req, res) => {
    try {
      const response = await getAuth();
      console.log('this is from authController');
      console.log(response);
      res.status(200).json({
        message: response,
      });
    } catch (err) {
      console.error('Error occurred while getting authorization:', err);
      res.status(500).json({
        error: `An error occurred while getting authorization: ${err.message}`,
      });
    }
  },
};

module.exports = authController;
