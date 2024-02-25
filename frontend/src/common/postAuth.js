const postAuth = async (venue, auth_token) => {
  try {
    const requestBody = JSON.stringify({
      venue: venue,
      auth_token: auth_token,
    });

    const response = await fetch('http://localhost:3000/auth', {
      method: 'POST',
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

export default postAuth;
