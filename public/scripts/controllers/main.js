'use strict'

angular.module('pantryApp')

.controller('mainCtrl', function($scope, $http, dataService) {

    $scope.addItem = function () {
        var item = {name: "Add a new item to your inventory"};
        $scope.items.unshift(item);
        console.log("Adding item");
    };

    $scope.SendData = function () {

        var temp = {name: $scope.itemname, value: "this value"};
        //$scope.items.unshift(temp);

        // https://stackoverflow.com/questions/24545072/angularjs-http-post-send-data-as-json
        var data = JSON.stringify({
            name: $scope.itemname,
            quantity: $scope.itemquantity
        });

        $http.post('/api/items', data)
            .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data;
                $scope.items.unshift(data);
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });

        $scope.itemname = '';
    };

    $scope.canCook = function (recipe) {

        var y;
        var tempList = [];
        for(y in $scope.items) {
            tempList.push($scope.items[y].name);
        };
        var x;
        var requiredItems = [];
        for(x in recipe.ingredients) {
            if (tempList.indexOf(recipe.ingredients[x]) < 0) {
                requiredItems.push(recipe.ingredients[x]);
            };
        };
        if (requiredItems.length == 0) {
            alert("You can cook " + recipe.name)
        } else {
        alert("You dont have enough ingredients to make " + recipe.name + ". You require " + requiredItems);
        };

    };

    dataService.getItems(function(res) {
        var items = res.data.items;
        $scope.items = items;
    });

    dataService.getRecipes(function(res) {
        var recipes = res.data.recipes;
        $scope.recipes = recipes;
    });

    //Index is a provided reference which comes from the loop in ng-repeat.
    //Splice method to remove data.
    $scope.deleteItem = function(item, $index) {
        $scope.items.splice($index, 1);
        dataService.deleteItem(item);
        console.log("Delete Clicked!");
    };

    $scope.deleteRecipe = function(recipe, $index) {
        console.log($index);
        //$scope.items.splice($index, 1);
        dataService.deleteRecipe(recipe);
        console.log("Delete Recipe Clicked!");
    };

    $scope.saveItem = function() {
        var filteredItems = $scope.items.filter(function(item) {
            if(item.edited) {
                return item
            };
        })
        dataService.saveItem(filteredItems)
            .finally($scope.resetItemState());
    };
});