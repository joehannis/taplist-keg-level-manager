const pool = require('../bin/db');

const deleteAuth = async () => {
  try {
    const query = `
      DELETE FROM "auth_info";
    `;
    pool
      .connect()
      .then(async () => {
        console.log('Connected to PostgreSQL database');
        const result = await pool.query(query);
        console.log('Auth deleted successfully!');
        return result;
      })
      .catch((err) => {
        console.error('Error connecting to PostgreSQL database', err);
      });

    pool
      .end()
      .then(() => {
        console.log('Connection to PostgreSQL closed');
      })
      .catch((err) => {
        console.error('Error closing connection', err);
      });
  } catch (err) {
    console.error('Error occurred while deleting authorisation:', err);
    throw err;
  }
};

module.exports = deleteAuth;
