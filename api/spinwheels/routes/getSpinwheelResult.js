'use strict';

const SpinwheelResult = require('../model/SpinwheelResult');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/spinwheels',
  config: {
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    },
    handler: (req, res) => {
      SpinwheelResult.find().sort({created: -1})
      .exec((err, SpinwheelResults) => {
        if (err) {
          res(Boom.badRequest(err));
          throw Boom.badRequest(err);
        }
        if (!SpinwheelResults.length) {
          res(Boom.notFound('SpinwheelResult not found!'));
          throw Boom.notFound('SpinwheelResult not found!');
        }
        res({
          success: true,
          userSpinwheelResults: SpinwheelResults
      }).code(200);
        
      });
    }
  }
};

