/**
 * Created by leeeeeee on 2017/4/11.
 */

$(function () {
    simpleDialog($('#gold-dialog'));

    $('.record').on('click', function () {
        $('#gold-dialog').show();
    })
})