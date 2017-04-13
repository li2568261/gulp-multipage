var musicFile = document.getElementById('media');
$('.icon-music').on('click',function(){

    $(this).toggleClass('play');
    if($(this).hasClass('play'))
        musicFile.play();
    else musicFile.pause();
})
musicFile.play();



$(function(){
    function tableresize(){
        var calendarTableWidth = $('.calendar-table').width();
        $('.calendar-table tr').height(calendarTableWidth/7);
    }
    tableresize();
    $(window).resize(tableresize)

    var todayNum = $('.today').html();
    $('.icon-recordbtn').click(function () {
        /*$.ajax({
            type:'',
            data:'',
            dataType:'',
            success:function(){

            },
            error:function(){
                
            }
        })*/
        //放到success里
        $(this).html('已打卡').addClass('has-record');
        $('.today').addClass('active').html('<span class="mark">'+todayNum+'</span>');
        $('#gold-dialog').show();
        $(this).off('click');
        //当次打卡获得的积分
        /*$('.get-gold .gold').html()*/
    })
    simpleDialog($('#gold-dialog'));

    if(isFirst()){
        $('#wait-animation .wait-img').on('load',function(){
            $('#wait-animation').show();
            setTimeout(function(){
                $('#wait-animation').remove();
            },2900);
        })
    }
});

