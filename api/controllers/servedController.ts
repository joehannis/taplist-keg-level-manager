import express from 'express';
import { servedSchema } from '../bin/zod-types.ts';
import type {
  Served,
  ServerToClientEvents,
} from '@taplist-keg-level-manager/shared';

const servedController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { currentTapNumber, servedAmount, flow } = req.body;

    if (currentTapNumber == null) {
      return res.status(400).json({ error: 'currentTapNumber is required' });
    }
    if (typeof currentTapNumber !== 'number' || currentTapNumber <= 0) {
      return res
        .status(400)
        .json({ error: 'currentTapNumber must be a positive number' });
    }
    if (typeof servedAmount !== 'number' || servedAmount <= 0) {
      return res
        .status(400)
        .json({ error: 'servedAmount must be a positive number' });
    }
    if (!process.env.VENUE || !process.env.AUTH_TOKEN) {
      return res
        .status(500)
        .json({ error: 'VENUE and AUTH_TOKEN env vars are required' });
    }

    const response: Response = await fetch(
      `https://api.taplist.io/api/v1/venues/${process.env.VENUE}/taps/${currentTapNumber}/current-keg`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Token ${process.env.AUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          add_served_volume_ml: servedAmount,
        }),
      }
    );
    const data: unknown = await response.json();
    console.log(data);
    const result = servedSchema.safeParse(data);
    if (!result.success) {
      console.error('Taplist validation error:', result.error);
      return res.status(502).json({ error: 'Invalid data from Taplist API' });
    } else {
      const served: Served = {
        beerName: result.data?.beverage.name,
        currentTapNumber: result.data?.current_tap_number,
        glasswareIllustrationUrl:
          result.data?.beverage.glassware_illustration_url || undefined,
        abv: result.data?.beverage.abv_percent,
        style: result.data?.beverage.style?.style || null,
        beverageType: result.data?.beverage.beverage_type ?? '',
        remainingVolumeMl: result.data?.remaining_volume_ml,
        kegPercentFull: result?.data?.percent_full,
      };
      console.log('keg volume updated');

      const io: ServerToClientEvents | undefined = req.app.get('io');
      if (io) {
        if (flow) {
          io.served('served', { data: 'Served route called' });
          console.log('Served event emitted');
        }
      } else {
        console.error('Socket.io instance not found');
      }
      res.status(200).json(served);
    }
  } catch (err) {
    console.error('Error occurred while updating tap volume:', err);
    res.status(500).json({
      error: `An error occurred while updating tap volume`,
    });
  }
};

export default servedController;
