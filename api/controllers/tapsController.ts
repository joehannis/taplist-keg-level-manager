import express from 'express';
import { tapListSchema } from '../zod/zod-types';
import validateSchema from '../zod/validateSchema';
import type { TapList, Tap } from '@taplist-keg-level-manager/shared';

const tapsController = async (_req: express.Request, res: express.Response) => {
  try {
    const response: Response = await fetch(
      `https://api.taplist.io/api/v1/venues/${process.env.VENUE}/taps`,
      {
        headers: { Authorization: `Token ${process.env.AUTH_TOKEN}` },
      }
    );

    const data: unknown = await response.json();
    const result = validateSchema(tapListSchema, data);
    if (!result.success) {
      console.error(result.error);
      return res.status(502).json({ error: 'Invalid data from Taplist API' });
    }
    const validatedData = result.data;

    const taps = validatedData
      .filter((tap) => tap?.current_keg)
      .map((tap) => {
        return {
          beerName: tap?.current_keg?.beverage.name,
          currentTapNumber: tap?.current_keg?.current_tap_number,
          glasswareIllustrationUrl:
            tap?.current_keg?.beverage.glassware_illustration_url,
          tapLabel: tap?.label,
          abv: tap?.current_keg?.beverage.abv_percent,
          style: tap?.current_keg?.beverage.style?.style,
          beverageType: tap?.current_keg?.beverage.beverage_type,
          remainingVolumeMl: tap?.current_keg?.remaining_volume_ml,
          kegPercentFull: tap?.current_keg?.percent_full,
        };
      });

    const fullTapsObject: TapList = {
      venueName: validatedData[0]?.venue,
      venueLogo: validatedData[0]?.logo_thumbnail_url,
      taps: taps as Tap[],
    };

    res.status(200).json(fullTapsObject);
  } catch (err) {
    console.error('Error occurred while fetching taps:', err);
    res.status(500).json({
      error: `An error occurred while fetching taps`,
    });
  }
};

export default tapsController;
