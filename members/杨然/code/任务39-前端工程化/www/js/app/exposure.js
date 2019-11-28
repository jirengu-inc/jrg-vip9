define(function(){
  var Exposure = (function($target){
    var _Exposure = function($target){
      this.$target = $target;
      this.init();
      this.bind();
      this.checkShow();
    }
    _Exposure.prototype.init = function(){
      this.clock;
    }
    _Exposure.prototype.bind = function(){
      var _this = this;
      $(window).on('scroll', function() {
          if (_this.clock) {
              clearTimeout(_this.clock);
          }
          _this.clock = setTimeout(function() {
              if (!_this.lock) {
                  _this.lock = true;
                  _this.checkShow();
                  _this.lock = false;
              }
          }, 50);
      })
    }
    _Exposure.prototype.checkShow = function(){
          if (this.isShow(this.$target)) {
            // console.log('ishow');
              this.lock = false;
              this.$target.animate({opacity: 1}, 200);
          }
    }
    _Exposure.prototype.isShow  = function($node){
      var scrollH = this.scrollH = $(window).scrollTop(),
          winH = this.winH = $(window).height(),
          top = this.top = $node.offset().top;
          return !!(top < (winH + scrollH));
    }
      return {
        init: function($target){
          $target.each(function(index, node){
            new _Exposure($(node));
          })
        }
      }
  })()
  return Exposure;
})
