/**
 * Created by haruna on 5/22/2015.
 */

(function($) {
    var VALIDATORS = {
        required: function(value) {
            return value;
        },
        unique: function(value, items, selectedIndex, fieldName) {
            for (var i = 0; i < items.length; i++) {
                if (i !== selectedIndex && items[i][fieldName] === value) {
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
            this._form = this.element.find('[data-part="form"]').get(0);
            this._rowTemplate = this._table.find('[data-part="grid-row"]').remove();
            this._items = [];
            this._on({
                'click [name=delete]': '_removeItem',
                'click [name=edit]': '_editItem',
                'click [name=add]': '_addItem',
                'click [name=update]': '_updateItem',
                'click [name=export]': '_print'
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
            var self = this;
            return function(event) {
                var field = $(event.target);
                var value = event.target.value;
                var error_element = field.parent().find("span");

                $.each(validators, function(validatorName) {
                    var success = VALIDATORS[validatorName](value, self._items, selectedIndex, fieldName) ;
                    if (success) {
                        error_element.removeClass("error").addClass("no_error");
                    } else {
                        error_element.removeClass("no_error").addClass("error");
                        return false;
                    }
                });

                var invalid = $('span.error').length > 0;
                this._form.add.disabled = invalid;
                if (selectedIndex != -1) {
                    this._form.update.disabled = invalid;
                }
            }
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

        _removeItem: function(event) {
            if (confirm('are you sure to delete?')) {
                var item = $(event.target).closest('tr');
                this._items.splice(item.index(), 1);
                item.remove();
                if (selectedIndex != -1) {
                    this._form.update.disabled = true;
                    selectedIndex = -1;
                }
            }
        },

        _editItem: function(event) {
            $('span').removeClass('error').addClass('no_error');

            var index = $(event.target).closest('tr').index();
            this._objToForm(this._items[index]);

            this._table.find('tbody tr').eq(selectedIndex).removeClass('selected');
            this._table.find('tbody tr').eq(index).addClass('selected');

            selectedIndex = index;
            console.log(this);
            console.log(this._form);
            this._form.update.disabled = false;
        },

        _addItem: function(event) {
            event.preventDefault();

            var obj = this._objFromForm();

            this._table.append(this._rowFor(obj));
            this._items.push(obj);
            this._clearFields();
        },

        _updateItem: function(event) {
            event.preventDefault();

            var obj = this._objFromForm();
            var selectedRow = this._table.find('tbody tr').eq(selectedIndex);
            selectedRow.replaceWith(this._rowFor(obj));
            this._items[selectedIndex] = obj;

            selectedIndex = -1;
            selectedRow.removeClass('selected');
            this._clearFields();
        },

        _clearFields: function() {
            $("input[type=text]").val('');
            $('span').removeClass('no_error').addClass('error');
            this._form.add.disabled = true;
            this._form.update.disabled = true;
        },

        _print: function() {
            console.log('***** Products List *****');
            console.log(JSON.stringify(this._items));
        },

        _objFromForm: function() {
            var form = this.element.find('[data-part="form"]').get(0);
            var product = 'name sku price'.split(' ').reduce(function(product, fieldName) {
                var field = form[fieldName];
                product[field.name] = field.value;

                return product;
            }, {});

            return product;
        },

        _objToForm: function(object) {
            var form = this.element.find('[data-part="form"]').get(0);
            for (var prop in object) {
                var field = form[prop];
                field.value = object[prop];
            }
        }
    });
}(jQuery));
