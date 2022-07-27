const User = require("../models/user");
const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const dotenv = require("dotenv/config");
const bcrypt = require("bcryptjs");

exports.login = function (req, res) {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        message: "Incorrect Username or Password",
        user,
      });
    }

    jwt.sign(
      { _id: user._id, username: user.username },
      process.env.ADMIN_PASSWORD,
      { expiresIn: "60m" },
      (err, token) => {
        if (err) return res.status(400).json(err);
        res.json({
          token: token,
          user: { _id: user._id, username: user.username },
        });
      }
    );
  })(req, res);
};

// This is used for the purposes of creating admin accounts
exports.signup = function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const adminPassword = req.body.adminPassword;

  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    res.status(401);
    return res.json({
      error: "Unauthorized access: Incorrect Admin Password.",
    });
  }

  bcrypt.hash(password, 10, function (err, hashedPassword) {
    // check for bcrypt errors
    if (err) {
      return next(err);
    }

    // Success, password is hashed. Create new user and save to db
    const user = new User({
      username: username,
      password: hashedPassword,
    });

    user.save((err) => {
      // check db/query errors
      if (err) {
        return next(err);
      }

      // Success, user is saved to the db. Redirect to login page
      res.json({ message: `Successfully created user ${username}` });
    });
  });
};
