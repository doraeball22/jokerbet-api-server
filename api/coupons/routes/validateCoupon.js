'use strict';

const Coupon = require('../model/Coupon');
const Boom = require('boom');

const createToken = require('../util/token');

module.exports = {
  method: 'POST',
  path: '/api/coupons/validate',
  config: {
    handler: (req, res) => {
        const gameUsername = req.payload.gameUsername;
        const confirmGameUsername = req.payload.confirmGameUsername;
        const couponCode = req.payload.couponCode;

        const query = Coupon.findOne({
            couponCode: couponCode
        });
        query.select('-__v')
        query.exec(function (err, coupon) {
            if (err) {
                res(Boom.badRequest(err));
                throw Boom.badRequest(err);
            }
            if (!coupon) {
                res(Boom.notFound('Coupon not found!'));
                throw Boom.notFound('Coupon not found!');
              }
            let userCoupon = { 
                gameUsername: gameUsername,
                coupon:coupon
            }
            res({
                valid: true,
                userCoupon: userCoupon,
                validCouponToken: createToken(userCoupon)
            }).code(201);
        })
    },
    auth: false
  }
};

