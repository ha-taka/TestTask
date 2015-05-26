/**
 * Created by haruna on 5/22/2015.
 */
$(function() {
    var selectedIndex = -1;

    $( "#products" ).test();

    $("#add").click(function(){
        $( "#products" ).test("add", {name:$( "#productname" ).val(), sku:$( "#sku" ).val(), price:$( "#price" ).val()});
    });

    $("#update").click(function(){
        if (selectedIndex !== -1) {
            $("#products").test("update", selectedIndex, {
                name: $("#productname").val(),
                sku: $("#sku").val(),
                price: $("#price").val()
            });
        }
    });

    $( "#products" ).on( "click", "#delete", function() {
        var index = $(this).closest('tr')[0].sectionRowIndex;
        $( "#products" ).test("delete", index);
    });

    $( "#products" ).on( "click", "#edit", function() {
        selectedIndex = $(this).closest('tr')[0].sectionRowIndex;
        var product = $( "#products" ).test("get", selectedIndex);
        $("#productname").val(product.name);
        $("#sku").val(product.sku);
        $("#price").val(product.price);
    });
});
