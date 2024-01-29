const fetchAuth = async () => {
  try {
    const response = await fetch('http://localhost:3000/auth');
    const data = await response.json();
    return data.rows;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default fetchAuth;
