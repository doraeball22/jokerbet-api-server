'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleModel = new Schema({
  title: { type: String, required: true},
  bodyUrl: { type: String, required: true },
  imageUrl: { type: String },
  author: { type: String, required: true }
});

module.exports = mongoose.model('Article', articleModel);
