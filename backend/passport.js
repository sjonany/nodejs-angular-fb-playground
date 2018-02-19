'use strict';

var passport = require('passport'),
  FacebookTokenStrategy = require('passport-facebook-token'),
  User = require('./models/user');

module.exports = function () {

  passport.use(new FacebookTokenStrategy({
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    },
    function (accessToken, refreshToken, profile, done) {
      User.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
        return done(err, user);
      });
    }));

};