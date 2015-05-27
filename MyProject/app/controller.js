var myApp = angular.module('myApp', []);

myApp.controller('ProductListCtrl', function() {
    this.products = [
        {Title: 'tomatoes',
        SKU: '123',
        Price: '3.32'},
        {Title: 'potatoes',
         SKU: '345',
         Price: '4.32'}
    ];

    this.remove = function(index) {
        if (confirm("Are you sure to delete?")) {
            this.products.splice(index, 1);
        }

        this.editing = false;
    };

    this.edit = function(index) {
        this.Title = this.products[index].Title;
        this.SKU = this.products[index].SKU;
        this.Price = this.products[index].Price;

        this.editing = true;
        this.currentIndex = index;
    };

    this.update = function(index) {
        if (this.validateFields(index) === true) {
            this.products[index].Title = this.Title;
            this.products[index].SKU = this.SKU;
            this.products[index].Price = this.Price;

            this.clearFields();
            this.editing = false;
        }

    };

    this.add = function() {
        if (this.validateFields() === true) {
            this.products.push({'Title': this.Title, 'SKU': this.SKU, 'Price': this.Price});
            this.clearFields();
        }
    };

    this.validateFields = function(index) {
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].SKU === this.SKU) {
                if (index !== i) {
                    alert("SKU needs to be unique!");
                    return false;
                }
            }
        }

        if (isNaN(this.Price)) {
            alert("Price needs to be number!");
            return false;
        }

        return true;
    };

    this.clearFields = function() {
        this.Title="";
        this.SKU="";
        this.Price="";
    }

    this.export = function() {
        console.log("***** Products List *****")
        angular.forEach(this.products, function(product) {
            console.log(product);
        })
    }
});