const express = require('express');
const router = express.Router();
const Item = require('../models/item');

router.get('/', function(req, res) {
    console.log(req);
    Item.find({owner: req.user.id}, function(err, items){
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({items: items});
    })
});

router.post('/test', function(req, res) {
    Item.find({owner: req.body.user.id}, function(err, items){
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({items: items});
    })
});


router.get('/:id', function(req, res) {
  Item.findById(req.params.id, (err, item) =>{
      if(err) {
          return res.status(500).json({err: err.message});
      }
      res.json({item: item});
  });
});

router.post('/', function(req, res) {
    var item = req.body;
    Item.create(item, function(err, item){
        if(err) {
            return res.status(500).json({err: err.message});
        }
        res.render('items', {
          name: req.user.name,
          id: req.user._id
        })
    })
});


router.put('/:id', function(req, res) {
    var id = req.params.id;
    var item = req.body;
    if(item && item._id !== id){
        return res.status(500).json({err: 'IDs dont match'});
    }
    Item.findByIdAndUpdate(id, item, {new:true}, function(err, item){
        if(err) {
            return res.status(500).json({err: err.message});
        }
        res.json({item: item, message: 'Item modified'});
    })
});

router.delete('/:id', (req, res) => {
    var id = req.params.id;
    Item.findByIdAndRemove(id, (err, recipe) =>{
        if(err) {
            return res.status(500).json({err: err.message});
        }
    })
    res.render('items', {
      name: req.user.name,
      id: req.user._id
    })
});


module.exports = router;
