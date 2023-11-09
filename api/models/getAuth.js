const pool = require('../bin/db'); // Import your database connection

const getAuth = async (req, res) => {
  try {
    const query = `
      SELECT * FROM "taplist-integration"."auth_info";
    `;

    const authData = await pool.query(query);
    console.log(authData);

    res.status(200).json(authData);
  } catch (err) {
    console.error('Error occurred while getting authorization:', err);
    res.status(500).json({
      error: `An error occurred while getting authorization: ${err.message}`,
    });
  }
};

module.exports = getAuth;
