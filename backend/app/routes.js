'use strict';

const express = require('express');
const expressJwt = require('express-jwt');
const passport = require('passport');
const Me = require('./me');
const Auth = require('./auth');
const router = express.Router();

const User = require('../models/user');
module.exports = function(app) {
  // Set the base URL
  app.use('/api/v1', router);

  // App APIs.
  router.route('/me').get(authenticate, getCurrentUser, Me.getMe);

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
      req.user = user;
      next();
    }
  });
};

