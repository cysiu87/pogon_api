require("dotenv").config();
const express = require('express');
const app = express ();
const getConnection = require('./db-config');

app.use(express.json());

const API_PORT = process.env.API_PORT || 3000;

app.listen(API_PORT, () => {
    console.log("Server Listening on PORT:", API_PORT);
  });

//DB test!
app.get('/test-db', (req, res) => {
    const db = getConnection();
    db.connect((err) => {
      if (err) {
        console.error('Error connecting to the database:', err.stack);
        res.render('database', { status: 'Error connecting to the database: ' + err.stack });
        return;
      }
      db.query('SELECT 1 + 1 AS solution', (err, results) => {
        db.end(); // Close the connection after query
        if (err) {
          console.error('Error querying the database:', err.stack);
          res.render('database', { status: 'Error querying the database: ' + err.stack });
          return;
        }
  
        // Use 'results.rows' to access the rows returned by PostgreSQL
        if (results.rows && results.rows.length > 0) {
          res.render('database', { status: 'Database connection test successful! Result: ' + results.rows[0].solution });
        } else {
          res.render('database', { status: 'No rows returned from the query.' });
        }
      });
    });
  });
  app.get("/status", (request, response) => {
    const status = {
       "Status": "Running"
    };
    
    response.send(status);
 });
 app.get("/", (request, response) => {
    const status = {
       "Status": "HelloWorld!"
    };
    
    response.send(status);
 });