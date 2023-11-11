const pool = require('../bin/db'); // Import your database connection

const getAuth = async (req, res) => {
  try {
    const query = `
      SELECT * FROM "auth_info";
    `;

    const authData = await pool.query(query);
    console.log(authData);

    res.json(authData);
  } catch (err) {
    console.error('Error occurred while getting authorisation:', err);
    res.status(500).json({
      error: `An error occurred while getting authorisation: ${err.message}`,
    });
  }
};

module.exports = getAuth;
