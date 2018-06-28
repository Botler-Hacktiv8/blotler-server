// require config
require('dotenv').config();
require('./config/config');
// library
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

// db connection
require('./lib/connection');

// router
const index = require('./routes/index');
const users = require('./routes/users');
const tasks = require('./routes/tasks');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', index);
app.use('/api', users);
app.use('/api/tasks', tasks);

module.exports = app;
