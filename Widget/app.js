/**
 * Created by haruna on 5/22/2015.
 */

$(function() {
    $('#products').listWidget();

    $('#products').listWidget('setValidators',  {
        'name': { required: true },
        'sku': { required: true, unique: true },
        'price': { required: true, posNumber: true }
    });

    $('#products').listWidget('setFormats', {
        'price': { currency:true }
    })
});
