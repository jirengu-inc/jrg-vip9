app.get('/getTest', function(req, res){
  var data = ['hunger'];
  var jungle = 1;

  var index= req.query.userName;
  if(index == data[0]){
  	jungle =0;
  }


  res.send({
  	exist:jungle
  });
})






