'use strict';

var express = require('express');
var Item = require('../models/item');
var Recipe = require('../models/recipe');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');


const poolData = {
UserPoolId : "us-east-2_BFtobrTqw", // Your user pool id here
ClientId : "56i87h117o4uoinpalnhue2krp" // Your client id here
};

const pool_region = 'us-east2';
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

var router = express.Router();

console.log("API route page loaded");

router.get('/index', function(req, res) {
    res.sendFile('C:\\Users\\Donal\\git\\Pantry\\public\\index.html');
});

router.get('/login', function(req, res) {
    res.sendFile('C:\\Users\\Donal\\git\\Pantry\\public\\login.html');
});

router.get('/itemspage', function(req, res) {
    res.sendFile('C:\\Users\\Donal\\git\\Pantry\\public\\items.html');
});

router.get('/recipespage', function(req, res) {
    res.sendFile('C:\\Users\\Donal\\git\\Pantry\\public\\recipes.html');
});

router.get('/viewShoppingList', function(req, res) {
    res.sendFile('C:\\Users\\Donal\\git\\Pantry\\public\\shoppinglist.html');
});

router.get('/userprofile', function(req, res) {
    res.sendFile('C:\\Users\\Donal\\git\\Pantry\\public\\userprofile.html');
});

router.get('/items', function(req, res) {
    Item.find({}, function(err, items){
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({items: items});
    })
});

router.get('/recipes', (req, res) => {
    Recipe.find({}, function(err, recipes){
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({recipes: recipes});
    })
});

router.get('/recipes/:id', (req, res) => {
    var id = req.params.id
    Recipe.findById(id, (err, recipe) =>{
        if(err) {
            return res.status(500).json({err: err.message});
        }
        console.log("Recipe Found " + recipe);
        res.json({recipe: recipe, message: 'Item Found'});
    })
});

router.post('/items', function(req, res) {
    var item = req.body;
    Item.create(item, function(err, item){
        if(err) {
            return res.status(500).json({err: err.message});
        }
        res.sendFile('C:\\Users\\Donal\\Pantry\\public\\items.html');
    })
});

router.post('/recipes', function(req, res) {
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
    Recipe.create(recipe, function(err, item){
        if(err) {
            return res.status(500).json({err: err.message});
        }
        res.sendFile('C:\\Users\\Donal\\Pantry\\public\\recipes.html');
    })
});

router.post('/login', function(req,res){

  console.log(req.body);

  function Login() {
      // https://medium.com/@prasadjay/amazon-cognito-user-pools-in-nodejs-as-fast-as-possible-22d586c5c8ec

      console.log("Hello From Login");

      var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
          Username : req.body.username,
          Password : req.body.password,
      });

      console.log(authenticationDetails);

      var userData = {
          Username : req.body.username,
          Pool : userPool
        }

      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
              console.log('access token + ' + result.getAccessToken().getJwtToken());
              console.log('id token + ' + result.getIdToken().getJwtToken());
              console.log('refresh token + ' + result.getRefreshToken().getToken());
          },
          onFailure: function(err) {
              console.log(err);
          },
      });
  }
  Login();
  res.sendFile('C:\\Users\\Donal\\Pantry\\public\\index.html');
});

router.post('/register', (req, res) =>{

		console.log(req.body.username);

		var suppliedusername = req.body.username;
		var suppliedpassword = req.body.password;
		var suppliedemail = req.body.email;

	  function RegisterUser(username, password, email){
	      var attributeList = [];
	      //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value:"Prasad Jayashanka"}));
	      //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"preferred_username",Value:"jay"}));
	      //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"gender",Value:"male"}));
	      //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"birthdate",Value:"1991-06-21"}));
	      //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"address",Value:"CMB"}));
	      attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:email}));
	      //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"phone_number",Value:"+5412614324321"}));
	      //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"custom:scope",Value:"admin"}));

	      userPool.signUp(username, password, attributeList, null, function(err, result){
	          if (err) {
	              console.log(err);
	              return;
	          }
	          var cognitoUser = result.user;
						console.log(cognitoUser);
	          console.log('user name is ' + cognitoUser.getUsername());
						var newUser = cognitoUser.getUsername();
						return newUser
	      });
	  };

		RegisterUser(suppliedusername, suppliedpassword, suppliedemail);

		res.sendFile('C:\\Users\\Donal\\Pantry\\public\\index.html');

});


router.put('/items/:id', function(req, res) {
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

router.delete('/items/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    Item.findByIdAndRemove(id, function(err, item){
        if(err) {
            return res.status(500).json({err: err.message});
        }
        console.log("Item Deleted");
        res.sendFile('C:\\Users\\Donal\\Pantry\\public\\items.html');
    })
});

router.delete('/recipes/:id', () => {
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
