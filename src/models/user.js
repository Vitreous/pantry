'use strict';

const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    date: {
      type: String,
      default: Date.now
    }
});

var model = mongoose.model('User', userSchema);

module.exports = model;
