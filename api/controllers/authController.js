const authController = {
  createAuth: async (req, res) => {
    try {
      const { venue, auth_token } = req.body; // Extract VENUE and AUTH_TOKEN from the request

      process.env.VENUE = venue;
      process.env.AUTH_TOKEN = auth_token;

      res.status(200).json({
        message: 'Authorization saved successfully.',
      });
    } catch (err) {
      console.error('Error occurred while saving authorization:', err);
      res.status(500).json({
        error: `An error occurred while saving authorisation: ${err.message}`,
      });
    }
  },

  deleteAuth: async (req, res) => {
    try {
      process.env.VENUE = null;
      process.env.AUTH_TOKEN = null;
      res.status(200).json({
        message: 'Authorization deleted successfully.',
      });
    } catch (err) {
      console.error('Error occurred while deleting authorization:', err);
      res.status(500).json({
        error: `An error occurred while deleting authorization`,
      });
    }
  },
};

module.exports = authController;
