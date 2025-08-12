import express from 'express';
import type { BrewFather } from '@taplist-keg-level-manager/shared';

const brewfatherController = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const userId = process.env.BREWFATHER_ID;
    const apiKey = process.env.BREWFATHER_API;
    if (!userId || !apiKey) {
      throw new Error(
        'BREWFATHER_ID or BREWFATHER_API environment variable is not set'
      );
    }
    const credentials: string = Buffer.from(`${userId}:${apiKey}`).toString(
      'base64'
    );

    // Fetch data for batches with status "Brewing"
    const brewingResponse: Response = await fetch(
      'https://api.brewfather.app/v2/batches?status=Brewing',
      {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      }
    );

    if (!brewingResponse.ok) {
      console.warn('Network response was not ok (Brewing)');
      return res.status(500).json({
        error: 'An error occurred while fetching batches (Brewing)',
      });
    }

    const brewingData: any = await brewingResponse.json();

    const fermentingResponse: Response = await fetch(
      'https://api.brewfather.app/v2/batches?status=Fermenting',
      {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      }
    );

    if (!fermentingResponse.ok) {
      console.warn('Network response was not ok (Fermenting)');
      return res.status(500).json({
        error: 'An error occurred while fetching batches (Fermenting)',
      });
    }

    const fermentingData: any = await fermentingResponse.json();

    const conditioningResponse: Response = await fetch(
      'https://api.brewfather.app/v2/batches?status=Conditioning',
      {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      }
    );

    if (!conditioningResponse.ok) {
      console.warn('Network response was not ok (Conditioning)');
      return res.status(500).json({
        error: 'An error occurred while fetching batches (Conditioning)',
      });
    }

    const conditioningData: any = await conditioningResponse.json();

    const allBatches: BrewFather[] = [
      ...brewingData,
      ...fermentingData,
      ...conditioningData,
    ];

    console.log('Fetched batches:', allBatches);

    res.status(200).json(allBatches);
  } catch (err) {
    console.error('Error occurred while fetching batches:', err);
    res.status(500).json({
      error: 'An error occurred while fetching batches',
      err,
    });
  }
};

export default brewfatherController;
