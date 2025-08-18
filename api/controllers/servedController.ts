import express from 'express';
import { z } from 'zod';
import { servedSchema, servedRequestSchema } from '../zod/zod-types.ts';
import { validateSchema } from '../zod/validateSchema.ts';
import type { Server as IOServer } from 'socket.io';
import type {
  Served,
  ServerToClientEvents,
} from '@taplist-keg-level-manager/shared';
type ServedRequest = z.infer<typeof servedRequestSchema>;

const servedController = async (
  req: express.Request<{}, {}, ServedRequest>,
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
    const result = validateSchema(servedSchema, data);
    if (!result.success) {
      console.error(result.error);
      return res.status(502).json({ error: 'Invalid data from Taplist API' });
    }
    const validatedData = result.data;

    const served: Served | undefined = {
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
    const io: IOServer<ServerToClientEvents> | undefined = req.app.get('io');
    if (io) {
      if (flow) {
        io.emit('served');
        console.log('Served event emitted');
      }
    } else {
      console.error('Socket.io instance not found');
    }
    res.status(200).json(served);
  } catch (err) {
    console.error('Error occurred while updating tap volume:', err);
    res.status(500).json({
      error: `An error occurred while updating tap volume`,
    });
  }
};

export default servedController;
