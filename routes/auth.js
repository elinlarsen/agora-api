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

  const { first_name, last_name, username, email, password } = req.body;
  var errorMsg = null;
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);
  const newUser = {
    first_name,
    last_name,
    username,
    email,
    password: hashPass,
  };
  if (req.file) newUser.picture = req.file.secure_url;

  if (!first_name || !last_name || !username || !password || !email)
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

  userHandler
    .createOne(newUser, newUserFromDB => {
        console.log( "while creating new user ---newUserFromDB  ",newUserFromDB )
        req.login(newUserFromDB, err => {       
          if (err) {
            console.log("Passport login error --------", err);
            return res.status(500).json({
              message: "Something went wrong with automatic login after signup"
            });
          }
          //else res.status(200).json(req.user);
          else res.status(200).json(newUserFromDB)
        });
    })
});


// Log IN
router.get("/login", (req, res) =>{
  res.send(req.body)
})

/* router.post("/login", passport.authenticate("local", {successRedirect: "/agoras",
                                                      failureRedirect: "/login",
                                                      failureFlash: true,
                                                      passReqToCallback: true}
                                           )
);
*/

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
    if (!user){
      console.log("user not found in db", failureDetails, "user ---", user, "error --", err);
      errorMsg = {
        message: "Sorry, we coudn't find this account",
        status: "warning",
        httpStatus: 404
      };
    }
     
    if (errorMsg) return res.status(errorMsg.httpStatus).json(errorMsg);

     // save user in session
    req.login(user, function(err) {
      if (err) {
        console.log("error while saving user in session ----", err)
        res.status(500).json({ message: "Session save went bad." });
        return;
      }  
      console.log("in req.login - auth server file -- req.user :  ", req.user)   
      next(res.status(200).json(req.user));
    });
  })(req, res, next);
});


//SIGN OUT
router.post("/signout", (req, res, next) => {
  req.logout(); // utils function provided by passport
  res.json({ message: "Successful sign out!" });
});


// LOGGED IN 
router.get("/loggedin", (req, res, next) => {
  console.log("is loggedin ? ", req.isAuthenticated());
  if (req.isAuthenticated()) { // method provided by passport
    //const { _id: id, first_name, last_name, email, picture} = req.user;
    let userToFront=req.user;
    delete userToFront.password;
    return res.status(200).json({
      loginStatus: true,
      message: "authorized",
      user: userToFront,
    });
  }
  res.status(403).json({ loginStatus: false, message: "Unauthorized" });
});

module.exports = router;