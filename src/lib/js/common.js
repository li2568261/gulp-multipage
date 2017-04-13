
$('body').attr('data-dpr', devicePixelRatio);

function isFirst(){
    var first = sessionStorage.getItem("first");
    if(!first)
        sessionStorage.setItem("first", true);
    return first==null;
}

function simpleDialog($dialog){
    $dialog.find('.dialog-warp').on('click',function(e){
        e.stopPropagation();
    })
    $dialog.on('click',function(){
        $(this).hide();
    })
}

