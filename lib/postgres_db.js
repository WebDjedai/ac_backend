const { Pool } = require('pg');
const pool = new Pool({
  user: 'admin',
  database: 'ac_backend_db',
  password: 'root',
  port: 5432,
});

module.exports = pool
