'use strict';

const Coupon = require('../model/Coupon');
const Boom = require('boom');

module.exports = {
    method: 'DELETE',
    path: '/api/coupons/{id}',
    config: {
      handler: (req, res) => {
        const id = req.params.id;
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
            res({
                message: 'This Coupon has Deleted!'
            }).code(200);
        })
      },
      auth: false
    }
  };