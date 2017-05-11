var nav_index = 1;

$(function(){
	$('#scroll-warp').height(document.body.clientHeight-$('#nav').height());
	new BScroll(document.getElementById('scroll-warp'), {
        click: true
    })
})