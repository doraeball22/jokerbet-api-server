'use strict';

const Coupon = require('../model/Coupon');
const Boom = require('boom');

module.exports = {
    method: 'GET',
    path: '/api/coupons/{id}',
    config: {
        handler: (req, res) => {

            const id = req.params.id;
            const query = Coupon.findOne({
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
                    success: true,
                    coupon: coupon
                }).code(200);
            })
        },
        auth: false
    }
};
// When there are no matches find() returns [], while findOne() returns null. So either use:
// Model.find( {...}, function (err, results) {
//     if (err) { ... }
//     if (!results.length) {
//         // do stuff here
//     }
// }

// or:

// Model.findOne( {...}, function (err, result) {
//     if (err) { ... }
//     if (!result) {
//         // do stuff here
//     }
// }
// https://stackoverflow.com/questions/9660587/do-something-if-nothing-found-with-find-mongoose