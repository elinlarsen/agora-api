const express = require("express");
const router = new express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const dbHandler = require("../dbHandler.js");
const userModel = require("../models/User.js");
const userHandler = new dbHandler(userModel);
const parser = require("./../config/cloudinary");
const minPasswordLength = 8;


// SIGN UP
router.post("/signup", parser.single("picture"), (req, res, next) => {

  const { name, lastname, password, email} = req.body;
  var errorMsg = null;
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);
  const newUser = {
    name,
    lastname,
    email,
    password: hashPass
  };

  if (!name || !lastname || !password || !email)
    errorMsg = {
      message: "Provide username and password",
      status: "warning",
      httpStatus: 403 // 403	Forbidden
    };

  if (password.length < minPasswordLength)
    errorMsg = {
      message: `Please make your password at least ${minPasswordLength} characters`,
      status: "warning",
      httpStatus: 403 // 403	Forbidden
    };

  if (errorMsg) return res.status(errorMsg.httpStatus).json(errorMsg);

  if (req.file) newUser.picture = req.file.secure_url;

  userHandler
    .createOne(newUser)
    .then(newUserFromDB => {

      req.login(newUserFromDB, err => {
        console.log("passport login error", err);
        if (err) {
          return res.status(500).json({
            message: "Something went wrong with automatic login after signup"
          });
        }
        res.status(200).json(req.user);
      });
    })
    .catch(apiErr => {
      const error = {
        11000: "The email already exists in database"
      };
      const message = {
        text: `Something went wrong saving user to Database : ${
          error[apiErr.code]
        }`,
        status: "warning"
      };

      res.status(409).json({ message }); 
      return;
    });
});


// Log IN
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    var errorMsg = null;

    if (err) {
      console.log("signin error details", failureDetails);

      errorMsg = {
        message: "Something went wrong authenticating user",
        status: "error",
        httpStatus: 520
      };
    }

    if (!user)
      errorMsg = {
        message: "Sorry, we coudn't find this account",
        status: "warning",
        httpStatus: 404
      };

    if (errorMsg) return res.status(errorMsg.httpStatus).json(errorMsg);

    req.logIn(user, function(err) {
      if (err) {
        console.log("passport login error", err);
        return res.json({ message: "Something went wrong during logging." });
      }
      const { _id: id, name, lastname, email, picture } = req.user;
      next(
        res.status(200).json({
          loginStatus: true,
          user: {
            id,
            name,
            lastname,
            email,
            picture,
          }
        })
      );
    });
  })(req, res, next);
});


//SIGN OUT
router.post("/signout", (req, res, next) => {
  req.logout(); // utils function provided by passport
  res.json({ message: "Success" });
});


// LOGGED IN 
router.get("/loggedin", (req, res, next) => {
  console.log("ask is loggedin ???", req.isAuthenticated());
  if (req.isAuthenticated()) { // method provided by passport
    const { _id: id, name, lastname, email, picture} = req.user;
    return res.status(200).json({
      loginStatus: true,
      message: "authorized",
      user: {
        id,
        name,
        lastname,
        email,
        picture
      }
    });
  }
  res.status(403).json({ loginStatus: false, message: "Unauthorized" });
});

module.exports = router;