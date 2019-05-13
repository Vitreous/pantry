'use strict';

const express = require('express');
const parser = require('body-parser');
//var router = require('./api');
const expressLayouts = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

require('./database');



const app = express();

// Passport config
require('./config/passport')(passport);

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./public/views");

// BodyParer
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(session({
  secret: 'DT249',
  resave: true,
  saveUninitialized: true,
}));

// Passport

app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Globals
app.use((req, res, next) => {
  res.locals.succes_msg = req.flash('succes_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});



//app.set("view options", { layout: false } );

// Routes

//app.use('/', express.static('public'));
//app.use(parser.urlencoded({ extended: true }));

//app.use(parser.json());

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/items', require('./routes/items'));
app.use('/recipes', require('./routes/recipes'));

var port = 3000;
app.listen(port, () =>  console.log("Server running on " + port));
