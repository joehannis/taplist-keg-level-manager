const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const brewfatherController = async (req, res) => {
  try {
    const userId = process.env.BREWFATHER_ID;
    const apiKey = process.env.BREWFATHER_API;
    const credentials = Buffer.from(`${userId}:${apiKey}`).toString('base64');

    // Fetch data for batches with status "Brewing"
    const brewingResponse = await fetch(
      'https://api.brewfather.app/v2/batches?status=Brewing',
      {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      }
    );

    // Handle network errors
    if (!brewingResponse.ok) {
      throw new Error('Network response was not ok (Brewing)');
    }

    // Parse JSON data from "Brewing" response
    const brewingData = await brewingResponse.json();

    // Fetch data for batches with status "Fermenting"
    const fermentingResponse = await fetch(
      'https://api.brewfather.app/v2/batches?status=Fermenting',
      {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      }
    );

    // Handle network errors
    if (!fermentingResponse.ok) {
      throw new Error('Network response was not ok (Fermenting)');
    }

    // Parse JSON data from "Fermenting" response
    const fermentingData = await fermentingResponse.json();

    // Fetch data for batches with status "Conditioning"
    const conditioningResponse = await fetch(
      'https://api.brewfather.app/v2/batches?status=Conditioning',
      {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      }
    );

    // Handle network errors
    if (!conditioningResponse.ok) {
      throw new Error('Network response was not ok (Conditioning)');
    }

    // Parse JSON data from "Conditioning" response
    const conditioningData = await conditioningResponse.json();

    // Combine or process the fetched data as needed
    // This section depends on your desired output format
    const allBatches = [...brewingData, ...fermentingData, ...conditioningData];

    res.status(200).json(allBatches);
  } catch (err) {
    console.error('Error occurred while fetching batches:', err);
    res.status(500).json({
      error: 'An error occurred while fetching batches',
    });
  }
};

module.exports = brewfatherController;
