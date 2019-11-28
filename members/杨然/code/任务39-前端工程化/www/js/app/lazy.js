define(function(){
  var Lazy = (function(){
    var Exposure = function($target){
      this.$target = $target;
      this.init();
      this.bind();
    }
    Exposure.prototype.init = function(){
      this.curPage = 1,
      this.perPageCount = 10;

    }
    Exposure.prototype.bind = function(){
      var _this = this;
      $('.load').on('click', function(){
        console.log('click');
        _this.loadAndPlace();
      })
    }
    Exposure.prototype.loadAndPlace = function(){
      var _this = this;
      $.ajax({
          url: 'http://platform.sina.com.cn/slide/album_tech',
          dataType: 'jsonp', //直接看数据， 如： http://platform.sina.com.cn/slide/album_tech?jsoncallback=func&app_key=1271687855&num=3&page=4
          jsonp: 'jsoncallback',
          data: {
              app_key: '1271687855',
              num: this.perPageCount,
              page: this.curPage
          }
      }).done(function(ret) {
          if (ret && ret.status && ret.status.code === '0') {
              _this.place(ret.data);
              _this.curPage++;
          } else {
              console.log('获取数据错误');
          }
      })
    }
    Exposure.prototype.place = function(nodeArr){
      var $nodes = this.renderData(nodeArr); //经过渲染后的节点
      var _this = this;
      $nodes.find('img').on('load', function() {
          waterFall($(this).parents('.item'), _this.$target); //小坑一个,记得找当前的.
      });
    }
    Exposure.prototype.renderData = function(items){
      var tpl = '', //原生JSdom
          $nodes; //jquerydom
      for (var i = 0; i < items.length; i++) {
          tpl += '<li class="item">';
          tpl += '<a href="' + items[i].cmnt_url + '" class="link">';
          tpl += ' <img src=" ' + items[i].img_url + ' " alt="">';
          tpl += '<h4 class="header">' + items[i].short_name + '</h4>';
          tpl += '<p class="brief">' + items[i].short_intro + '</p>';
          tpl += '</a></li>';
      }
      $nodes = $(tpl);
      this.$target.prepend($nodes);
      return $nodes;
    }
        var colSumHeight = [];
        var waterFall = function($nodes, $ct) {
            function waterFall($nodes, $ct) {
                var nodeWidth = $('.item').outerWidth(true),
                    colNum = parseInt($ct.width() / nodeWidth);
                if (colSumHeight.length == 0) {
                    for (var i = 0; i < colNum; i++) {
                        colSumHeight.push(0);
                    }
                }
                $nodes.each(function() {
                    var $cur = $(this);
                    var idx = 0,
                        minSumHeight = colSumHeight[0];
                    for (var i = 0; i < colSumHeight.length; i++) {
                        if (colSumHeight[i] < minSumHeight) {
                            idx = i;
                            minSumHeight = colSumHeight[i];
                        }
                    }
                    $cur.css({
                        left: nodeWidth * idx,
                        top: minSumHeight,
                        opacity: 1
                    });
                    colSumHeight[idx] = $cur.outerHeight(true) + colSumHeight[idx];
                    $ct.height(Math.max.apply(null, colSumHeight) + 100); //撑高ul高度
                })
            }
            return waterFall($nodes, $ct);
        }
    return {
      init: function($ct){
        $ct.each(function(index, node){
          new Exposure($(node));
        })
      }
    }
  })()
  return Lazy;
})
