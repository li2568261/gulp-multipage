function setStar($el){
	var $el = $el || $(document)
	$el.find('.star-bar').each(function(index, el) {
		var STARNUM = 5,//总星星
			score = $(this).attr("score"),//得分
			full_num = Math.floor(score),//满星数量
			half_num = full_num < score,//是否有半星
			empty_num = Math.floor(STARNUM - score);//空星数量

		for (var i = 0; i < full_num; i++) {
			$(this).append('<span class="icon-star-full"></span>');
		}

		if(half_num)$(this).append('<span class="icon-star-half"></span>');

		for (var j = 0; j < empty_num; j++) {
			$(this).append('<span class="icon-star-empty"></span>');
		}
		$(this).append('<span class="gold">'+score+'</span>')
	});
}
