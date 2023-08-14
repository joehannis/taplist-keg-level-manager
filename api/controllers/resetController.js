const Auth = require("../models/auth");

const resetController = async (req, res) => {
  try {
    const { currentTapNumber } = req.body;
    const details = await Auth.find();
    const venue = details[0].venue;
    const auth_token = details[0].auth_token;
    const response = await fetch(
      `https://api.taplist.io/api/v1/venues/${venue}/taps/${currentTapNumber}/current-keg`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Token ${auth_token}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          served_volume_ml: 0,
        }),
      }
    );
    const data = await response.json();
    console.log("keg volume reset");
    res.status(200).json(data);
  } catch (err) {
    console.error("Error occurred while updating tap volume:", err);
    res.status(500).json({
      error: `An error occurred while updatng tap volume: ${err.message}`,
    });
  }
};

module.exports = resetController;
