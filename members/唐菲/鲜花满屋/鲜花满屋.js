/*reated by Administrator on 2016/6/8.
 */
 function check() {
     if(document.forms[0].elements[0].value.length<4){
                 alert("账号长度不得小于4位");
		     }
		     }
		     function check1() {
		         if(document.forms[0].elements[1].value.length<8){
			             alert("密码长度不的小于8位")
				         }
					 }
					 function check3() {
					     var name=document.getElementById("text");
					         var password=document.getElementById("password");
						     if(name!="pwxaishe"||password!="123456789"){
						             alert("用户名或者密码输入错误")
							         }
								     else{
								             alert("登陆成功，正在加载请稍后。。。")
									         }

										 }
										     


