		function ajax(obj){
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function(){
				if(xmlhttp.readyState== 4 && xmlhttp.status ==200){
					var json = JSON.parse(xmlhttp.responseText);
					obj.success(json);
				}
				if (xmlhttp.status == 404){
					obj.error();
				};
			}
		
		var dataStr ="";
		for(var key in obj.data){
			dataStr += key + '=' + obj.data[key] + '&';
		}
		dataStr = dataStr.substr(0, dataStr.length-1);

		if(obj.type.toLowerCase() === "post"){
			xmlhttp.open(obj.type, obj.url, true);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded")
			xmlhttp.send(dataStr);
		}
		if(obj.type.toLowerCase() ==="get"){
			xmlhttp.open(obj.type, obj.url +"?"+ dataStr, true);
			xmlhttp.send();
		}

	}

		// document.getElementById('btn').addEventListener("click",function(){
		// 	ajax({
		// 		url: "use_ajax.php",//接口地址
		// 		type: document.getElementById("type").value || "get"
		// 		data: {
		// 			username: document.getElementById("username2").value,
		// 			password: "abc123"
		// 		},
		// 		success: function(data){
		// 			dealWith(data);
		// 		},
		// 		error: function(){
		// 			console.log("error");
		// 		}
		// 	});
		// });
