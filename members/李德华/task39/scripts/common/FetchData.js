define(function(require) {
  return function(index, finish){
    $.getJSON('http://platform.sina.com.cn/slide/album_tech?jsoncallback=?&app_key=1271687855&num=9&page=' + index.toString(), function(data) {
      var count = parseInt(data.count);
      var str = '';
      for (var i = 0; i < count; i++) {
        str += domStringFromObject(data.data[i]);
      }
      var items = $(str);
      $('.portfolio-list').append(items);
      items.find('img').on('load', function() {
        console.log('image loaded');
        count--;
        if (count === 0) {
          require(['common/SBFlowLayout'], function(flow) {
            flow.call($('.portfolio-list'), items, finish);
          });
        }
      });
    });
    function domStringFromObject(obj) {
      return '<li><a href="#"><img src="' +
              obj.img_url +
              '" alt="' + obj.name +
              '"></a><h3>' +
              obj.short_name + '</h3>' +
              '<p class="light-gray-text">' + obj.short_intro + '</p>';
    }
  };
})
