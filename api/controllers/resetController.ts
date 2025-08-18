import express from 'express';
import { z } from 'zod';
import type { Served } from '@taplist-keg-level-manager/shared';
import { validateSchema } from '../zod/validateSchema.ts';
import { servedSchema, resetRequestSchema } from '../zod/zod-types.ts';
type ResetRequest = z.infer<typeof resetRequestSchema>;

const resetController = async (
  req: express.Request<{}, {}, ResetRequest>,
  res: express.Response
) => {
  if (!req.body.currentTapNumber) {
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
    const data: unknown = await response.json();
    const result = validateSchema(servedSchema, data);
    if (!result.success) {
      console.error(result.error);
      return res.status(502).json({ error: 'Invalid data from Taplist API' });
    }
    const validatedData = result.data;

    const reset: Served | undefined = {
      beerName: validatedData.beverage.name,
      currentTapNumber: validatedData.current_tap_number,
      glasswareIllustrationUrl:
        validatedData.beverage.glassware_illustration_url || undefined,
      abv: validatedData.beverage.abv_percent,
      style: validatedData.beverage.style?.style ?? null,
      beverageType: validatedData.beverage.beverage_type ?? '',
      remainingVolumeMl: validatedData.remaining_volume_ml,
      kegPercentFull: validatedData.percent_full,
    };
    console.log('keg volume reset');
    res.status(200).json(reset);
  } catch (err) {
    console.error('Error occurred while resetting tap volume:', err);
    res.status(500).json({
      error: `An error occurred while resetting tap volume, error: ${err}`,
    });
  }
};

export default resetController;
