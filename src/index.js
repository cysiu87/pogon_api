require("dotenv").config();
const express = require('express');
const app = express ();
const cors = require('cors');
const basicAuth = require("basic-auth"); 

// CORS configuration
const corsOptions = {
  origin: ['https://pogon.onrender.com', 'http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));
app.use(express.json());
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
const usersController = require('./controllers/users.controller')

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

// Public routes (no authentication required)
app.post("/api/users/login", usersController.login);

// Protected routes (authentication required)
app.use("/api/users", authenticate, usersRouter)
app.use("/api/bdd", authenticate, bddRouter)
app.use("/api/scripts", authenticate, scriptsRouter)
app.use("/api/result", resultRouter)
app.use("/api/result2", result2Router)
app.use("/api/tournaments", tournamentsRouter)

