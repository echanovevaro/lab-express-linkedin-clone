
const express = require("express");
const router = express.Router();
const User = require("../../models/user");

const bcrypt     = require("bcrypt");
const saltRounds = 10;

/* GET home page. */
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

/* POST home page. */
router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email    =     req.body.email;

  if (username === "" || password === ""|| email === "") {
    res.render("auth/signup", {
      errorMessage: "Indicate a username and a password and email to sign up"
    });
    return;
  }

  User.findOne({ "username": username },
  "username",
  (err, user) => {
    if (user !== null) {
      res.render("auth/signup", {
        errorMessage: "The username already exists"
      });
      return;
    }

    const salt     = bcrypt.genSaltSync(saltRounds);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      username,
      password: hashPass,
      email
    });

    newUser.save((err) => {
      if(err){console.log(err);}
      res.redirect("/");
    });
  });
});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.get("/login", (req, res, next) => {
    res.render("auth/login");
  });

  router.post("/login", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username === "" || password === "") {
      res.render("auth/login", {
        errorMessage: "Indicate a username and a password to sign up"
      });
      return;
    }
  
    User.findOne({ "username": username }, (err, user) => {
        if (err || !user) {
          res.render("auth/login", {
            errorMessage: "The username doesn't exist"
          });
          return;
        }
        if (bcrypt.compareSync(password, user.password)) {
          // Save the login in the session!
          req.session.currentUser = user;
          res.redirect("/");
        } else {
          res.render("auth/login", {
            errorMessage: "Incorrect password"
          });
        }
    });
  });

module.exports = router;
