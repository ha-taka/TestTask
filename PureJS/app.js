/**
 * Created by htakahas on 5/21/2015.
 */

$(document).ready(function() {
    var table = $('#example').DataTable();
    var counter = 1;

    $('#addRow').on('click', function () {
         table.row.add( [
            counter,
            counter + 1,
            counter + 2
        ] ).draw();

/*        t.row.add( [
            $('#title').val(),
            $('#sku').val(),
            $('#price').val()
        ] ).draw();*/

        counter++;
    } );


    $('#example tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );

    $('#remove').click( function () {
        table.row('.selected').remove().draw( false /*stay in the current page*/ );
    } );
} );