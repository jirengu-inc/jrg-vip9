define(['jquery'],function($){
	function GoTop(target){
		
		this.target = target;
		this.createNode();
	}

	GoTop.prototype = {
		bindEvent:function(){
			this.target.on('click',function(){
				$(window).scrollTop(0);
			})	
		},
		createNode:function(){
		var _this=this;
		$(window).on('scroll',function(){
			var scrollTop = $(window).scrollTop();
			if(scrollTop > 200 ){
				_this.target.css('display','block')
			}else{
				_this.target.css('display','none')
			}
		})
		this.bindEvent();
		}
	}
	return GoTop;
})	
