const getAuth = require('../models/getAuth');
const app = require('../bin/www');
const WebSocket = require('ws');
const http = require('http');

// Create an HTTP server
const server = http.createServer(app);

// Create WebSocket server using the HTTP server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected');
});

const servedController = async (req, res) => {
  try {
    const { currentTapNumber, servedAmount } = req.body;
    const parsedServedAmount = parseInt(servedAmount);
    const details = await getAuth();
    const auth_token = details.rows[0].auth_token;
    const venue = details.rows[0].venue;
    const response = await fetch(
      `https://api.taplist.io/api/v1/venues/${venue}/taps/${currentTapNumber}/current-keg`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Token ${auth_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          add_served_volume_ml: parsedServedAmount,
        }),
      }
    );
    const data = await response.json();
    console.log('keg volume updated');
    res.status(200).json(data);

    // Broadcast updated tap data to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  } catch (err) {
    console.error('Error occurred while updating tap volume:', err);
    res.status(500).json({
      error: `An error occurred while updating tap volume: ${err.message}`,
    });
  }
};

module.exports = servedController;
