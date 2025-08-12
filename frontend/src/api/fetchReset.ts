import { Served } from '@taplist-keg-level-manager/shared';

const fetchReset = async (
  currentTapNumber: number
): Promise<Served | undefined> => {
  try {
    const requestBody = JSON.stringify({
      currentTapNumber: currentTapNumber,
    });

    const response: Response = await fetch('http://localhost:3000/reset', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });

    const data: Served | undefined = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default fetchReset;
