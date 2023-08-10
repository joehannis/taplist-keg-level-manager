const fetchTaps = async () => {
  try {
    const response = await fetch("http://localhost:3000/taps");
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default fetchTaps;
