
 /*
			var $imgCt = $('.img-ct');
			var	$imgLi = $imgCt.children();
	 		var	$bullet = $('.bullet');
	 		var $firstImg = $imgCt.find('li').first();
	 		var $lastImg = $imgCt.find('li').last();
	 		var $imgWidth = $firstImg.width();
	 		var curPageIndex = 0;					// 默认第一张图片，下标初始值为 0 （范围0-3）
	 		var imgLength = $imgCt.children().length;					// imgLength = 4
	 		var isAnimate = false;									// 状态锁，重复点击无效

	 		$imgCt.append($firstImg.clone());
	 		$imgCt.prepend($lastImg.clone());

	 		var imgRealLength = $imgCt.width($firstImg.width() * $imgCt.children().length); 		 // imgRealLength = 6
	 		$imgCt.find("li").css({ width: $imgWidth});
		    $imgLi.find("img").css({ width: $imgWidth});
			$imgCt.css({left:0-$imgWidth,width:imgRealLength}); // left 默认第一张图片，初始值为 -300

			$('#header .pre').on('click',function(){
				playPre();
			});
			$('#header .next').on('click',function(){
				playNext();
			});

	 		$bullet.find('li').on('click',function(){	
	 			var idx = $(this).index()	// 点击bullet时候，获取 下标
	 			if(idx>curPageIndex){
	 				playNext(idx-curPageIndex)
	 			}else{
	 				playPre(curPageIndex-idx)
	 		}

	 	});
	 		 setBg(1);
	 		 autoPlay();

	 		 function setBg(num){
	 		 	var num = num|| 0
	 		 	var $li = $imgCt.children().eq(num)
	 		 	var $cover = $li.find('.cover')
	 		 	var imgUrl = $cover.attr('data-bg-img')
	 		 	if($li.data("isBgSet")) return
	 		 	$cover.css('background-image','url('+imgUrl+')' )
	 		 	$li.data('isBgSet',true)
	 		 }

	 		function playNext(num){
	 			var num = num || 1		//	参数num是点击 bullet小图标格数，默认 1格
	 			if(isAnimate)return
	 			isAnimate = true
	 			
	 			setBg(curPageIndex+2)
	 			$imgCt.animate({
	 				left:"-="+$imgWidth*num
	 			},function(){
	 				curPageIndex=(curPageIndex+num)%imgLength   // imgLength 初始值 
	 				if(curPageIndex === 0){
	 					$imgCt.css({left:0-$imgWidth})
	 				 	curPageIndex = 0
	 				}
	 				isAnimate = false
	 				setBullet()
	 			})	
	 		}

	 		function playPre(num){
	 			if(isAnimate)return
	 			isAnimate = true
	 			var num = num || 1
	 			setBg(curPageIndex)
	 			$imgCt.animate({
	 				"left":'+='+$imgWidth*num
	 			},function(){
	 				curPageIndex = (curPageIndex-num+imgLength)%imgLength
	 				if(curPageIndex ===	imgLength-1){    //  图片下标是3时候
	 					$imgCt.css({left:0-(imgLength*$imgWidth*num)})
	 				}
	 				isAnimate = false
	 				setBullet()
	 			})					
	 		}

	 		function setBullet(){
	 			$bullet.children().removeClass('active').eq(curPageIndex).addClass('active')
	 		}


	 		function autoPlay(){
	 			clock = setInterval(function(){
	 				playNext();
	 			},4000)
	 		}
	 		function stopAuto(){
				clearInterval(clock);
			}
*/
// 滚轮条滑动
			$('#header .title-service').on('click',function(e){
				$('body').animate({scrollTop:688});
				e.preventDefault();	
			});
			$('#header .title-scenery').on('click',function(e){
				$('body').animate({scrollTop:1350});
				e.preventDefault();	
			});
			$('#header .title-travel').on('click',function(e){
				$('body').animate({scrollTop:2477});
				e.preventDefault();	
			});
			$('#header .title-team').on('click',function(e){
				$('body').animate({scrollTop:4049});
				e.preventDefault();	
			});
			$('#header .title-contact').on('click',function(e){
				$('body').animate({scrollTop:5049});
				e.preventDefault();	
			});
			$('#header .item-welcome a').on('click',function(e){
				$('body').animate({scrollTop:5049});
				e.preventDefault();	
			})

// gotop
/*
			GoTop($('body'));
		    
		    function GoTop($ct){
		        this.$ct = $ct;
		        this.target = $('<div class="go-top">回到顶部</div>');
		        this.createNode();
		        this.bindEvent();
		    }
		    function createNode (){
		        this.$ct.append(this.target);
		    }
		    function bindEvent (){
		        $(window).on('scroll',function(){
		            if($(window).scrollTop()>100){
		                $('.go-top').css('display','block');
		            }else{
		                $('.go-top').css('display','none');
		            }
		        })

		        this.target.on('click',function(){
		           $('body').animate({scrollTop:0});
		        });
		    }
*/
// form验证
		    function isValidUsername(str){
		    	var reg = /^\w{3,20}$/g
		    	return reg.test(str);
		    }
		    function isEmail(str){
		    	var reg = /\w+@[\w]+.[\w]+$/g
		    	return reg.test(str);
		    }
		    function isValidPassword(str){
		    	if(str.length < 6 || str.length > 20){
					return false;
			}
				if(/[^a-zA-Z0-9_]/.test(str)){
					return false;	
			}
				//单独数字，小写字母，大写字母，_情况		
				if(/^[a-z]+$|^[A-Z]+$|^[0-9]$|^_+$/.test(str)){
					return false;
		    }
		    	return true;
		}
		    function isPhoneNum(str){
		    	var reg = /^1[0-9]{10}$/;
		    	return reg.test(str);
		    }

		    $('.user').on('change',function(){
		    	if(!isValidUsername(this.value)){
		    		$('.tip-user').text('用户名只能是字母、数字、下划线，3-20个字符');
		    		$('.user').css({'border':'1px solid #d60d0d'})
		    		$('.user-ok').css({'opacity':'0'});
		    		$('.tip-user').css({'color':'#d60d0d','font-weight':'bold'});
		    	}else{
		    		$('.tip-user').text('用户名格式正确');
		    		$('.user').css({'border':'1px solid transparent'});
		    		$('.user-ok').css({'opacity':'1'});
		    		$('.tip-user').css({'color':'#b1a9b1','font-weight':'normal'})
		    	}
		    });

		    $('.email').on('change',function(){
		    	if(!isEmail(this.value)){
		    		$('.tip-email').text('请输入正确email');
		    		$('.email').css({'border':'1px solid #d60d0d'});
		    		$('.email-ok').css({'opacity':'0'});
		    		$('.tip-email').css({'color':'#d60d0d','font-weight':'bold'});
		    	}else{
		    		$('.tip-email').text('email格式正确');
		    		$('.email').css({'border':'1px solid transparent'});
		    		$('.email-ok').css({'opacity':'1'});
		    		$('.tip-email').css({'color':'#b1a9b1','font-weight':'normal'});
		    	}

		    });

		    $('.phone').on('change',function(){
		    	if(!isPhoneNum(this.value)){
		    		$('.tip-phone').text('手机号码输入格式有误');
		    		$('.phone').css({'border':'1px solid #d60d0d'});
		    		$('.phone-ok').css({'opacity':'0'});
		    		$('.tip-phone').css({'color':'#d60d0d','font-weight':'bold'});
		    	}else{
		    		$('.tip-phone').text('手机号码格式正确');
		    		$('.phone').css({'border':'1px solid transparent'});
		    		$('.phone-ok').css({'opacity':'1'});
		    		$('.tip-phone').css({'color':'#b1a9b1','font-weight':'normal'});
		    	}

		    });