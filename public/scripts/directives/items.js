angular.module('pantryApp')

.directive('items', function() {
    return {
        templateUrl: 'templates/items.html',
        controller: 'mainCtrl',
        replace: true
    }
});