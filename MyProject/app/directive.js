/**
 * Created by htakahas on 6/9/2015.
 */

var app = angular.module("myApp");

app.directive('uniqueField', function() {
    return {
        restrict: 'A',
        require: 'ngModel',

        scope: {
            items: '=',
            index: '='
        },

        link: function(scope, elem, attr, ngModel) {
          //  better way : ngModel.$parsers.unshift(function(value) {  if I use it, no need to call $apply

            elem.on('change', function(event){
                for (var i = 0; i < scope.items.length; i++) {
                    if (i !== scope.selectedIdx && scope.items[i][ngModel.$name] === event.target.value) {
                        scope.$apply(function(){
                            ngModel.$setValidity('unique', false);
                        });
                        return;
                    }
                }
                scope.$apply(function(){
                    ngModel.$setValidity('unique', true);
                });
            });
        }
    };
});