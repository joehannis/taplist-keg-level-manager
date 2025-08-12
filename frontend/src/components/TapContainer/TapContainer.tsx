import React from 'react';
import './TapContainer.css';
import ServedForm from '../Served/ServedForm.tsx';
import fetchTapData from '../../common/fetchTapData';
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
          tapData?.taps.map((tap: Tap) => (
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
                <div>
                  <p>Remaining Keg Volume:</p>
                  {unit === 'us-imperial' ? (
                    <p>
                      {Math.trunc(tap.remainingVolumeMl / 29.6)} oz /{' '}
                      {Math.trunc(tap.kegPercentFull)}% full
                    </p>
                  ) : unit === 'british-imperial' ? (
                    <p>
                      {Math.trunc(tap.remainingVolumeMl / 568)} pints /{' '}
                      {Math.trunc(tap.kegPercentFull)}% full
                    </p>
                  ) : (
                    <p>
                      {Math.trunc(tap.remainingVolumeMl)} ml /{' '}
                      {Math.trunc(tap.kegPercentFull)}% full
                    </p>
                  )}
                </div>
              </div>
              <ServedForm
                currentTapNumber={tap.currentTapNumber}
                setTapData={setTapData}
                fetchTapData={fetchTapData}
                unit={unit}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default TapContainer;
