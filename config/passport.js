const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcryptjs');
const passport      = require('passport');

const dbHandler = require("../dbHandler.js");
const userModel = require("../models/User.js");
const userHandler = new dbHandler(userModel);

passport.serializeUser((loggedInUser, cb) => {
  console.log("in serializeUser passport function, loggedInUser : ", loggedInUser)
  cb(null, loggedInUser.user._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  console.log("userIdFromSession ", userIdFromSession)
  userHandler.getOneById(userIdFromSession, "", (userDocument) => {
    //if (err) {cb(err);return;}
    cb(null, userDocument);
  });
});

passport.use(new LocalStrategy(  {
  usernameField: "email",
  passwordField: "password"
},   
  (email, password, next) => {
    userHandler.getOne({ email: email }, foundUser => {
    console.log("found user while logging in", foundUser)

    if (!foundUser) {
      next(null, false, { message: 'Incorrect email.' });
      return;
    }
    if (!bcrypt.compareSync(password, foundUser.password)) {
      next(null, false, { message: 'Incorrect password.' });
      return;
    }
    next(null, {
      loginStatus : true, 
      user : foundUser});
  });
}));

module.exports = passport;


