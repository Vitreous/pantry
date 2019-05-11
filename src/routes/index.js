const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require ('../config/auth')

router.get('/', (req, res) => res.render('welcome'))

//Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    name: req.user.name,
    id: req.user._id
  }));

router.get('/itemspage', ensureAuthenticated, (req, res) =>
  res.render('items', {
    name: req.user.name,
    id: req.user._id
  }));

router.get('/recipespage', ensureAuthenticated, (req, res) =>
  res.render('recipes', {
    name: req.user.name,
    id: req.user._id
  }));

router.get('/shoppinglist', (req, res) => 
  res.render('shoppinglist', {
    name: req.user.name,
    id: req.user._id
  }));


module.exports = router;
