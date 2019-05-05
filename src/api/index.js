'use strict';

var express = require('express');
var Item = require('../models/item');
var Recipe = require('../models/recipe');
var User = require('../models/user');
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

router.get('/', function(req, res) {
    //res.sendFile('C:\\Users\\Donal\\git\\Pantry\\public\\index.html');
    //res.sendFile('C:\\Users\\Donal\\git\\Pantry\\public\\userprofile.html');
    //res.render('index');
    res.render('login');
});

router.get('/index', function(req, res) {
    //res.sendFile('C:\\Users\\Donal\\git\\Pantry\\public\\index.html');
    //res.sendFile('C:\\Users\\Donal\\git\\Pantry\\public\\userprofile.html');
    //res.render('index');
    res.render('login');
});

router.get('/ejstest', function(req, res) {
    //res.sendFile('C:\\Users\\Donal\\git\\Pantry\\public\\index.html');
    res.render('index');
});

router.get('/login', function(req, res) {
    //res.sendFile('C:\\Users\\Donal\\git\\Pantry\\public\\login.html');
    res.render('login');
});

router.get('/itemspage', function(req, res) {
    //res.sendFile('C:\\Users\\Donal\\git\\Pantry\\public\\items.html');

    var cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.getSession(function(err, session) {
        if (err) {
            alert(err);
            return;
        }
        console.log('session validity: ' + session.isValid());

      });
      var user = {
        name : cognitoUser.getUsername()
      }
    }

    res.render('items', {user:user});
});

router.get('/recipespage', function(req, res) {
    //res.sendFile('C:\\Users\\Donal\\git\\Pantry\\public\\recipes.html');
    res.render('recipes');
});

router.get('/viewShoppingList', function(req, res) {
    //res.sendFile('C:\\Users\\Donal\\git\\Pantry\\public\\shoppinglist.html');
    res.render('shoppinglist');
});

router.get('/userprofile', function(req, res) {
    //res.sendFile('C:\\Users\\Donal\\git\\Pantry\\public\\userprofile.html');
    res.render('userprofile');
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

router.get('/recipe/:id', (req, res) => {
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
        res.render('items');
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
        res.render('recipes');
    })
});

router.post('/login', function(req,res){

  function Login() {
      var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
          Username : req.body.username,
          Password : req.body.password,
      });

      var userData = {
          Username : req.body.username,
          Pool : userPool
        }

      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
              //console.log('access token + ' + result.getAccessToken().getJwtToken());
              //console.log('id token + ' + result.getIdToken().getJwtToken());
              //console.log('refresh token + ' + result.getRefreshToken().getToken());

              User.find({username: cognitoUser.getUsername()}, function(err, res){
                  if(err) {
                      return res.status(500).json({err: err.message});
                  }
                  console.log(res._id);
                  return res._id;
              });
          },
          onFailure: function(err) {
              console.log(err);
          }
      });

      var userinfo = User.find({username: cognitoUser.getUsername()}, function(err, res){
          if(err) {
              return res.status(500).json({err: err.message});
          }
          console.log(res._id);
          return res._id;
      });

      console.log("Temps +" + userinfo);

      var user = {
        name : cognitoUser.getUsername(),
        id : res._id
      }
      return user;
  }
  var userDetails = Login();
  //console.log(username);
  res.render('index', {user:userDetails});
});

router.post('/register', (req, res) =>{
		var suppliedusername = req.body.username;
		var suppliedpassword = req.body.password;
		var suppliedemail = req.body.email;

	  function RegisterUser(username, password, email){
	      var attributeList = [];
	      //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"preferred_username",Value:"jay"}));
	      attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:email}));
        //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"custom:userID",Value:'Cookie Dough'}));

	      userPool.signUp(username, password, attributeList, null, function(err, result){
	          if (err) {
	              console.log(err);
	              return;
	          }
	          var cognitoUser = result.user;
	          console.log('user name is ' + cognitoUser.getUsername());
						var newUser = cognitoUser.getUsername();

            var user = {
              username : newUser
            };

            console.log(user);

            User.create(user, function(err, res){
                if(err) {
                    return res.status(500).json({err: err.message});
                }
                console.log(res);
            });
	      });
	  };

		RegisterUser(suppliedusername, suppliedpassword, suppliedemail);
    res.render('recipes')
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
        res.render('items');
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
