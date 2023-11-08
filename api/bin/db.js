const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

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
    const schemaFilePath = path.join(__dirname, '../schema/schema.sql');
    const schemaSQL = fs.readFileSync(schemaFilePath, 'utf8');
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
