const isAuthValid = async () => {
  try {
    const response = await fetch('http://localhost:3000/auth');
    const data = await response.json();
    if (data.length === 0) {
      localStorage.clear();
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default isAuthValid;
