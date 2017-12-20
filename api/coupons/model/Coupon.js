'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const couponModel = new Schema({
  couponCode: { type: String, required: true},
  amount: { type: Number, default: 1},
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Coupon', couponModel);
