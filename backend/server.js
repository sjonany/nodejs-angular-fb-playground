'use strict';

var mongoose = require('mongoose'),
  passport = require('passport'),
  express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  dotenv = require('dotenv');

/**
 * Load environment variables from .env file, where API keys and passwords are configured
 */
dotenv.load({ path: '.env' });

// Connect to MongoDB.
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/fb-demo');
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

const User = require('./models/user');
var passportConfig = require('./passport');

// Setup configuration for facebook login
passportConfig();

var app = express();

// Enable CORS
var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

// REST API requirements
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Init routes
require('./app/routes.js')(app);

app.listen(3000);
module.exports = app;

console.log('Server running at http://localhost:3000/');