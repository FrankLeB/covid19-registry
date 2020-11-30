const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: 
    process.env.RUN_MODE === "test"
      ? process.env.DB_DATABASE_TEST
      : process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD
});

module.exports = pool.promise();
