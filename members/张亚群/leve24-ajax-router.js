
app.get('/setMore',function (req,res) {
    var start = +req.query.start;
    var len = +req.query.len;
    var data = [];
    for(var i = start;i<start+len;i++){
        data.push(i)
    }
    res.send({
        start:start,
        datas:data
    })
});