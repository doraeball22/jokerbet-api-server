'use strict';

const jwt = require('jsonwebtoken');
const secret = require('../../../config');

function createToken(userCoupon) {
  let scopes;
  // Check if the user object passed in
  // has admin set to true, and if so, set
  // scopes to admin
  // if (user.admin) {
  //   scopes = 'admin';
  // }
  // Sign the JWT
  return jwt.sign(
    userCoupon,
    secret,
    { algorithm: 'HS256', expiresIn: 60 * 5 }
  );
}

module.exports = createToken;
