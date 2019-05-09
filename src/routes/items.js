const express = require('express');
const router = express.Router();
const Item = require('../models/item');

router.get('/', function(req, res) {
    Item.find({}, function(err, items){
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({items: items});
    })
});

router.post('/', function(req, res) {
    var item = req.body;
    Item.create(item, function(err, item){
        if(err) {
            return res.status(500).json({err: err.message});
        }
        res.render('items');
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



module.exports = router;
