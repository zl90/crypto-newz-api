var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// Only a POST request is needed for login/signup in this project
router.post("/signup", userController.signup);
router.post("/login", userController.login);

module.exports = router;
