'use strict';

var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
   name: String,
   quantity: {type: Number, default: 1},
   owner: String
});

var model = mongoose.model('Item', itemSchema);

module.exports = model;
