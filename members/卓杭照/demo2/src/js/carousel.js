
 	function Carousel ($ct) {
 		this.$ct = $ct;
		this.init();
		this.bind();
	 	this.autoPlay();
	}

	Carousel.prototype.init = function () {
		var $imgCt = this.$imgCt = this.$ct.find('.img-ct'),			
	 		$bullet = this.$bullet = this.$ct.find('.bullet'),
	 	 	$preBtn = this.$preBtn = this.$ct.find('.pre'),
	 	 	$nextBtn = this.$nextBtn = this.$ct.find('.next');

	 	var $firstImg = $imgCt.find('li').first(),
	 		$lastImg = $imgCt.find('li').last(),
	 		$imgLi = $imgCt.children();

	 	var $imgWidth = this.$imgWidth = $firstImg.width(),
	 	 	imgLength = this.imgLength = $imgCt.children().length;// 图片长度imgLength = 4
	 	 	this.curPageIndex = 0;					// 默认第一张图片，下标初始值为 0 （范围0-3）
	 	 	this.isAnimate = false;									// 状态锁，重复点击无效

	 		$imgCt.append($firstImg.clone());
	 		$imgCt.prepend($lastImg.clone());

	 	var imgLaterLength = $imgCt.width($firstImg.width() * $imgCt.children().length); 		 // imgRealLength = 6
	 		$imgCt.find("li").css({ width: $imgWidth});
		    $imgLi.find("img").css({ width: $imgWidth});
			$imgCt.css({left:0-$imgWidth,width:imgLaterLength}); // left 默认第一张图片，初始值为 -300
	};

	Carousel.prototype.bind = function () {
		var _this = this;
			this.$preBtn.on('click',function(){
				_this.playPre();
			});
			this.$nextBtn.on('click',function(){
				_this.playNext();
			});

			this.$bullet.find('li').on('click',function(){	
	 			var idx = $(this).index();	// 点击bullet时候，获取下标
	 			if(idx>_this.curPageIndex){
	 				_this.playNext(idx-_this.curPageIndex);
	 			}else{
	 				_this.playPre(_this.curPageIndex-idx);
	 		}

	 	});

	};

	Carousel.prototype.playPre = function () {
			var _this = this;
			 if(this.isAnimate)return
	 			this.isAnimate = true
	 			var num = num || 1
	 			this.$imgCt.animate({
	 				"left":'+='+this.$imgWidth*num
	 			},function(){
	 				_this.curPageIndex = (_this.curPageIndex-num+_this.imgLength)%_this.imgLength
	 				if(_this.curPageIndex ===	_this.imgLength-1){    //  图片下标是3时候
	 					_this.$imgCt.css({left:0-(_this.imgLength*_this.$imgWidth*num)})
	 				}
	 				_this.isAnimate = false
	 				_this.setBullet()
	 			})	


	};
	Carousel.prototype.playNext = function () {
			var _this = this;
			var num = num || 1		//	参数num是点击 bullet小图标格数，默认 1格
	 			if(this.isAnimate)return
	 			this.isAnimate = true
	 			this.$imgCt.animate({
	 				left:"-="+this.$imgWidth*num
	 			},function(){
	 				_this.curPageIndex=(_this.curPageIndex+num)%_this.imgLength   // imgLength 初始值 
	 				if(_this.curPageIndex === 0){
	 					_this.$imgCt.css({left:0-_this.$imgWidth})
	 				 	_this.curPageIndex = 0
	 				}
	 				_this.isAnimate = false
	 				_this.setBullet()
	 			})	

	};

	Carousel.prototype.setBullet = function () {
		this.$bullet.children().removeClass('active').eq(this.curPageIndex).addClass('active')
	};


	Carousel.prototype.autoPlay = function () {
		var _this = this;
			clock = setInterval(function(){
	 				_this.playNext();
	 			},4000)
	};



	new Carousel($('.carousel'));		