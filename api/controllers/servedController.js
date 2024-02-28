const servedController = async (req, res) => {
  try {
    const { currentTapNumber, servedAmount } = req.body;
    const parsedServedAmount = parseInt(servedAmount);
    const response = await fetch(
      `https://api.taplist.io/api/v1/venues/${process.env.VENUE}/taps/${currentTapNumber}/current-keg`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Token ${process.env.AUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          add_served_volume_ml: parsedServedAmount,
        }),
      }
    );
    const data = await response.json();
    console.log('keg volume updated');

    const io = req.app.get('io');
    if (io) {
      if (req.body.flow) {
        io.emit('served', { data: 'Served route called' });
        console.log('Served event emitted');
      }
    } else {
      console.error('Socket.io instance not found');
    }
    res.status(200).json(data);
  } catch (err) {
    console.error('Error occurred while updating tap volume:', err);
    res.status(500).json({
      error: `An error occurred while updating tap volume`,
    });
  }
};

module.exports = servedController;
