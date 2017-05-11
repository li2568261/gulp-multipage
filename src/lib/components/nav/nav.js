$(function() {
    var navbar_item = $('.navbar-item');
    navbar_item.eq(nav_index).find(".navbar-link").addClass("active");
    //滑动导航配置
    var nav_width = 0;
    navbar_item.each(function() {
        nav_width += $(this).width();
    })
    nav_width+=$(".search-btn").width()*2;
    $('.navbar-nav').width(nav_width);

    var scroll = new BScroll(document.getElementById('nav'), {
        startX: 0,
        scrollX: 'true',
        scrollY: false,
        click: true
    })
    
    //搜索框设置
    var $dialog = $('.search-dialog');
    $('.search-btn').click(function(event) {
        $dialog.css("transform","translateY(0)");
        $dialog.find(".search-input").focus();
    });
    $dialog.find(".cancel-hook").click(function() {
        $dialog.css("transform","translateY(-100vh)");
        $dialog.find(".search-input").blur();
    });
    $dialog.find(".close-icon").click(function() {
        $dialog.find(".search-input").val("");
        $dialog.find(".search-input").focus();
    });
})
