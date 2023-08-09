const getTaps = async (venue) => {
  try {
    const response = await fetch(
      `https://api.taplist.io/api/v1/venues/${venue}/taps`,
      {
        headers: { Authorization: `Token ${process.env.authToken}` },
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
