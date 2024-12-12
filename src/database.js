const { Pool } = require('pg');

// Ensure DATABASE_URL is defined
if (!process.env.DATABASE_URL_PROD) {
  console.error('DATABASE_URL environment variable is not set!');
  process.exit(1); // Exit if the environment variable is missing
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_PROD + "?sslmode=require",
});

pool.connect((err) => {
    if (!err){
    console.log("Connect to PostgreSQL successfully!")}
    else { console.log(err.message)}

})

// Call the connect function


module.exports = pool;
