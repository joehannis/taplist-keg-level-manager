import type { Served } from '@taplist-keg-level-manager/shared';

const fetchServed = async (
  currentTapNumber: number,
  servedAmount: string
): Promise<Served | undefined> => {
  try {
    const requestBody = JSON.stringify({
      currentTapNumber: currentTapNumber,
      servedAmount: servedAmount,
    });

    const response: Response = await fetch('http://localhost:3000/served', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });

    const data: Served | undefined = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default fetchServed;
