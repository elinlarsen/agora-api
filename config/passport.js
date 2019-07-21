const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcryptjs');
const passport      = require('passport');
const userModel = require("../models/User.js");

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});
passport.deserializeUser((userIdFromSession, cb) => {
  userModel.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, userDocument);
  });
});
passport.use(new LocalStrategy((username, password, next) => {
  userModel.findOne({ username }, (err, foundUser) => {
    if (err) {
      next(err);
      return;
    }
    if (!foundUser) {
      next(null, false, { message: 'Incorrect username.' });
      return;
    }
    if (!bcrypt.compareSync(password, foundUser.password)) {
      next(null, false, { message: 'Incorrect password.' });
      return;
    }
    next(null, foundUser);
  });
}));

module.exports = passport;


