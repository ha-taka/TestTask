/**
 * Created by haruna on 5/22/2015.
 */

(function($) {
    var VALIDATORS = {
        required: function(value) {
            return value;
        },
        unique: function(value, options) {
            var items = options['items'];
            var selectedIndex = options['selectedIndex'];
            var fieldName = options['fieldName'];

            for (var i = 0; i < items.length; i++) {
                if (i !== selectedIndex && items[i][fieldName] === value) {
                    return false;
                }
            }

            return true;
        },
        posNumber: function(value) {
            return !isNaN(value) && value > 0;
        }
    };

    var FORMATTERS = {
        currency: function(value) {
            return '$' + value;
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
            this._formats = {};
            this._on({
                'click [name=delete]': '_removeItem',
                'click [name=edit]': '_editItem',
                'click [name=save]': '_saveItem',
                'click [name=export]': '_print'
            });
            selectedIndex = -1;
        },

        setValidators: function(validators) {
            for (var fieldName in validators) {
                var fieldValidators = validators[fieldName];
                this._on(this._form[fieldName], { change: this._handleChangeEvent(fieldName, fieldValidators) });
            }

            console.log(this.element.find('span.error').length);
        },

        setFormats: function(formats) {
            for (var fieldName in formats) {
                this._formats[fieldName] = formats[fieldName];
            }
        },

        _handleChangeEvent: function(fieldName, validators) {
            var self = this;
            return function(event) {
                var field = $(event.target);
                var value = event.target.value;
                var errorElem = field.parent().find("span");

                $.each(validators, function(validatorName) {
                    var options = {};
                    if (validatorName === 'unique') {
                        options['items'] = self._items;
                        options['selectedIndex'] = selectedIndex;
                        options['fieldName'] = fieldName;
                    }

                    var success = VALIDATORS[validatorName](value, options) ;
                    errorElem.removeClass("init").removeClass(success? "error":"no_error").addClass(success? "no_error":"error");
                    if (!success) {
                        return false;
                    }
                });

                console.log(this.element.find('span.error').length);
                this._form.save.disabled = this.element.find('span.error').length > 0;
            }
        },

        _rowFor: function(item) {
            var self = this;
            var itemNode = this._rowTemplate.clone();

            itemNode.each(function(i, cellNode) {
                var cell = $(cellNode);
                var text = cell.html().replace(/\{\{\s*(\w+)\s*\}\}/g, function(match, capture) {
                    var formats = self._formats[capture];
                    if (formats) {
                        var value = item[capture];
                        $.each(formats, function (formatType) {
                            value = FORMATTERS[formatType](value);
                        });

                        return value;
                    }

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
                if (item.index() == selectedIndex) {
                    this._clearFields();
                    selectedIndex = -1;
                }
                item.remove();
            }
        },

        _editItem: function(event) {
            this.element.find('span').removeClass('error').addClass('no_error');

            var index = $(event.target).closest('tr').index();
            this._objToForm(this._items[index]);

            this._table.find('tbody tr').eq(selectedIndex).removeClass('selected');
            this._table.find('tbody tr').eq(index).addClass('selected');

            selectedIndex = index;
            this._form.save.disabled = false;
        },

        _saveItem: function(event) {
            event.preventDefault();
            var obj = this._objFromForm();
            if (selectedIndex === -1) {
                this._table.append(this._rowFor(obj));
                this._items.push(obj);
            } else {
                var selectedRow = this._table.find('tbody tr').eq(selectedIndex);
                selectedRow.replaceWith(this._rowFor(obj));
                this._items[selectedIndex] = obj;

                selectedIndex = -1;
                selectedRow.removeClass('selected');
            }

            this._clearFields();
        },

        _clearFields: function() {
            this.element.find('input[type=text]').val('');
            this.element.find('span').addClass('error init');
            this._form.save.disabled = true;
        },

        _print: function() {
            console.log('***** Products List *****');
            console.log(JSON.stringify(this._items));
        },

        _objFromForm: function() {
            var self = this;
            var product = 'name sku price'.split(' ').reduce(function(product, fieldName) {
                var field = self._form[fieldName];
                product[field.name] = field.value;

                return product;
            }, {});

            return product;
        },

        _objToForm: function(object) {
            for (var prop in object) {
                var field = this._form[prop];
                field.value = object[prop];
            }
        }
    });
}(jQuery));
