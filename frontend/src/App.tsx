import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { ServerToClientEvents } from '@taplist-keg-level-manager/shared';
import fetchTapData from './common/fetchTapData.ts';
import TapContainer from './components/TapContainer/TapContainer.tsx';
import fetchBrewFather from './common/fetchBrewFather.ts';
import BrewFatherContainer from './components/Brewfather/BrewFatherContainer.tsx';
import { ToggleSlider } from 'react-toggle-slider';
import type { TapList, BrewFather } from '@taplist-keg-level-manager/shared';

const App = () => {
  const [tapData, setTapData] = useState<TapList | null>(null);
  const [unit, setUnit] = useState<
    'metric' | 'us-imperial' | 'british-imperial'
  >('metric');
  const [onOff, setOnOff] = useState<Boolean>(false);
  const [brewFatherData, setBrewFatherData] = useState<BrewFather[] | null>(
    null
  );

  const socketConnection = async () => {
    const socket: Socket<ServerToClientEvents> = io('http://localhost:4000');
    socket.on('connect', function () {
      console.log('connected: ');
    });
    socket.on('served', () => {
      fetchTapData(setTapData);
    });
  };

  useEffect(() => {
    fetchTapData(setTapData);
    socketConnection();
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
  if (onOff && !brewFatherData) {
    fetchBrewFatherData();
  }
  return (
    <BrowserRouter>
      <div className='main-container'>
        <div className='header'>
          <span className='brewfather-button'>
            <h3 className='button-title'>Coming Next</h3>
            <div className='brewfather-toggle'>
              <ToggleSlider
                onToggle={(state) => setOnOff(state)}
                barWidth={40}
                barHeight={20}
              />
            </div>
          </span>
          <div className='logo-container'>
            <img
              className='logo'
              src='./logo.png'
              alt='Taplist Keg Level Manager'
            />
            <h1 className='title'>Taplist Keg Level Manager</h1>
          </div>
          <div className='settings-container'>
            <div className='venue-name'>
              <h5>{tapData ? tapData.venueName : null}</h5>
            </div>
            <img
              className='venue-logo'
              src={tapData?.venueLogo ?? ''}
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
                  setTapData={setTapData}
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
