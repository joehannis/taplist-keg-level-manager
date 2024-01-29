const fetchAuth = async () => {
  try {
    const response = await fetch('http://localhost:3000/auth');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default fetchAuth;
