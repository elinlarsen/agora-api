require('dotenv').config();
require("./config/dbconfig");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");

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


/*app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000'], // <== this will be the URL of our React app (it will be running on port 3000)
//[process.env.SITE_APP]
}));*/

var allowedOrigins = [process.env.SITE_APP];
app.use(cors());
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


// default value for title local
app.locals.title = "Agora";

const index = require("./routes/index");
app.use("/", index);

module.exports = app;
