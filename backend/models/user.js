'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {type: String},
  lastName: {type: String},
  email: {
    type: String, required: true,
    trim: true, unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  facebookProvider: {
    type: {
      id: String,
      token: String
    },
    // This field by default won't be returned in query results unless
    // Explicitly asked for.
    select: false
  }
});

UserSchema.set('toJSON', {getters: true, virtuals: true});

/**
 * Ensure a user corresponding to the fb user exists.
 * If there is none, create a new one.
 */
UserSchema.statics.upsertFbUser = function(accessToken, refreshToken, profile, cb) {
  var that = this;
  return this.findOne({
    'facebookProvider.id': profile.id
  }, function(err, user) {
    // no user was found, lets create a new one
    if (!user) {
      var newUser = new that({
        fullName: profile.displayName,
        email: profile.emails[0].value,
        facebookProvider: {
          id: profile.id,
          token: accessToken
        }
      });

      newUser.save(function(error, savedUser) {
        if (error) {
          console.log(error);
        }
        return cb(error, savedUser);
      });
    } else {
      return cb(err, user);
    }
  });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
