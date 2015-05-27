/**
 * Created by haruna on 5/22/2015.
 */

var items = [];

(function($) {
    $.widget("ui.test", {
        _init: function() {
            alert( 'something!' );
        },

        _create: function() {
          this._on({'click .delete':function(event){
              var index = $(event.target).closest('tr').index();
              $(event.target).closest('tr').remove();
              items.splice(index, 1);
          }});

            this._on({'click .edit':function(event){
                var index = $(event.target).closest('tr').index();
                this._trigger("edited", event, [items[index], index]);
            }});
        },

        add : function(object) {
            var line = '<tr>';
            $.each(object, function(key, value){
                line += '<td>' + value + '<td>';
            });

            line += '<td><button id="edit" class="edit">edit</button></td>';
            line += '<td><button id="delete" class="delete">delete</button></td>';
            line += '</tr>';

            this.element.append(line);
            items.push(object);
        },

        update : function(index, object) {
            var line = '<tr>';
            $.each(object, function(key, value){
                line += '<td>' + value + '<td>';
            });

            line += '<td><button id="edit" class="edit">edit</button></td>';
            line += '<td><button id="delete" class="delete">delete</button></td>';
            line += '</tr>';

            $("tbody tr:eq(" + index + ")").replaceWith(line);
            items.replace(index, object);
        },

        delete : function(index) {
            $("tbody tr:eq(" + index + ")").remove();
            items.splice(index, 1);
        }
    });
}(jQuery));
