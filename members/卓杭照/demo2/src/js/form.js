	var Check = {
		
		bind: function () {

			function isValidUsername(str){
		    	var reg = /^\w{3,20}$/g
		    	return reg.test(str);
		    };

		    function isEmail(str){
		    	var reg = /\w+@[\w]+.[\w]+$/g
		    	return reg.test(str);
		    };

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
			};

		    function isPhoneNum(str){
		    	var reg = /^1[0-9]{10}$/;
		    	return reg.test(str);
		    };

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
		}
	};
		
		Check.bind();
			