import { ToggleSlider } from 'react-toggle-slider';
import { useState } from 'react';
import fetchBrewFather from '../../common/fetchBrewFather';

const BrewFather = () => {
  const [onOff, setOnOff] = useState(false);
  const [brewFatherData, setBrewFatherData] = useState(null);

  const fetchData = async () => {
    try {
      const data = await fetchBrewFather();
      setBrewFatherData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (onOff && !brewFatherData) {
    fetchData();
  }

  return (
    <div className='brewfather-button'>
      <ToggleSlider
        value={onOff}
        onToggle={() => setOnOff(!onOff)}
        width={100}
        height={50}
        fontSize={20}
        label='BrewFather'
      />
      {onOff && (
        <div className='brewfather-container'>
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
