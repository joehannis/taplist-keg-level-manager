const deleteAuth = async () => {
  try {
    const response = await fetch('http://api:3000/auth', {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default deleteAuth;
