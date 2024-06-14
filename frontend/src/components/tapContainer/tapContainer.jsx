import { React } from 'react';

import ServedForm from '../served/servedForm';
import fetchTapData from '../../common/fetchTapData';
import BrewFather from '../brewfather/BrewFather';

const TapContainer = ({ tapData, setTapData, unit }) => {
  return (
    <>
      <div className='tap-data-container'>
        {tapData !== null &&
          tapData.map((tap, index) => (
            <div
              key={tap.current_keg.current_tap_number}
              className={
                tapData.length === 1
                  ? 'tap-item-one'
                  : tapData.length === 2
                  ? 'tap-item-two'
                  : `tap-item ${index % 3 === 2 ? 'break-after' : ''}`
              }
            >
              <div className='tap-content'>
                <img
                  className='glass-image'
                  src={tap.current_keg.beverage.glassware_illustration_url}
                  alt='beer label'
                />
                <div className='tap-details'>
                  <b>
                    <p>{tap.label ? tap.label : 'Tap No. ' + tap.number}</p>
                  </b>
                  <p className='beer-name'>
                    Beer Name: {tap.current_keg.beverage.name}
                  </p>
                  <p>ABV: {tap.current_keg.beverage.abv_percent}%</p>
                  <p>
                    Style:{' '}
                    {tap.current_keg.beverage.style
                      ? tap.current_keg.beverage.style.style ||
                        tap.current_keg.beverage.beverage_type
                      : tap.current_keg.beverage.beverage_type}
                  </p>
                  <div>
                    <p>Remaining Keg Volume:</p>
                    {unit === 'us-imperial' ? (
                      <p>
                        {Math.trunc(tap.current_keg.remaining_volume_ml / 29.6)}{' '}
                        oz / {Math.trunc(tap.current_keg.percent_full)}% full
                      </p>
                    ) : unit === 'british-imperial' ? (
                      <p>
                        {Math.trunc(tap.current_keg.remaining_volume_ml / 568)}{' '}
                        pints / {Math.trunc(tap.current_keg.percent_full)}% full
                      </p>
                    ) : (
                      <p>
                        {Math.trunc(tap.current_keg.remaining_volume_ml)} ml /{' '}
                        {Math.trunc(tap.current_keg.percent_full)}% full
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <ServedForm
                currentTapNumber={tap.current_keg.current_tap_number}
                setTapData={setTapData}
                fetchTapData={fetchTapData}
                unit={unit}
              />
            </div>
          ))}
      </div>
      <BrewFather />
    </>
  );
};

export default TapContainer;
