'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
   username: String
});

var model = mongoose.model('User', userSchema);

module.exports = model;
