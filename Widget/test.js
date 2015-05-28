/**
 * Created by haruna on 5/22/2015.
 */

var items = [];

(function($) {
    $.widget("ui.test", {
        _init: function() {
        },

        _create: function() {
          this._on({'click .delete':function(event){
              if (confirm("are you sure to delete?")) {
                  var index = $(event.target).closest('tr').index();
                  $(event.target).closest('tr').remove();
                  items.splice(index, 1);
              }
          }});

            this._on({'click .edit':function(event){
                var index = $(event.target).closest('tr').index();
                this._trigger("edited", event, [items[index], index]);
            }});
        },

        add : function(object) {
            var line = '<tr>';
            $.each(object, function(key, value){
                line += '<td>' + value + '</td>';
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
                line += '<td>' + value + '</td>';
            });

            line += '<td><button id="edit" class="edit">edit</button></td>';
            line += '<td><button id="delete" class="delete">delete</button></td>';
            line += '</tr>';

            $("tbody tr:eq(" + index + ")").replaceWith(line);
            items[index] = object;
        },

        print: function() {
            console.log("***** Products List *****");
            for (var i = 0; i < items.length; i++) {
                console.log(items[i]);
            }
        },

        exists: function(key, value, index) {
            for (var i = 0; i < items.length; i++) {
                if (index !== i && items[i][key] === value) {
                    return true;
                }
            }

            return false;
        }
    });
}(jQuery));
