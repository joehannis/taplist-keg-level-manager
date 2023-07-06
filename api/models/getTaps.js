const getTaps = async (venue, authToken) => {
  try {
    const response = await fetch(
      `https://api.taplist.io/api/v1/venues/${venue}/taps`,
      {
        headers: { Authorization: `Token ${authToken}` },
      }
    );
    const data = await response.json();
    console.log("Response data:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

module.exports = getTaps;
