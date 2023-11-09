const pool = require('../bin/db'); // Import your database connection

const createAuth = async (venue, auth_token) => {
  try {
    const query = `
      INSERT INTO "auth_info" ("venue", "auth_token")
      VALUES (${venue}, ${auth_token})
      RETURNING "id";
    `;

    const result = await pool.query(query);

    return result; // Return the result object
  } catch (err) {
    console.error('Error occurred while saving authorisation:', err);
    throw err; // Rethrow the error for the controller to handle
  }
};

module.exports = createAuth;
