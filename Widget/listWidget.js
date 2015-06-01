/**
 * Created by haruna on 5/22/2015.
 */

(function($) {
    $.widget('ui.listWidget', {
        _init: function() {
        },

    _create: function() {
          this._on({
              'click .delete': 'removeItem',
              'click .edit': 'editItem'
          });
          items = [];
        },

        removeItem: function(event) {
            if (confirm('are you sure to delete?')) {
                var item = $(event.target).closest('tr');
                item.remove();
                items.splice(item.index(), 1);
            }
        },

        editItem: function(event) {
            var index = $(event.target).closest('tr').index();
            this._trigger('edited', event, [items[index], index]);
        },

        add: function(object) {
            var line = '<tr>';
            $.each(object, function(key, value){
                line += '<td>' + value + '</td>';
            });

            line += '<td><button class="edit">edit</button></td>';
            line += '<td><button class="delete">delete</button></td>';
            line += '</tr>';

            this.element.append(line);
            items.push(object);
        },

        update: function(index, object) {
            var line = '<tr>';
            $.each(object, function(key, value){
                line += '<td>' + value + '</td>';
            });

            line += '<td><button class="edit">edit</button></td>';
            line += '<td><button class="delete">delete</button></td>';
            line += '</tr>';

            $('tbody tr:eq(' + index + ')').replaceWith(line);
            items[index] = object;
        },
// todo        global search. You need to find elements relative to your this.element

        print: function() {
            console.log('***** Products List *****');
            console.log(JSON.stringify(items));
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
