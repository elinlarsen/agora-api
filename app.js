require('dotenv').config();
require("./config/dbconfig");
require('./config/passport');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const flash      = require('connect-flash');

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


var allowedOrigins = [process.env.SITE_APP];
app.use(cors({
  credentials: true,
  origin: allowedOrigins, 
}));


//app.use(cors());
// app.use(cors({
//   credentials: false,
//   /*origin: function(origin, callback){// allow requests with no origin  (like mobile apps or curl requests)
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       var msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//     */
//   }));
//}));

//SESSION
app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));


// PASSPORT
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());



// default value for title local
app.locals.title = "Agora";

const index = require("./routes/index");
app.use("/", index);

const auth = require("./routes/auth");
app.use("/", auth);

module.exports = app;
