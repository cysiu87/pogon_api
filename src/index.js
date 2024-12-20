require("dotenv").config();
const express = require('express');
const app = express ();
const cors = require('cors');
const getConnection = require('./db-config');

app.use(express.json());
app.use(cors());
app.set('view engine', 'pug');
const API_PORT = process.env.API_PORT || 3000;

app.listen(API_PORT, () => {
    console.log("Server Listening on PORT:", API_PORT);
  });
const usersRouter = require('./routes/users.router')
const bddRouter = require('./routes/bdd.router')
const scriptsRouter = require('./routes/scripts.router')
  
app.use("/api/users", usersRouter)
app.use("/api/bdd", bddRouter)
app.use("/api/scripts", scriptsRouter)

//DB test!
// app.get('/test-db', (req, res) => {
//     const client = getConnection();
//     var login= req.query.login;
//     //console.log(login)
//     var pgsql = "SELECT * from users where login = '" +login +"';";
   
//     client.connect((err) => {
//       if (err) {
//         console.error("Error connecting to the database:", err.stack);
//         res.send({ "status": "Error connecting to the database: " + err.stack });
//         return;
//       }
//       client.query(pgsql, (err, results) => {
//         client.end(); // Close the connection after query
//         if (err) {
//           console.error('Error querying the database:', err.stack);
//           res.send({ "status": "Error querying the database: " + err.stack });
//           return;
//         }
  
//         // Use 'results.rows' to access the rows returned by PostgreSQL
//         if (results.rows && results.rows.length > 0) {
//           //console.table(results.rows)          
//           res.send(results.rows);
          
//         } else {
//           res.send({ "status": "No rows returned from the query." });
//         }
//       });
//     });
//   });
//   app.get("/status", (request, response) => {
//     const status = {
//        "Status": "Running"
//     };
    
//     response.send(status);
//  });
//  app.get("/", (request, response) => {
//     const status = {
//        "Status": "HelloWorld!"
//     };
    
//     response.send(status);
//  });