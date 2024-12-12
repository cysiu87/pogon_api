const { Client } = require('pg');
require('dotenv').config();

var config_prod = {
  user: process.env.USER, 
  database: process.env.DATABASE, 
  password: process.env.PASSWORD, 
  host: process.env.HOST_PROD, 
  port: process.env.PORT, 
  max: process.env.MAX,
  idleTimeoutMillis: process.env.TIMEOUT,
  ssl: true,
  sslmode: "no-verify"
};

var config = {
  user: process.env.USER, 
  database: process.env.DATABASE, 
  password: process.env.PASSWORD, 
  host: process.env.HOST, 
  port: process.env.PORT, 
  max: process.env.MAX,
  idleTimeoutMillis: process.env.TIMEOUT,
  ssl: true,
  sslmode: "no-verify"
};

const getConnection = () => {
  return new Client(config);
  
  // ({
  //   connectionString: process.env.DATABASE_URL_PROD,  // Use connectionString with the URL
  //   ssl: {
  //     rejectUnauthorized: false // Necessary for some cloud providers (e.g., Heroku)      
  //   }
  // });
};

module.exports = getConnection;
