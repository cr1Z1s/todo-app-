require('dotenv').config();
const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.HOST,
  database: process.env.DB,
  port: process.env.PORT,
});

module.exports = pool;