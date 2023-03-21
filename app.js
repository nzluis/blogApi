const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const passport = require("passport");
var debug = require("debug")("blogApi:server");
var http = require("http");
const path = require("path");

const indexRouter = require("./routes/index");

const app = express();

require("./config/database");
require("./config/passport")(passport);

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Content-Type", "application/json")
  // res.setHeader("Access-Control-Allow-Credentials", "true")
  // res.setHeader("Access-Control-Allow-Methods", "*")
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  next();
});

app.use("/", indexRouter);

// app.use((req, res, next) => {

// })

port = 5000;

var server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
