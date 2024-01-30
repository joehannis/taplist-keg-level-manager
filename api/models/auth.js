const pool = require('../bin/db');
const getAuth = require('./getAuth');

const createAuth = async (venue, auth_token) => {
  try {
    const updateQuery = `
    UPDATE "auth_info" ("venue", "auth_token")
    VALUES ($1, $2)
    SET "venue" = $1, "auth_token" = $2
    WHERE "id" = 1
    RETURNING "id";
    `;

    const insertQuery = `
      INSERT INTO "auth_info" ("venue", "auth_token")
      VALUES ($1, $2)
      RETURNING "id";
      `;

    const details = await getAuth();
    if (details.rows.length > 0) {
      const result = await pool.query(updateQuery, [venue, auth_token]);
      console.log('Auth saved successfully!');
    } else {
      const result = await pool.query(insertQuery, [venue, auth_token]);
      console.log('Auth saved successfully!');
    }

    return result;
  } catch (err) {
    console.error('Error occurred while saving authorisation:', err);
    throw err;
  }
};

module.exports = createAuth;
