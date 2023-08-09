const getTaps = require("../models/getTaps");

const tapsController = async (req, res) => {
  const venue = req.body.venue;
  const authToken = req.body.auth_token;

  try {
    const data = await getTaps(venue, authToken);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = tapsController;
