const fetchBrewFather = async () => {
  console.log('fetchBrewFather triggered');

  try {
    const response = await fetch('http://localhost:3000/brewfather');
    console.log(response);
    const data = await response.json(); // Call the json function to parse the response
    console.log(data); // Log the parsed data
    return data;
  } catch (error) {
    console.error('Error fetching BrewFather data:', error);
  }
};

export default fetchBrewFather;
