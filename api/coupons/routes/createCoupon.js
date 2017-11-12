'use strict';

const Boom = require('boom');
const Coupon = require('../model/Coupon');

const voucherCodes = require('voucher-code-generator');

module.exports = {
  method: 'POST',
  path: '/api/coupons',
  config: {
    handler: (req, res) => {
      let newCoupons = req.payload.newCoupons;

      const couponCodeGenerated = voucherCodes.generate({
        prefix: newCoupons.prefix || null,
        postfix: newCoupons.postfix || null,
        length: newCoupons.length || 8,
        count: newCoupons.count || 1
      });

      let arrCoupons = [];
      couponCodeGenerated.forEach((newCode) => {
          arrCoupons.push({couponCode: newCode})
      });

      Coupon.insertMany(arrCoupons, (err, coupons) => {
          if (err) {
            res(Boom.badRequest(err));
            throw Boom.badRequest(err);
          }
          // If the user is saved successfully, issue a JWT
          res({
            coupons: coupons
          }).code(201);
      });

      // coupon.save((err, coupons) => {
      //   if (err) {
      //     res(Boom.badRequest(err));
      //     throw Boom.badRequest(err);
      //   }
      //   // If the user is saved successfully, issue a JWT
      //   res({
      //       coupons: coupons
      //   }).code(201);
      // });  
    },
    // Validate the payload against the Joi schema
    // validate: {
    //   payload: createUserSchema
    // } 
    auth: false
  }
}