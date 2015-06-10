var myApp = angular.module('myApp');

myApp.controller('ProductListCtrl', function() {
    this.products = [
        {Name: 'tomatoes',
        SKU: '123',
        Price: '3.32'},
        {Name: 'potatoes',
         SKU: '345',
         Price: '4.32'}
    ];

    this.selectedIndex = -1;

    this.remove = function(index) {
        if (confirm("Are you sure to delete?")) {
            if (index === this.selectedIndex) {
                this.clearFields();
                this.selectedIndex = -1;
                this.editing = false;
            } else {
                if (index < this.selectedIndex) {
                    this.selectedIndex = this.selectedIndex - 1;
                }
            }
            this.products.splice(index, 1);
        }
    };

    this.edit = function(index) {
        this.Name = this.products[index].Name;
        this.SKU = this.products[index].SKU;
        this.Price = this.products[index].Price;

        this.editing = true;
        this.selectedIndex = index;
    };

    this.update = function(index) {
        this.products[index].Name = this.Name;
        this.products[index].SKU = this.SKU;
        this.products[index].Price = this.Price;

        this.clearFields();
        this.editing = false;
        this.selectedIndex = -1;
    };

    this.add = function() {
        this.products.push({'Name': this.Name, 'SKU': this.SKU, 'Price': this.Price});
        this.clearFields();
    };

    this.isUnique = function(key, value) {
        for (var i = 0; i < this.products.length; i++) {
            if (i !== this.selectedIndex && this.products[i][key] === value) {
                return false;
            }
        }

        return true;
    };

    this.clearFields = function() {
        this.Name="";
        this.SKU="";
        this.Price="";

    //    this.inputform.$setPristine();
    };

    this.export = function() {
        console.log("***** Products List *****")
        angular.forEach(this.products, function(product) {
            console.log(product);
        })
    }
});