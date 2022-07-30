var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({
    message: "Welcome to the CryptoNewz API!",
    url: "https://github.com/zl90/crypto-newz-api",
  });
});

// Only a POST request is needed for login/signup in this project
router.post("/signup", userController.signup);
router.post("/login", userController.login);

module.exports = router;
