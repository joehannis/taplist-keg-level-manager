import { useState, useEffect, useReducer } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useSocketConnection from './hooks/useSocketConnection.tsx';
import fetchTapData from './api/fetchTapData.ts';
import TapContainer from './components/TapContainer/TapContainer.tsx';
import fetchBrewFather from './api/fetchBrewFather.ts';
import BrewFatherContainer from './components/Brewfather/BrewFatherContainer.tsx';
import type { TapList, BrewFather } from '@taplist-keg-level-manager/shared';
import { appReducer } from './reducers/appReducer.ts';
import { ToggleSlider } from 'react-toggle-slider';

const App = () => {
  const [state, dispatch] = useReducer(appReducer, {
    tapData: null,
    unit: 'metric',
    brewFatherData: null,
  });

  const { tapData, unit, brewFatherData } = state;

  const setTapData = (data: TapList | null) =>
    dispatch({ type: 'SET_TAP_DATA', payload: data });
  const setUnit = (unit: 'metric' | 'us-imperial' | 'british-imperial') =>
    dispatch({ type: 'SET_UNIT', payload: unit });
  const setBrewFatherData = (data: BrewFather[]) =>
    dispatch({ type: 'SET_BREWFATHER_DATA', payload: data });
  const [onOff, setOnOff] = useState<Boolean>(false);

  useSocketConnection({
    onServed: () => fetchTapData().then((data) => setTapData(data)),
  });

  useEffect(() => {
    fetchTapData().then((data) => setTapData(data));
  }, []);

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(e.target.value as 'metric' | 'us-imperial' | 'british-imperial');
  };

  const fetchBrewFatherData = async () => {
    try {
      const data: BrewFather[] | null = (await fetchBrewFather()) ?? null;
      if (data) {
        data.sort((a, b) => b.brewDate - a.brewDate);
        setBrewFatherData(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (onOff && !brewFatherData) {
      fetchBrewFatherData();
    }
  }, [onOff, brewFatherData]);

  return (
    <BrowserRouter>
      <div className='main-container'>
        <div className='header'>
          <div className='logo-container'>
            <img
              className='logo'
              src='./logo.png'
              alt='Taplist Keg Level Manager'
            />

            <h1 className='title'>Taplist Keg Level Manager</h1>
          </div>
          <div className='brewfather-button'>
            <h3 className='brewfather-title'>Coming Next</h3>
            <div className='brewfather-toggle'>
              <ToggleSlider
                onToggle={(state) => setOnOff(state)}
                barWidth={40}
                barHeight={20}
              />
            </div>
          </div>

          <div className='settings-container'>
            <div className='venue-name'>
              <h5>{tapData ? tapData.venueName : null}</h5>
            </div>
            <img
              className='venue-logo'
              src={tapData?.venueLogo ?? undefined}
              alt='logo'
            />
            <div className='unit-container'>
              <select id='unit-select' value={unit} onChange={handleUnitChange}>
                <option value='metric'>Metric</option>
                <option value='us-imperial'>US Imperial</option>
                <option value='british-imperial'>British Imperial</option>
              </select>
            </div>
          </div>
        </div>

        <Routes>
          <Route
            path='/'
            element={
              <>
                <TapContainer
                  tapData={tapData}
                  setTapData={(value) =>
                    setTapData(
                      typeof value === 'function' ? value(tapData) : value
                    )
                  }
                  unit={unit}
                />
                {onOff ? (
                  <BrewFatherContainer brewFatherData={brewFatherData} />
                ) : null}
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
