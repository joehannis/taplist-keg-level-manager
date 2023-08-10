const Auth = require("../models/auth");

const authController = async (req, res) => {
  try {
    const { venue, auth_token } = req.body;

    const newAuth = new Auth({
      venue,
      auth_token,
    });

    await newAuth.save();

    res.status(200).json({
      message: "Authorisation saved successfully.",
      AuthId: newAuth._id,
    });
  } catch (err) {
    console.error("Error occurred while saving authorisation:", err);
    res.status(500).json({
      error: `An error occurred while saving authorisation: ${err.message}`,
    });
  }
};

module.exports = authController;
