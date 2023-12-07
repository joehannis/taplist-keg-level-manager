import React from 'react';
import fetchServed from '../../common/fetchServed';
import fetchReset from '../../common/fetchReset';

const ServedForm = ({
  currentTapNumber,
  fetchTapData,
  setTapData,
  setIsAuthorised,
  unit,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const served_amount = e.target.elements['served-text'].value;
    try {
      await fetchServed(currentTapNumber, served_amount);
      e.target.reset();
      fetchTapData(setTapData, setIsAuthorised);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleBeer = async (served_amount) => {
    try {
      await fetchServed(currentTapNumber, served_amount);
      fetchTapData(setTapData, setIsAuthorised);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const confirmReset = window.confirm(
      'Are you sure you want to reset the keg volume?'
    );
    if (confirmReset) {
      try {
        await fetchReset(currentTapNumber);
        fetchTapData(setTapData, setIsAuthorised);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  };

  return (
    <div className='serving-form'>
      <div className='serving-button-container'>
        {unit === 'us-imperial' ? (
          <>
            <button
              className='oz6'
              onClick={() => handleBeer(177)}
              type='button'
            >
              6oz
            </button>
            <button
              className='oz12'
              onClick={() => handleBeer(355)}
              type='button'
            >
              12oz
            </button>
            <button
              className='oz16'
              onClick={() => handleBeer(473)}
              type='button'
            >
              16oz
            </button>
            <button
              className='oz20'
              onClick={() => handleBeer(568)}
              type='button'
            >
              20oz
            </button>
          </>
        ) : unit === 'metric' ? (
          <>
            <button
              className='ml250'
              onClick={() => handleBeer(250)}
              type='button'
            >
              250ml
            </button>
            <button
              className='ml500'
              onClick={() => handleBeer(500)}
              type='button'
            >
              500ml
            </button>
          </>
        ) : unit === 'british-imperial' ? (
          <>
            <button
              className='pinthalf'
              onClick={() => handleBeer(284)}
              type='button'
            >
              1/2 Pint
            </button>
            <button
              className='pint'
              onClick={() => handleBeer(568)}
              type='button'
            >
              Pint
            </button>
          </>
        ) : null}
      </div>

      <form onSubmit={handleSubmit}>
        <div className='custom-amount'>Custom Amount</div>
        <div className='input-container'>
          <input
            className='served-text'
            type='number'
            placeholder='Enter amount'
            name='served_amount'
            id='served-text'
            onFocus={(e) => e.target.setAttribute('placeholder', '')}
            onBlur={(e) =>
              e.target.setAttribute('placeholder', 'Enter served amount in ml')
            }
          />
          ml
        </div>
        <button className='served-submit' type='submit'>
          Submit
        </button>
        <p>
          <button className='served-submit' onClick={handleReset} type='button'>
            Reset
          </button>
        </p>
      </form>
    </div>
  );
};

export default ServedForm;
