'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const couponModel = new Schema({
  couponCode: { type: String, required: true}
});

module.exports = mongoose.model('Coupon', couponModel);
