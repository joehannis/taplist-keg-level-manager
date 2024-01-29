import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import AuthForm from './components/auth/AuthForm';
import fetchAuth from './common/fetchAuth';
import fetchTapData from './common/fetchTapData';
import TapContainer from './components/tapContainer/tapContainer';

const App = () => {
  const [isAuthorised, setIsAuthorised] = useState(false);
  const [tapData, setTapData] = useState(null);
  const [unit, setUnit] = useState('metric');

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const response = await fetchAuth();
        console.log(response);
        if (response.length > 0) {
          setIsAuthorised(true);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
    fetchAuthData();
  }, []);

  useEffect(() => {
    if (isAuthorised) {
      fetchTapData(setTapData);
    }
  }, []);

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  return (
    <div className='main-container'>
      <div className='header'>
        <div className='logo-container'>
          <img className='logo' src='./logo.png' alt='Taplist Wizard' />
          <h1 className='title'>Taplist Keg Level Manager</h1>
        </div>
      </div>
      {isAuthorised ? (
        <>
          <div className='unit-container'>
            <select value={unit} onChange={handleUnitChange}>
              <option value='metric'>Metric</option>
              <option value='us-imperial'>US Imperial</option>
              <option value='british-imperial'>British Imperial</option>
            </select>
          </div>
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
          </div>
          <TapContainer
            tapData={tapData}
            setTapData={setTapData}
            unit={unit}
            setUnit={setUnit}
          />
        </>
      ) : (
        <AuthForm />
      )}
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
