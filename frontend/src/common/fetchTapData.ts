import type { TapList } from '@taplist-keg-level-manager/shared';

const fetchTapData = async (
  setTapData: React.Dispatch<React.SetStateAction<TapList | null>>
) => {
  try {
    const tapResponse: Response = await fetch('http://localhost:3000/taps');
    if (tapResponse.ok) {
      const tapData: TapList = await tapResponse.json();
      console.log('Fetched tap data:', tapData);
      setTapData(tapData);
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
