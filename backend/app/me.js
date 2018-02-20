'use strict';
// API logic for handles /me endpoint
// Params are populated in req.

/**
 * @param user (User model obj)
 * @return A json representation of user.
 */
exports.getMe = function (req, res) {
  var user = req.user.toObject();
  delete user['facebookProvider'];
  delete user['__v'];
  res.json(user);
};