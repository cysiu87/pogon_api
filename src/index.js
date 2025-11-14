require("dotenv").config();
const express = require('express');
const app = express ();
const cors = require('cors');
const basicAuth = require("basic-auth"); 


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
const resultRouter = require('./routes/results.router')
const result2Router = require('./routes/results2.router')
const tournamentsRouter = require('./routes/tournaments.router')

const authenticate = (req, res, next) => {
  const user = basicAuth(req);

  const validUser =
    user && user.name === process.env.BASIC_AUTH_USERNAME && user.pass === process.env.BASIC_AUTH_PASSWORD;

  if (validUser) {
    return next(); // Authentication succeeded
  } else {
    res.set("WWW-Authenticate", 'Basic realm="Protected API"');
    return res.status(401).send("Authentication required.");
  }
};



app.use("/api/users",authenticate, usersRouter)
app.use("/api/bdd",authenticate, bddRouter)
app.use("/api/scripts",authenticate, scriptsRouter)
app.use("/api/result", resultRouter)
app.use("/api/result2", result2Router)
app.use("/api/tournaments", tournamentsRouter)

