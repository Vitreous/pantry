const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

router.get('/', (req, res) => {
    Recipe.find({owner: req.user.id}, function(err, recipes){
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({recipes: recipes});
    })
});

router.get('/:id', (req, res) => {
    var id = req.params.id
    Recipe.findById(id, (err, recipe) =>{
        if(err) {
            return res.status(500).json({err: err.message});
        }
        res.json({recipe: recipe, message: 'Item Found'});
    })
});

router.post('/', (req, res) => {
    var recipe = req.body;
    recipe.ingredients = recipe.ingredients.split(" ")
    for (var i = 0;i < recipe.ingredients.length; i++) {
      if (recipe.ingredients[i].length == 0) {
        recipe.ingredients.splice(i);
      };
    };
    recipe.method = recipe.method.split("-")
    for (var i = 0;i < recipe.method.length; i++) {
      if (recipe.method[i].length == 0) {
        recipe.method.splice(i);
      };
    };
    Recipe.create(recipe, (err, item) => {
        if(err) {
            return res.status(500).json({err: err.message});
        }
        res.render('recipes', {
          name: req.user.name,
          id: req.user._id
        })
    })
});

router.delete('/:id', () => {
    var id = req.params.id;
    console.log(id);
    Recipe.findByIdAndRemove(id, (err, recipe) =>{
        if(err) {
            return res.status(500).json({err: err.message});
        }
        console.log("Recipe Deleted " + recipe);
    })
});



module.exports = router;
