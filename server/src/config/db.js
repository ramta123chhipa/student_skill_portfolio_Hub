const { Pool } = require("pg");
require("dotenv").config();

// Create a connection pool
const pool = new Pool({
  user: process.env.DB_USER,        // e.g. postgres
  host: process.env.DB_HOST,        // e.g. localhost
  database: process.env.DB_NAME,    // e.g. student_portfolio
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// Test the connection
pool.connect()
  .then(client => {
    console.log("✅ PostgreSQL connected successfully!");
    client.release();
  })
  .catch(err => {
    console.error("❌ PostgreSQL connection error:", err.stack);
  });

module.exports = pool;
