define(['jquery'],function($){

	function FullCarousel($ct){
		this.$ct = $ct;
		this.init();
		this.bind();
		this.setBg(1);
		this.auto();

		curIdx = 0;
		isAnimate = false;


	}

	FullCarousel.prototype.init = function(){
		var $imgCt = this.$imgCt = this.$ct.find('.img-ct');
		var $items = this.$items = $imgCt.children();
		var $pre = this.$pre = this.$ct.find('.pre');
		var $next = this.$next = this.$ct.find('.next');
		var $bullet = this.$bullet = this.$ct.find('.bullet');
		var imgWidth = this.imgWidth = $(window).width();
		var imgCount = this.imgCount = $imgCt.children().length;

		// var curIdx = this.curIdx = 0;
		// var isAnimate = this.isAnimate = false;

		$imgCt.prepend($items.last().clone());
		$imgCt.append($items.first().clone());
		$imgCt.find('.item').css('width',imgWidth);
		$imgCt.find('.cover').css('width',imgWidth);
		var imgRealCount = $imgCt.children().length;
		$imgCt.css({left:0-imgWidth,width:imgWidth*imgRealCount});

	}

	FullCarousel.prototype.bind = function(){
		var _this = this;
		this.$bullet.find('li').on('click',function(){
			var idx = $(this).index();
			if(idx>curIdx){
				_this.playNext(idx-curIdx);
			}
			if(curIdx>idx){
				_this.playPre(curIdx-idx);
			}
		});

		this.$pre.on('click',function(){
			_this.playPre();
		});

		this.$next.on('click',function(){
			_this.playNext();
		})

	}

	FullCarousel.prototype.auto = function(){
		var _this = this;
			clock=setInterval(function(){
	         _this.playNext();
			},4000);
	}

	FullCarousel.prototype.playNext = function(idx){
			var _this = this;
            var idx=idx||1;
	         if(!isAnimate){
	            isAnimate=true;
	            this.setBg(curIdx+2);
	            this.$imgCt.animate({left:'-='+(_this.imgWidth*idx)},function(){
	            	curIdx=(curIdx+idx)%_this.imgCount;
	            	if(curIdx==0){
	            		_this.$imgCt.css({left:0 - _this.imgWidth});
	            	}
	              isAnimate=false;
	              _this.setBullet();
        })

         }
	}

	FullCarousel.prototype.playPre = function(idx){
				var _this = this;
				var idx = idx || 1;
				if(!this.isAnimate){
					this.isAnimate = true;
					this.setBg(curIdx);
					this.$imgCt.animate({left: '+='+(_this.imgWidth*idx)},function(){
						curIdx = (_this.imgCount +curIdx - idx)%_this.imgCount;
						if(curIdx === (_this.imgCount - 1)){
							_this.$imgCt.css({left: 0- _this.imgWidth * _this.imgCount});
						}
						_this.isAnimate = false;
						_this.setBullet();
					});
				}

	}

	FullCarousel.prototype.setBg = function(idx){
		        var idx=idx||0,
             	$node=this.$imgCt.children().eq(idx),
            	$cover=$node.find('.cover'),
             	imgUrl=$cover.attr('data-bg-img');
             if($node.data('isBgSet')){
             		return;
             	}
            $cover.css('background-image','url('+imgUrl+')');

            $node.data('isBgSet',true);
	}

	FullCarousel.prototype.setBullet = function(){
		var _this = this;
		this.$bullet.children().removeClass('active').eq(curIdx).addClass('active');
	}

	return FullCarousel;
})
