'use strict';

var express = require('express');
var parser = require('body-parser');
var router = require('./api');

var port = 3000;

var app = express();

require('./database');

app.use('/', express.static('public'));
app.use(parser.urlencoded({ extended: true }));

app.use(parser.json());

var Item = require('./models/item');
var Recipe = require('./models/recipe');

app.use('/api', router);

var router = express.Router();

app.listen(port, () =>  console.log("Server running on " + port));
