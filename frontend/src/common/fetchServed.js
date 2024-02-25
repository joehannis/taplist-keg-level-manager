const fetchServed = async (currentTapNumber, servedAmount) => {
  try {
    const requestBody = JSON.stringify({
      currentTapNumber: currentTapNumber,
      servedAmount: servedAmount,
    });

    const response = await fetch('http://api/served', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default fetchServed;
