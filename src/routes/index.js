const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require ('../config/auth')

router.get('/', (req, res) => res.render('welcome'))

//Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    name: req.user.name
  }))

router.get('/index', function(req, res) {
      res.render('index');
  });

router.get('/itemspage', function(req, res) {
      res.render('items');
  });

router.get('/recipespage', function(req, res) {
      res.render('recipes');
  });

router.get('/shoppinglist', function(req, res) {
      res.render('shoppinglist');
  });


module.exports = router;
