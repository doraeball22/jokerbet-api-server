'use strict';

const Boom = require('boom');
const Coupon = require('../model/Coupon');


function removeOneCoupon(req, res) {
  const id = req.payload.coupon._id;
  const query = Coupon.findOneAndRemove({
      _id: id
  });
  query.exec(function (err, coupon) {
      if (err) {
          res(Boom.badRequest(err));
          throw Boom.badRequest(err);
      }
      if (!coupon) {
          res(Boom.notFound('Coupon not found!'));
          throw Boom.notFound('Coupon not found!');
      }
      res(req.payload);
  })
}

function verifyCredentials(req, res) {
  const password = req.payload.password;

  // Find an entry from the database that
  // matches either the email or username
  User.findOne(
    {
      $or: [{ email: req.payload.email }, { username: req.payload.username }]
    },
    (err, user) => {
      if (!user) {
        return res(Boom.badRequest('Incorrect username or email!'));
      }
      bcrypt.compare(password, user.password, (err, isValid) => {
        if (isValid) {
          return res(user);
        }
        res(Boom.badRequest('Incorrect username or email!'));
      });
    }
  );
}

module.exports = {
  removeOneCoupon: removeOneCoupon,
  verifyCredentials: verifyCredentials
};
