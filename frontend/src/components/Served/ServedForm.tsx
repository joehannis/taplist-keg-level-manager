import './ServedForm.css';
import fetchServed from '../../api/fetchServed';
import fetchReset from '../../api/fetchReset';
import type { Served, TapList } from '@taplist-keg-level-manager/shared';

type ServedFormProps = {
  currentTapNumber: number;
  fetchTapData: (
    setTapData: React.Dispatch<React.SetStateAction<TapList | null>>
  ) => void;
  setTapData: React.Dispatch<React.SetStateAction<TapList | null>>;
  unit: string;
};

const ServedForm = ({
  currentTapNumber,
  setTapData,
  unit,
}: ServedFormProps) => {
  const handleBeer = async (
    servedAmount: string = '',
    updatedTap: Served | undefined = undefined
  ) => {
    if (!updatedTap) {
      if (servedAmount) {
        try {
          const updatedTap: Served | undefined = await fetchServed(
            currentTapNumber,
            servedAmount
          );
          if (updatedTap) {
            setTapData((prev) => {
              if (!prev) return prev;
              return {
                ...prev,
                venueName: prev.venueName,
                venueLogo: prev.venueLogo,
                taps: prev.taps.map((tap) =>
                  tap.currentTapNumber === updatedTap.currentTapNumber
                    ? { ...tap, ...updatedTap }
                    : tap
                ),
              };
            });
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      }
    } else {
      setTapData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          venueName: prev.venueName,
          venueLogo: prev.venueLogo,
          taps: prev.taps.map((tap) =>
            tap.currentTapNumber === updatedTap.currentTapNumber
              ? { ...tap, ...updatedTap }
              : tap
          ),
        };
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const servedAmount: string = (
      form.elements.namedItem('served-text') as HTMLInputElement
    )?.value;

    try {
      await handleBeer(servedAmount);
      form.reset();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleReset = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const confirmReset = window.confirm(
      'Are you sure you want to reset the keg volume?'
    );
    if (confirmReset) {
      try {
        const tapResult = await fetchReset(currentTapNumber);
        if (tapResult) {
          await handleBeer('', tapResult);
        } else {
          console.error('Reset failed: No tap data returned.');
        }
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
              onClick={() => handleBeer('177')}
              type='button'
            >
              6oz
            </button>
            <button
              className='oz12'
              onClick={() => handleBeer('355')}
              type='button'
            >
              12oz
            </button>
            <button
              className='oz16'
              onClick={() => handleBeer('473')}
              type='button'
            >
              16oz
            </button>
            <button
              className='oz20'
              onClick={() => handleBeer('568')}
              type='button'
            >
              20oz
            </button>
          </>
        ) : unit === 'metric' ? (
          <>
            <button
              className='ml250'
              onClick={() => handleBeer('250')}
              type='button'
            >
              250ml
            </button>
            <button
              className='ml500'
              onClick={() => handleBeer('500')}
              type='button'
            >
              500ml
            </button>
          </>
        ) : unit === 'british-imperial' ? (
          <>
            <button
              className='pintthird'
              onClick={() => handleBeer('190')}
              type='button'
            >
              1/3 Pint
            </button>
            <button
              className='pinthalf'
              onClick={() => handleBeer('284')}
              type='button'
            >
              1/2 Pint
            </button>
            <button
              className='pint'
              onClick={() => handleBeer('568')}
              type='button'
            >
              Pint
            </button>
          </>
        ) : null}
      </div>

      <form className='custom-amount-container' onSubmit={handleSubmit}>
        <div className='custom-amount'>Custom Amount</div>
        <div className='input-container'>
          <div className='input-wrapper'>
            <input
              className='served-text'
              type='number'
              placeholder='Enter amount in ml'
              name='served_amount'
              id='served-text'
              onFocus={(e) => e.target.setAttribute('placeholder', '')}
              onBlur={(e) =>
                e.target.setAttribute('placeholder', 'Enter amount in ml')
              }
            />
          </div>
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
