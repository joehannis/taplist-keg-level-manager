const client = require('../bin/db');
const getAuth = require('./getAuth');

const createAuth = async (venue, auth_token) => {
  try {
    const insertQuery = `
      INSERT INTO "auth_info" ("venue", "auth_token")
      VALUES ($1, $2)
      RETURNING "id";
      `;

    const details = await getAuth();

    client
      .connect()
      .then(async () => {
        console.log('Connected to PostgreSQL database');
        const result = await client.query(insertQuery, [venue, auth_token]);
        console.log('Auth saved successfully!');
        return result;
      })
      .catch((err) => {
        console.error('Error connecting to PostgreSQL database', err);
      });

    client
      .end()
      .then(() => {
        console.log('Connection to PostgreSQL closed');
      })
      .catch((err) => {
        console.error('Error closing connection', err);
      });
  } catch (err) {
    console.error('Error occurred while saving authorisation:', err);
    throw err;
  }
};

module.exports = createAuth;
