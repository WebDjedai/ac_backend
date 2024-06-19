const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  database: 'ac_backend_db',
  host: 'localhost',
  password: 'root',
  port: 5432,
});

module.exports = pool
