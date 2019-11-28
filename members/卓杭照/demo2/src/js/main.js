	var TitleScroll = {

		bind: function (){
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
		}
	}
	TitleScroll.bind();