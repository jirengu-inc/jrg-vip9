			   
		    function GoTop($ct){
		        this.$ct = $ct;
		        this.target = $('<div class="go-top">回到顶部</div>');
		        this.createNode();
		        this.bindEvent();
		    }
		    GoTop.prototype.createNode = function () {
		        this.$ct.append(this.target);
		    }
		    GoTop.prototype.bindEvent = function () {
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

		  new GoTop($('body'));