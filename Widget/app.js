/**
 * Created by haruna on 5/22/2015.
 */
$(function() {
    var selectedIndex = -1;

    $('#products').listWidget();

    $('#add').click(function(){
        if (validateFields()) {
            $('#products').listWidget('add', {
                name: $('#productname').val(),
                sku: $('#sku').val(),
                price: $('#price').val() }
            );
            cleanFields();
        }
    });

    $('#update').click(function(){
        if (selectedIndex !== -1) {
            if (validateFields(selectedIndex)) {
                $('#products').listWidget('update', selectedIndex, {
                    name: $('#productname').val(),
                    sku: $('#sku').val(),
                    price: $('#price').val()
                });

                cleanFields();
                $(this).prop('disabled', true);
                selectedIndex = -1;
            }
        }
        else {
            alert('You need to select "edit" first!');
        }
    });

    $('#export').click(function() {
        $('#products').listWidget('print');
    });

    // todo not getting triggered for some reason
    $('#products').on( 'listWidgetedited', function( event, data, index ) {
        $('#productname').val(data.name);
        $('#sku').val(data.sku);
        $('#price').val(data.price);
        $(this).prop('disabled', false);
        selectedIndex = index;
    });

    function cleanFields() {
        $('#productname').val('');
        $('#sku').val('');
        $('#price').val('');
    }

    function validateFields(index) {
        if ($('#productname').val() === '' || $('#sku').val() === '' || $('#price').val() === '') {
            alert('all fields required!');
       //     $('.errorMsg').val('All fields required')
            return false;
        }

        if ($('#products').listWidget('exists', 'sku', $('#sku').val(), index)) {
            alert('SKU needs to be unique!');
            $('#sku').addClass('error');
            return false;
        }

        if (isNaN($('#price').val())) {
            alert('Price needs to be number!');
            return false;
        }

        return true;
    }

    $('input:text').change(function() {
        $(this).removeClass('error');
    })
});
