const db = require('../bin/db'); // Import your database connection

const createAuth = async (venue, auth_token) => {
  try {
    const query = `
      INSERT INTO "taplist-integration"."auth_info" ("venue", "auth_token")
      VALUES ($1, $2)
      RETURNING "id";
    `;

    const result = await db.one(query, [venue, auth_token]);

    return result; // Return the result object
  } catch (err) {
    console.error('Error occurred while saving authorization:', err);
    throw err; // Rethrow the error for the controller to handle
  }
};

module.exports = createAuth;
