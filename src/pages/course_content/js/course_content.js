$(function() {
	//初始化小星星
    setStar();

    //设置相关变量
    var basename = $('[base-name]').attr('base-name'), //视频命名空间
        curname = localStorage.getItem(basename) || "1-1",
        $curitem = $("[video-src=" + curname + "]").addClass('active'),
        $switch_warp = $(".content-wrap"),
        video = videojs('course_video', {
            poster: basename+curname+".jpg",
            sources: [{
                src: putVideoPath(curname),
                type: 'video/mp4'
            }]
        }),//初始化视频
        client_width = document.body.clientWidth; 

    //切换tab项设置
    $('.content-nav-item').click(function(event) {
    	if($(this).hasClass('active'))return;
    	//获取关联类名
    	var index = $(this).index();
        var view_height = $switch_warp.find('.switch-item').eq(index).height();
        
    	$switch_warp.height(view_height);
    	//添加active类
    	$(this).addClass('active').siblings('.active').removeClass('active');
    	$switch_warp.css('transform', 'translateX('+(index*-client_width)+'px)');
    	localStorage.setItem(basename+'nav',index);

        setTimeout("desc_scroll.refresh()",500);
    });

    //切换video相关设置
    $('.video-group').on('click', ".group-title", function() {
        var $group_item = $(this).parent();
        $group_item.toggleClass('active');
        $group_item.find(".video-list").slideToggle(function(){
            $(this).parents(".switch-item:eq(0)").height($(this).parents(".video-group:eq(0)").height());
            if($('.content-nav-item:eq(1)').hasClass('active')){
                switchHeightChange($(this).parents(".video-group:eq(0)").height());
                setTimeout("desc_scroll.refresh()",500);
            }
        });
    });


    $('.video-group').on('click', ".video-item", function() {
        //获取视频路径
        var videoname = $(this).attr('video-src');
        var item_src = putVideoPath(videoname);
        //本地记录播放视频
        localStorage.setItem(basename,videoname);
        //添加激活类
        $curitem.removeClass('active');
        $curitem = $(this).addClass('active');
        //视频重载
        video.src(item_src);
        video.load(item_src);
        video.play();
    });
    //滚动相关设置
    window.desc_scroll = new BScroll(document.getElementById('desc-scroll'),{
        click: true
    })

    $(".group-title:eq(" + (curname.match(/\d+/)[0]-1) + ")").click();
    $('.content-nav-item').eq(localStorage.getItem(basename+'nav')||0).click();

    
    //滚动视口高度初始化
    var scroll_height = document.body.clientHeight-$('.topview').height()-$('.content-nav').height();
    $("#desc-scroll").height(scroll_height);
    
    desc_scroll.refresh();

    function switchHeightChange(height){
        $switch_warp.height(height)
    }

    function putVideoPath(name) {
        return basename + name + '.mp4'
    }


})
