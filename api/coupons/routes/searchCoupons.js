'use strict';

const Coupon = require('../model/Coupon');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/coupons/search',
  config: {
    handler: (req, res) => {
        const queryParams = req.query;
        console.log(queryParams);

        Coupon.find({'title' : {$regex : queryParams.title} })
        .exec((err, Coupons) => {
          if (err) {
            // res(Boom.badRequest(err));
            // throw Boom.badRequest(err);
          }
          if (!Coupons.length) {
            // res(Boom.notFound('Coupon not found!'));
            // throw Boom.notFound('No Coupons found!');
          }
          res({
            success: true,
            coupons: Coupons
        }).code(200);
          
        });
    },
    auth: false
  }
};