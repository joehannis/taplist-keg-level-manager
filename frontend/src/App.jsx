import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import fetchTapData from './common/fetchTapData';
import TapContainer from './components/tapContainer/tapContainer';
import fetchBrewFather from './common/fetchBrewFather';
import BrewFather from './components/brewfather/BrewFather';
import { ToggleSlider } from 'react-toggle-slider';

const App = () => {
  const [tapData, setTapData] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [onOff, setOnOff] = useState(false);
  const [brewFatherData, setBrewFatherData] = useState(null);

  const socketConnection = async () => {
    const socket = io('http://localhost:4000');
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

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const fetchBrewFatherData = async () => {
    try {
      const data = await fetchBrewFather();
      console.log(data);
      data.sort((a, b) => new Date(b.brewDate) - new Date(a.brewDate));
      setBrewFatherData(data);
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
          <span></span>
          <div className='logo-container'>
            <img className='logo' src='./logo.png' alt='Taplist Wizard' />
            <h1 className='title'>Taplist Keg Level Manager</h1>
          </div>
          <>
            <div className='settings-container'>
              <div className='venue'>
                <h5>
                  {tapData
                    ? tapData[0]?.current_keg?.beverage?.producer?.name
                    : null}
                </h5>
                <img
                  className='venue-logo'
                  src={
                    tapData
                      ? tapData[0]?.current_keg?.beverage?.producer?.picture
                          ?.thumbnail_url
                      : null
                  }
                  alt='logo'
                />
              </div>
              <div className='unit-container'>
                <select
                  id='unit-select'
                  value={unit}
                  onChange={handleUnitChange}
                >
                  <option value='metric'>Metric</option>
                  <option value='us-imperial'>US Imperial</option>
                  <option value='british-imperial'>British Imperial</option>
                </select>
              </div>
            </div>
          </>
        </div>
        <span className='brewfather-button'>
          <h3 className='button-title'>Coming Next</h3>
          <ToggleSlider
            value={onOff}
            onToggle={(state) => setOnOff(state)}
            width={100}
            height={50}
            fontSize={20}
            label='BrewFather'
            className='brewfather-toggle'
          />
        </span>

        <Routes>
          <Route
            path='/'
            element={
              <>
                <TapContainer
                  tapData={tapData}
                  setTapData={setTapData}
                  unit={unit}
                  setUnit={setUnit}
                />
                {onOff ? <BrewFather brewFatherData={brewFatherData} /> : null}
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
