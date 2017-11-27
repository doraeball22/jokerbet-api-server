'use strict';

const Boom = require('boom');
const SpinwheelResult = require('../model/SpinwheelResult');
const updateSpinwheelResultSchema = require('../schemas/updateSpinwheelResultSchema');

module.exports = {
    method: 'PUT',
    path: '/api/spinwheels',
    config: {
      auth: {
        strategy: 'jwt',
        scope: ['admin']
      },
      handler: (req, res) => {
        
        const id = req.payload._id;
        const updatedSpinwheelResult = req.payload;
        SpinwheelResult.findOneAndUpdate({ _id: req.payload._id }, updatedSpinwheelResult, (err, spinwheelResult) => {
          if (err) {
            res(Boom.badRequest(err));
            throw Boom.badRequest(err);
          }
          if (!spinwheelResult) {
            res(Boom.notFound('SpinwheelResult not found!').code(404));
            throw Boom.notFound('SpinwheelResult not found!').code(404);
          }
          res({
            message: 'SpinwheelResult updated!',
            userSpinWheelResult: spinwheelResult
        }).code(200);
        });
      }
    }
  };