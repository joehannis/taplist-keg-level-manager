const pool = require('../bin/db');
const getAuth = require('./getAuth');

const createAuth = async (venue, auth_token) => {
  try {
    const insertQuery = `
      INSERT INTO "auth_info" ("venue", "auth_token")
      VALUES ($1, $2)
      RETURNING "id";
      `;

    const details = await getAuth();
    console.log('Auth details:', details);
    if (details.length === 0) {
      const result = await pool.query(insertQuery, [venue, auth_token]);
      console.log('Auth saved successfully!');
      return result;
    } else {
      const deleteQuery = `
          DELETE FROM "auth_info";
        `;
      await pool.query(deleteQuery);
      console.log('Auth deleted successfully!');
      const result = await pool.query(insertQuery, [venue, auth_token]);
      console.log('Auth saved successfully!');
      return result;
    }
  } catch (err) {
    console.error('Error occurred while saving authorisation:', err);
    throw err;
  }
};

module.exports = createAuth;
