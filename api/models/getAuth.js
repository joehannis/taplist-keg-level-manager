const client = require('../bin/db');

const getAuth = async () => {
  try {
    const query = `
      SELECT * FROM "auth_info";
    `;
    client.connect().then(async () => {
      console.log('Connected to PostgreSQL database');
      const authData = await client.query(query);
      console.log('Authorisation details retrieved successfully!');
      return authData;
    });
  } catch (err) {
    console.error('Error occurred while getting authorisation details:', err);
    res.status(500).json({
      error: `An error occurred while getting authorisation details: ${err.message}`,
    });
  }
};

module.exports = getAuth;
