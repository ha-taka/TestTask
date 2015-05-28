/**
 * Created by haruna on 5/22/2015.
 */
$(function() {
    var selectedIndex = -1;

    $( "#products" ).test();

    $("#add").click(function(){
        if (validateFields()) {
            $("#products").test("add", {name: $("#productname").val(), sku: $("#sku").val(), price: $("#price").val()});
            cleanFields();
        }
    });

    $("#update").click(function(){
        if (selectedIndex !== -1) {
            if (validateFields(selectedIndex)) {
                $("#products").test("update", selectedIndex, {
                    name: $("#productname").val(),
                    sku: $("#sku").val(),
                    price: $("#price").val()
                });

                cleanFields();
                selectedIndex = -1;
            }
        }
        else {
            alert("You need to select 'edit' first!");
        }
    });

    $("#export").click(function() {
        $("#products").test("print");
    });

    $( "#products" ).on( "testedited", function( event, data, index ) {
        $("#productname").val(data.name);
        $("#sku").val(data.sku);
        $("#price").val(data.price);
        selectedIndex = index;
    });

    function cleanFields() {
        $("#productname").val('');
        $("#sku").val('');
        $("#price").val('');
    }

    function validateFields(index) {
        if ($("#productname").val() === '' || $("#sku").val() === '' || $("#price").val() === '') {
            alert("all fields required!");
            return false;
        }

        if ($("#products").test("exists", 'sku', $("#sku").val(), index)) {
            alert("SKU needs to be unique!");
            return false;
        }

        if (isNaN($("#price").val())) {
            alert("Price needs to be number!");
            return false;
        }

        return true;
    }
});
