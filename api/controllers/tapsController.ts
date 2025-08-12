import express from 'express';
import type { TapList, Tap } from '@taplist-keg-level-manager/shared';

const tapsController = async (req: express.Request, res: express.Response) => {
  try {
    const response: Response = await fetch(
      `https://api.taplist.io/api/v1/venues/${process.env.VENUE}/taps`,
      {
        headers: { Authorization: `Token ${process.env.AUTH_TOKEN}` },
      }
    );
    const data: any = await response.json();
    const taps: Tap[] = data.map((tap: any) => {
      return {
        beerName: tap.current_keg.beverage.name,
        currentTapNumber: tap.number,
        glasswareIllustrationUrl:
          tap.current_keg.beverage.glassware_illustration_url,
        tapLabel: tap.label,
        abv: tap.current_keg.beverage.abv_percent,
        style: tap.current_keg.beverage.style.style,
        beverageType: tap.current_keg.beverage.beverage_type,
        remainingVolumeMl: tap.current_keg.remaining_volume_ml,
        kegPercentFull: tap.current_keg.percent_full,
      };
    });

    const fullTapsObject: TapList = {
      venueName: data[0].venue,
      venueLogo: data[0].logo_thumbnail_url,
      taps: taps,
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
