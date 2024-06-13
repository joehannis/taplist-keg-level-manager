const tapsController = async (req, res) => {
  console.log(process.env.AUTH_TOKEN)
  try {
    const response = await fetch(
      `https://api.taplist.io/api/v1/venues/${process.env.VENUE}/taps`,
      {
        headers: { Authorization: `Token ${process.env.AUTH_TOKEN}` },
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error occurred while fetching taps:', err);
    res.status(500).json({
      error: `An error occurred while fetching taps`,
    });
  }
};

module.exports = tapsController;
