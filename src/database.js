const { Pool } = require('pg');

// Ensure DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set!');
  process.exit(1); // Exit if the environment variable is missing
}

const pool = new Pool({
  // connectionString: process.env.DATABASE_URL + "?sslmode=require",
  connectionString: process.env.DATABASE_URL_PROD,
});

pool.connect((err) => {
  if (err) {
    console.error("Connection error: ", err.message);
  } else {
    console.log("Connected to PostgreSQL successfully!");      
  }
});


module.exports = pool;
