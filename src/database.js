const { Pool } = require('pg');

// Ensure DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set!');
  process.exit(1); // Exit if the environment variable is missing
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL + "?sslmode=require",
});

async function connectToDatabase() {
  try {
    await pool.connect();  // Use the promise-based connect method
    console.log("Connected to PostgreSQL successfully!");
  } catch (err) {
    console.error('Failed to connect to PostgreSQL:', err.stack);
    process.exit(1); // Exit the process if connection fails
  }
}

// Call the connect function
connectToDatabase();

module.exports = pool;
