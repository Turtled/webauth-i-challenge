var express = require('express')
var bodyParser = require('body-parser')
var server = express()

const userRouter = require('./users/users-router');

const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const store = new KnexSessionStore(/* options here */); // defaults to a sqlite3 database

server.use(
  session({
    secret: "pleaseworkimbeggingpleasepleaseplease",
    cookie: {
      maxAge: 30000 // 30 seconds for testing
    },
    store: store
  })
);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
server.use(bodyParser.json())

server.use('/api/users', userRouter);

module.exports = server;
