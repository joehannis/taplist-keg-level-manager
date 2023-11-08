const { Pool } = require('pg');
const fs = require('fs');

const db = new Pool({
  user: 'root',
  host: 'db',
  database: 'taplist-integration',
  password: 'password',
  port: 5432,
});

(async () => {
  const client = await db.connect();

  try {
    const schemaSQL = fs.readFileSync('../schema/schema.sql', 'utf8');
    await client.query(schemaSQL);
    console.log(
      'Connected to PostgreSQL database and schema executed successfully'
    );
  } catch (err) {
    console.error('Error executing schema SQL:', err);
  } finally {
    client.release();
  }
})();

module.exports = db;
