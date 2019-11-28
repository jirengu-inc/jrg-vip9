// $(function(){
	//当文档加载完成才会执行ready()

	$(window).on('resize', resize).trigger('resize');//trigger让window对象立即出发resize事件

	function resize(){
		var windowWidth = $(window).width();//获取屏幕宽度

		var isSmallScreen = windowWidth < 768;

		$('#main-ad > .carousel-inner > .item').each(function(index, node){
			var $node = $(node);
			var url = $node.data(isSmallScreen ? 'image-xs' : 'image-lg');

			$node.css('backgroundImage', 'url("' + url + '")');
			// 大屏使用背景图(高度不缩放)，小屏使用img(可以宽高等比缩放)
			
			if(isSmallScreen) {
				$node.html('<img src="' + url + '" alt="" />');
			} else {
				$node.empty();
			}
		});

		// 控制标签页tab的容器宽度
		var $ulCon = $('ul.nav-tabs');
		var width = 0;
		$ulCon.children().each(function(index, node) {
			var $node = $(node);
			width += $node.width();

		});
		// if tab 宽度超出屏幕宽度才显示滚动条
		if (width > $(window).width()) {
			$ulCon.width(width);
		} else {
			$ulCon.width('100%');
		}
	}

	var $newsTitle = $('.news-title');
	$('#news .nav-pills a').on('click', function(){
		var $this = $(this);
		var title = $this.data('title');
		$newsTitle.text(title);
	})

	// 轮播图滑动操作
	var $carousels = $('.carousel');
	var startX;
	var endX;
	$carousels.on('touchstart', function(e){
		startX = e.originalEvent.touches[0].clientX
		// console.log(startX);
	});
	$carousels.on('touchmove', function(e){
		endX = e.originalEvent.touches[0].clientX
		// console.log(endX);
	});
	$carousels.on('touchend', function(){
		if ((startX - endX) > 60) {
			$carousels.carousel('next');
		} else if ((endX - startX) > 60) {
			$carousels.carousel('prev');
		}
	})
	
// })