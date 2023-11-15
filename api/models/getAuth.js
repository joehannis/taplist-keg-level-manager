const pool = require('../bin/db'); // Import your database connection

const getAuth = async (req, res) => {
  try {
    const query = `
      SELECT * FROM "auth_info";
    `;

    const authData = await pool.query(query);
    console.log('This is authData from getAuth');
    console.log(authData);

    res.json(authData.rows);
  } catch (err) {
    console.error('Error occurred while getting authorisation details:', err);
    res.status(500).json({
      error: `An error occurred while getting authorisation details: ${err.message}`,
    });
  }
};

module.exports = getAuth;
