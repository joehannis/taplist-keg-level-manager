const pool = require('../bin/db');

const deleteAuth = async () => {
  try {
    const query = `
      DELETE FROM "auth_info"
      WHERE "id" = 1
      RETURNING "id";
    `;

    const result = await pool.query(query);
    console.log('Auth deleted successfully!');
    return result;
  } catch (err) {
    console.error('Error occurred while deleting authorisation:', err);
    throw err;
  }
};

module.exports = deleteAuth;
