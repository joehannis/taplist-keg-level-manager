import fetchTaps from './fetchTaps';

const fetchTapData = async (setTapData) => {
  try {
    const tapResponse = await fetchTaps(); // Make sure you have the fetchTaps function defined
    if (tapResponse.ok) {
      const tapData = await tapResponse.json();
      const filteredTapData = tapData.filter((tap) => tap.current_keg !== null);
      setTapData(filteredTapData);
    } else {
      console.error(
        'An error occurred while fetching tap data:',
        tapResponse.statusText
      );
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

export default fetchTapData;
