const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'db',
  database: 'taplist-keg-level-manager',
  password: 'postgres',
  port: 5432,
});

module.exports = client;
