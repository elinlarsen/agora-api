require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors')



const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({
 credentials: true,
 origin: [process.env.SITE_URL]
}));
 

// default value for title local
app.locals.title = 'Agora';

const index = require('./routes/index');
app.use('/', index);


module.exports = app;
