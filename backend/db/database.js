const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'payrolldb',
  password: 'hsjwj12+kq6Y',
  port: 5432
});

module.exports = pool;