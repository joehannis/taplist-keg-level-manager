const pool = require('../bin/db'); // Import your database connection

const createAuth = async (venue, auth_token) => {
  try {
    const query = `
    INSERT INTO "auth_info" ("venue", "auth_token")
    VALUES ('hoppyhannis', 'secret-nnz5lj4jfxfqh18afmcaj1imsne84fc2f4b2czs9')
    RETURNING "id";
    `;

    const result = await pool.query(query);
    console.log('Auth saved successfully!');
    console.log(result.rows[0].venue); // Print the result object

    return result.rows[0].venue; // Return the result object
  } catch (err) {
    console.error('Error occurred while saving authorisation:', err);
    throw err; // Rethrow the error for the controller to handle
  }
};

module.exports = createAuth;
