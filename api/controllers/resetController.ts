import express from 'express';
import type { Served } from '@taplist-keg-level-manager/shared';
import { z } from 'zod';
import { servedSchema } from '../bin/zod-types';

const resetController = async (req: express.Request, res: express.Response) => {
  if (!req.body.currentTapNumber && req.body.AUTH_TOKEN) {
    return res.status(400).json({
      error: 'currentTapNumber is required',
    });
  }

  if (req.body.currentTapNumber <= 0) {
    return res.status(400).json({
      error: 'currentTapNumber must be a positive number',
    });
  }
  if (!process.env.VENUE && !process.env.AUTH_TOKEN) {
    return res.status(500).json({
      error: 'Environment variables VENUE and AUTH_TOKEN are required',
    });
  }
  try {
    const currentTapNumber: number = req.body.currentTapNumber;
    const response: Response = await fetch(
      `https://api.taplist.io/api/v1/venues/${process.env.VENUE}/taps/${currentTapNumber}/current-keg`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Token ${process.env.AUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          served_volume_ml: 0,
        }),
      }
    );
    const data: z.infer<typeof servedSchema> = await response.json();
    const result = servedSchema.safeParse(data);
    if (!result.success) {
      console.error('Taplist validation error:', result.error);
      return res.status(502).json({ error: 'Invalid data from Taplist API' });
    } else {
      const reset: Served | undefined = {
        beerName: data.beverage.name,
        currentTapNumber: data.current_tap_number,
        glasswareIllustrationUrl:
          data.beverage.glassware_illustration_url || undefined,
        abv: data.beverage.abv_percent,
        style: data.beverage.style?.style ?? null,
        beverageType: data.beverage.beverage_type ?? '',
        remainingVolumeMl: data.remaining_volume_ml,
        kegPercentFull: data.percent_full,
      };
      console.log('keg volume reset');
      res.status(200).json(reset);
    }
  } catch (err) {
    console.error('Error occurred while resetting tap volume:', err);
    res.status(500).json({
      error: `An error occurred while resetting tap volume, error: ${err}`,
    });
  }
};

export default resetController;
