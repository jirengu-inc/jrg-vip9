

app.get('/getNews', function(req, res){
	var data = [];
	for(var i=0; i<5; i++){
		var index= parseInt(req.query.start)+i+1;
		data.push("内容"+index);
	}

	res.send(data);
})