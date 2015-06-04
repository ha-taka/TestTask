/**
 * Created by haruna on 5/22/2015.
 */

(function($) {
    var VALIDATORS = {
        required: function(value) {
            return !value;
        },
        unique: function(value, items, fieldName) {
            for (var i = 0; i < items.length; i++) {
                if (items[i][fieldName] === value) {
                    return false;
                }
            }

            return true;
        },
        number: function(value) {
            return !isNaN(value);
        }
    };

    $.widget('ui.listWidget', {
        _init: function () {
        },

        _create: function () {
            this._table = this.element.find('[data-part="grid"]');
            this._form = this.element.find('[data-part="form"]');
            this._rowTemplate = this._table.find('[data-part="grid-row"]').remove();
            this._items = [];
            this._on({
                'click [name=delete]': 'removeItem',
                'click [name=edit]': 'editItem',
                'click [name=add]': 'addItem',
                'click [name=update]': 'updateItem',
                'click [name=export]': 'print'
            });
            selectedIndex = -1;
        },

        setValidators: function(validators) {
            for (var fieldName in validators) {
                var fieldValidators = validators[fieldName];
                this._on(this._form[fieldName], { change: this._handleChangeEvent(fieldName, fieldValidators) });
            }
        },

        _handleChangeEvent: function(fieldName, validators) {
            return function(event) {
                var error_element = event.target.parent().span;
                $.each(validators, function(validatorName) {
                    VALIDATORS[validatorName](value, this._items, fieldName) ? error_element.removeClass("error").addClass("no_error"):error_element.removeClass("no_error").addClass("error");
                })
            };
        },

        _rowFor: function(item) {
            var itemNode = this._rowTemplate.clone();

            itemNode.each(function(i, cellNode) {
                var cell = $(cellNode);
                var text = cell.html().replace(/\{\{\s*(\w+)\s*\}\}/g, function(match, capture) {
                    return item[capture];
                });

                cell.html(text);
            });

            return itemNode;
        },

        removeItem: function(event) {
            if (confirm('are you sure to delete?')) {
                var item = $(event.target).closest('tr');
                this._items.splice(item.index(), 1);
                item.remove();
            }
        },

        editItem: function(event) {
            var index = $(event.target).closest('tr').index();
            this.objToForm(this._items[index]);
            selectedIndex = index;
            this._form.update.disabled = true;
        },

        addItem: function(event) {
            event.preventDefault();

            var obj = this.objFromForm();

            this._table.append(this._rowFor(obj));
            this._items.push(obj);
        },

        updateItem: function(event) {
            event.preventDefault();

            var obj = this.objFromForm();

            $("tbody tr:eq(" + selectedIndex + ")").replaceWith(this._rowFor(obj));
//            this._table['tbody tr:eq(' + selectedIndex + ')'].replaceWith(this._rowFor(obj));
            this._items[selectedIndex] = obj;
        },

        print: function() {
            console.log('***** Products List *****');
            console.log(JSON.stringify(this._items));
        },

        objFromForm: function() {
            var form = this.element.find('[data-part="form"]').get(0);
            var product = 'name sku price'.split(' ').reduce(function(product, fieldName) {
                var field = form[fieldName];
                product[field.name] = field.value;

                return product;
            }, {});

            return product;
        },

        objToForm: function(object) {
            var form = this.element.find('[data-part="form"]').get(0);
            for (var prop in object) {
                var field = form[prop];
                field.value = object[prop];
            }

        }
    });
}(jQuery));
