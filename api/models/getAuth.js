const pool = require('../bin/db');

const getAuth = async () => {
  try {
    console.log('Connecting to PostgreSQL database');
    const client = await pool.connect();
    console.log('Connected to PostgreSQL database');

    const query = `
      SELECT * FROM "auth_info";
    `;

    const authData = await client.query(query);
    console.log('Authorization details retrieved successfully!');

    // Release the client back to the pool
    client.release();

    return authData; // Assuming you want to return rows from the query
  } catch (err) {
    console.error('Error occurred while getting authorisation details:', err);
    throw new Error(
      `An error occurred while getting authorisation details: ${err.message}`
    );
  }
};

module.exports = getAuth;
