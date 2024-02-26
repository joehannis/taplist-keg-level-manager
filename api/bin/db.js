const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'taplist-keg-level-manager',
  password: 'postgres',
  port: 5432,
});

module.exports = pool;
