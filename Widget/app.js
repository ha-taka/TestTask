/**
 * Created by haruna on 5/22/2015.
 */
$(function() {
    var selectedIndex = -1;

    $( "#products" ).test();

    $("#add").click(function(){
        $( "#products" ).test("add", {name:$( "#productname" ).val(), sku:$( "#sku" ).val(), price:$( "#price" ).val()});
        cleanFields();
    });

    $("#update").click(function(){
        if (selectedIndex !== -1) {
            $("#products").test("update", selectedIndex, {
                name: $("#productname").val(),
                sku: $("#sku").val(),
                price: $("#price").val()
            });

            cleanFields();
        }
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
});
