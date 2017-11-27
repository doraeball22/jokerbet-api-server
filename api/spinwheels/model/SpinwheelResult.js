'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Coupon = new Schema({
    _id: String,
    couponCode: String
});

const Result = new Schema({
    message: String,
    prize: String,
    score: Number,
    win: Boolean
});

const spinwheelResultModel = new Schema({
    user: String,
    coupon: Coupon,
    result: Result,
    isProvidePrize: { type: Boolean, default: false }
});

module.exports = mongoose.model('SpinwheelResult', spinwheelResultModel);
