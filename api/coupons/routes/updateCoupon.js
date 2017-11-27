'use strict';

const Boom = require('boom');
const Coupon = require('../model/Coupon');
const updateCouponSchema = require('../schemas/updateCouponSchema');

module.exports = {
    method: 'PATCH',
    path: '/api/coupons/{id}/edit',
    config: {
      handler: (req, res) => {
        
        const id = req.params.id;
        const updatedCoupon = req.payload;
        Coupon.findOneAndUpdate({ _id: id }, updatedCoupon, (err, coupon) => {
          if (err) {
            res(Boom.badRequest(err));
            throw Boom.badRequest(err);
          }
          if (!coupon) {
            res(Boom.notFound('Coupon not found!').code(404));
            throw Boom.notFound('Coupon not found!').code(404);
          }
          res({
            message: 'Coupon updated!',
            coupon: coupon
        }).code(200);
        });
      },
      validate: {
        params: updateCouponSchema.paramsSchema
      },
      auth: {
        strategy: 'jwt',
        scope: ['admin']
      }
    }
  };