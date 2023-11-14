const pool = require('../bin/db'); // Import your database connection

const createAuth = async (venue, auth_token) => {
  try {
    const query = `
    INSERT INTO "auth_info" ("venue", "auth_token")
    VALUES ('hoppyhannis', 'secret-nnz5lj4jfxfqh18afmcaj1imsne84fc2f4b2czs9')
    RETURNING "id";
    `;

    const result = await pool.query(query);
    console.log('this is from auth.js');
    console.log(result.rows.venue); // Print the result object

    return result.rows.venue; // Return the result object
  } catch (err) {
    console.error('Error occurred while saving authorisation:', err);
    throw err; // Rethrow the error for the controller to handle
  }
};

module.exports = createAuth;
