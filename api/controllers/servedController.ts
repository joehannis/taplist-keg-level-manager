import express from 'express';
import type {
  Served,
  ServerToClientEvents,
} from '@taplist-keg-level-manager/shared';

const servedController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
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
    const currentTapNumber: number = req.body.currentTapNumber;
    const servedAmount: number = req.body.servedAmount;
    const flow: boolean | undefined = req.body.flow;
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
    const data: any = await response.json();
    const served: Served | undefined = {
      beerName: data.beverage.name,
      currentTapNumber: data.current_tap_number,
      glasswareIllustrationUrl: data.beverage.glassware_illustration_url,
      abv: data.beverage.abv_percent,
      style: data.beverage.style.style,
      beverageType: data.beverage.beverage_type,
      remainingVolumeMl: data.remaining_volume_ml,
      kegPercentFull: data.percent_full,
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
  } catch (err) {
    console.error('Error occurred while updating tap volume:', err);
    res.status(500).json({
      error: `An error occurred while updating tap volume`,
    });
  }
};

export default servedController;
