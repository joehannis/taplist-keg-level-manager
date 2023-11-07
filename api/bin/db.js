const { Pool } = require('pg');
const fs = require('fs');

const db = new Pool({
  user: 'root',
  database: 'taplist-integration',
  password: 'password',
  port: 5432, // default port for PostgreSQL
});

db.connect((err, client, done) => {
  if (err) throw err;

  // Read and execute the schema SQL file
  fs.readFile('../schema/schema.sql', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading schema file:', err);
      return;
    }

    client.query(data, (err) => {
      done(); // Release the client back to the pool

      if (err) {
        console.error('Error executing schema SQL:', err);
      } else {
        console.log(
          'Connected to PostgreSQL database and schema executed successfully'
        );
      }
    });
  });
});

module.exports = db;
