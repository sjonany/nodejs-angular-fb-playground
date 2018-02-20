'use strict';
// API logic for handles /auth endpoint
// Params are populated in req.

const jwt = require('jsonwebtoken');
const passport = require('passport');

/**
 * Callback after facebook auth. Send JWT back to client.
 */
exports.authFacebook = function(req, res) {
    // See passport.js. This callback is called after
    // the strategy's callback has been invoked.
    // That's where req.user gets populated.
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }

    var token = createJWT(req.user.id);
    res.setHeader('x-auth-token', token);
    res.status(200).send('');
};

var createJWT = function(userId) {
  return jwt.sign({
    id: userId
  // TODO: signing key should be env-ed out.
  }, 'my-secret',
  {
    expiresIn: 60 * 120
  });
};