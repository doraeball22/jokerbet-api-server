'use strict';

const Boom = require('boom');
const SpinwheelResult = require('../model/SpinwheelResult');

const removeOneCoupon = require('../../coupons/util/CouponFunctions').removeOneCoupon;

module.exports = {
  method: 'POST',
  path: '/api/spinwheels',
  config: {
    auth: false,
    pre: [{ method: removeOneCoupon }],
    handler: (req, res) => {
      let spinwheelResult = new SpinwheelResult(); 

      spinwheelResult.user = req.payload.user;
      spinwheelResult.coupon = req.payload.coupon;
      spinwheelResult.result = req.payload.result;

      if(!req.payload.result.win) {
        spinwheelResult.isProvidePrize = true;
      }
  
      spinwheelResult.save((err, spinwheelResult) => {
        if (err) {
          res(Boom.badRequest(err));
          throw Boom.badRequest(err);
        }
        // If the user is saved successfully, issue a JWT
        res({
            message: "รอรับรางวัลได้เลย!!"
        }).code(201);
      });  
    }
  }
}