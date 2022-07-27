var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dotenv = require("dotenv/config");
const mongoose = require("mongoose");
require("./passport");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var articlesRouter = require("./routes/articles");

var app = express();

/// Mongoose connection
const mongodb = process.env.MONGODB_URI;
mongoose.connect(mongodb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

/// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

/// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/// Routes
app.use("/", indexRouter);
app.use("/articles", articlesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
