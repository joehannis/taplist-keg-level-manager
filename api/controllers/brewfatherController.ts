import express from 'express';
import { z } from 'zod';
import type { BrewFather } from '@taplist-keg-level-manager/shared';
import { brewfatherSchema } from '../bin/zod-types.ts';

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
      'https://api.brewfather.app/v2/batches?limit=50&order_by=status',
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

    const allBatches: BrewFather[] = brewingData.filter((batch: BrewFather) => {
      if (batch.status !== 'Completed') {
        return batch;
      }
    });

    console.log(allBatches);

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
