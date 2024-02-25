const fetchReset = async (currentTapNumber) => {
  try {
    const requestBody = JSON.stringify({
      currentTapNumber: currentTapNumber,
    });

    const response = await fetch('http://localhost:3000/reset', {
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

export default fetchReset;
