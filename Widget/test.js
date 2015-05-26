/**
 * Created by haruna on 5/22/2015.
 */

var items = [];

(function($) {
    $.widget("ui.test", {
        _init: function() {
            alert( 'something!' );
        },

        add : function(object) {
            var line = '<tr>';
            $.each(object, function(key, value){
                line += '<td>' + value + '<td>';
            });

            line += '<td><button id="edit">edit</button></td>';
            line += '<td><button id="delete">delete</button></td>';
            line += '</tr>';

            this.element.append(line);
            items.push(object);
        },

        update : function(index, object) {
            var line = '<tr>';
            $.each(object, function(key, value){
                line += '<td>' + value + '<td>';
            });

            line += '<td><button id="edit">edit</button></td>';
            line += '<td><button id="delete">delete</button></td>';
            line += '</tr>';

            $("tbody tr:eq(" + index + ")").replaceWith(line);
            items.replace(index, object);
        },

        delete : function(index) {
            $("tbody tr:eq(" + index + ")").remove();
            items.remove(index);
        },

        get : function(index) {
            return items[index];
        }
    });
}(jQuery));
