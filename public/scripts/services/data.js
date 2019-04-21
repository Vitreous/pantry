'use strict'

angular.module('pantryApp')

.service('dataService', function($http, $q) {

    this.getItems = function(callback){
        $http.get('/api/items')
            .then(callback)
    };

    this.getRecipes = function(callback){
    $http.get('/api/recipes')
        .then(callback)
    };

    this.deleteItem = function(item) {
        console.log(item);
        console.log(item._id + " will be deleted!");
        var url = '/api/items/' + item._id;

        var data = JSON.stringify(item)
        console.log(data);
        $http.delete(url, data);
    };

    this.deleteRecipe = function(recipe) {
        console.log(recipe);
        console.log(recipe._id + " will be deleted!");
        var url = '/api/recipes/' + recipe._id;

        var data = JSON.stringify(recipe)

        console.log(data);
        $http.delete(url, data);
    };

    this.saveItem = function(item) {
        var queue = [];
        items.forEach(function(item) {
            var request;
            if(!item._id) {
                request = $http.post('/api/items/', item)
            };
            queue.push(request);
        });
        return $q.all(queue).then(function(results){
            console.log("I saved " + items.length + "items!");
        });
    };

});