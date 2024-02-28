import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import fetchTapData from './common/fetchTapData';
import TapContainer from './components/tapContainer/tapContainer';

const App = () => {
  const [tapData, setTapData] = useState(null);
  const [unit, setUnit] = useState('metric');

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

  return (
    <BrowserRouter>
      <div className='main-container'>
        <div className='header'>
          <div className='logo-container'>
            <img className='logo' src='./logo.png' alt='Taplist Wizard' />
            <h1 className='title'>Taplist Keg Level Manager</h1>
          </div>
          <>
            <div className='icon-container'>
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

        <Routes>
          <Route
            path='/'
            element={
              <TapContainer
                tapData={tapData}
                setTapData={setTapData}
                unit={unit}
                setUnit={setUnit}
              />
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
