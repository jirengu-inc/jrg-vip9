function ajax(opts) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      opts.success(request.responseText);
    } else if (request.readyState === 4 && request.status != 200) {
      opts.error();
    }
  }
  var data = opts.data;
  var paramStr = '';
  for (var key in data) {
    paramStr += key + '=' + data[key] + '&';
  }
  if (opts.type === 'get') {
    request.open(opts.type, opts.url + '?' + paramStr, true);
    request.send();
  } else if (opts.type === 'post') {
    request.open(opts.type, opts.url, true);
    request.send(paramStr);
  }
}
document.querySelector('#btn').addEventListener('clikc',function(){
  ajax({
    url: 'getData.php',
    type: 'get',
    data: {
      username: 'xiaoming',
      password: 'abcd1234'
    },
    success: function(ret) {
      console.log(ret);
    },
    error: function() {
      console.log('出错了')
    }
  });
},false);
