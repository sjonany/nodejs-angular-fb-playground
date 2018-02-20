'use strict';

const express = require('express');
const expressJwt = require('express-jwt');
const passport = require('passport');
const router = express.Router();

// Models
const User = require('../models/user');

// App logic
const Auth = require('./auth');
const Me = require('./me');
const Todo = require('./todo');

module.exports = function(app) {
  // Set the base URL
  app.use('/api/v1', router);

  // App APIs.
  router.route('/me').get(authenticate, getCurrentUser, Me.getMe);
  router.route('/todo').get(authenticate, getCurrentUser, Todo.getTodos);
  router.route('/todo').post(authenticate, getCurrentUser, Todo.addTodo);

  // Facebook login
  router.route('/auth/facebook').post(
    passport.authenticate('facebook-token', {session: false}),
    Auth.authFacebook);
}

/////////////////////////////////////
// Token handling middleware.
// If the API requires a user, use these middlewares in succession:
// [authenticate, getCurrentUser]
// Then, your last function can be the API logic.
var authenticate = expressJwt({
  secret: 'my-secret',
  requestProperty: 'auth',
  getToken: function(req) {
    if (req.headers['x-auth-token']) {
      return req.headers['x-auth-token'];
    }
    return null;
  }
});

var getCurrentUser = function(req, res, next) {
  User.findById(req.auth.id, function(err, user) {
    if (err) {
      next(err);
    } else {
      console.log('get current user returned %s', user);
      req.user = user;
      next();
    }
  });
};

// Helper for debugging. Bypass the auth->getCurrentUser flow.
var getHardcodedCurrentUser = function(req, res, next) {
  req.auth = {id : "5a8b2c3cc1a8494e0ff051ab"};
  getCurrentUser(req, res, next);
}

