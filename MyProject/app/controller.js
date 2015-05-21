var myApp = angular.module('myApp', []);

myApp.controller('ProductListCtrl', function($scope) {
    $scope.products = [
        {'Title': 'tomatoes',
        'SKU': '123',
        'Price': '$3.32'},
        {'Title': 'potatoes',
         'SKU': '345',
         'Price': '$4.32'}
    ];

    $scope.remove = function(index) {
        if (confirm("Are you sure to delete?")) {
            $scope.products.splice(index, 1);
        }
    };

    $scope.edit = function(index) {
        $scope.Title = $scope.products[index].Title;
        $scope.SKU = $scope.products[index].SKU;
        $scope.Price = $scope.products[index].Price;

        $scope.editing = true;
        $scope.currentIndex = index;
    };

    $scope.update = function(index) {
// ToDo: check if SKU is unique, check if Price is a valid number
        $scope.products[index].Title = $scope.Title;
        $scope.products[index].SKU = $scope.SKU;
        $scope.products[index].Price = $scope.Price;

        clearFields();
        $scope.editing = false;
    };

    $scope.add = function() {
// ToDo: check if SKU is unique, check if Price is a valid number
        $scope.products.push({'Title':$scope.Title, 'SKU':$scope.SKU, 'Price':'$' + $scope.Price});
        clearFields();
    };

    $scope.export= function() {
        $filter('json')($scope.products);

    };

    function clearFields() {
        $scope.Title="";
        $scope.SKU="";
        $scope.Price="";
    }
});