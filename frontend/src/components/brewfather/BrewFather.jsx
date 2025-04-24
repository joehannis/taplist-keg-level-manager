import { ToggleSlider } from 'react-toggle-slider';
import { useState } from 'react';
import fetchBrewFather from '../../common/fetchBrewFather';
import './brewfather.css';

const BrewFather = () => {
  const [onOff, setOnOff] = useState(false);
  const [brewFatherData, setBrewFatherData] = useState(null);

  const fetchData = async () => {
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
    fetchData();
  }

  return (
    <div className='brewfather-container'>
      <span className='brewfather-button'>
        <h3 className='button-title'>Coming Next</h3>
        <ToggleSlider
          value={onOff}
          onToggle={() => setOnOff(!onOff)}
          width={100}
          height={50}
          fontSize={20}
          label='BrewFather'
          className='brewfather-toggle'
        />
      </span>
      {onOff && (
        <div className='brewfather-results'>
          {brewFatherData &&
            brewFatherData.map((batch) => (
              <div key={batch._id} className='brewfather-batch'>
                <h3>{batch.recipe.name}</h3>
                <p>Started: {new Date(batch.brewDate).toDateString()}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
export default BrewFather;
