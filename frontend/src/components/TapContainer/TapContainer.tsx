import React from 'react';
import './TapContainer.css';
import ServedForm from '../Served/ServedForm.tsx';
import fetchTapData from '../../api/fetchTapData.ts';
import VolumeDisplay from '../VolumeDisplay/VolumeDisplay.tsx';
import type { TapList, Tap } from '@taplist-keg-level-manager/shared';

type TapContainerProps = {
  tapData: TapList | null;
  setTapData: React.Dispatch<React.SetStateAction<TapList | null>>;
  unit: 'us-imperial' | 'british-imperial' | 'metric';
};

const TapContainer: React.FC<TapContainerProps> = ({
  tapData,
  setTapData,
  unit,
}) => {
  return (
    <>
      <div className='tap-data-container'>
        {tapData !== null &&
          tapData?.taps.map((tap: Tap) => {
            return (
              <div key={tap.currentTapNumber} className='tap-item'>
                <div className='tap-content'>
                  <b>
                    <h3>
                      {tap.tapLabel
                        ? tap.tapLabel
                        : 'Tap No. ' + tap.currentTapNumber}
                    </h3>
                  </b>
                  <img
                    className='glass-image'
                    src={tap.glasswareIllustrationUrl ?? ''}
                    alt='beer label'
                  />
                  <p className='beer-name'>Beer Name: {tap.beerName}</p>
                  <p>ABV: {tap.abv ? `${tap.abv}%` : 'N/A'}</p>
                  <p>Style: {tap.style ?? tap.beverageType}</p>

                  <p>Remaining Keg Volume:</p>
                  <VolumeDisplay
                    volumeMl={tap.remainingVolumeMl}
                    unit={unit}
                    kegPercentFull={tap.kegPercentFull}
                  />

                  <ServedForm
                    currentTapNumber={tap.currentTapNumber}
                    setTapData={setTapData}
                    fetchTapData={fetchTapData}
                    unit={unit}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default TapContainer;
