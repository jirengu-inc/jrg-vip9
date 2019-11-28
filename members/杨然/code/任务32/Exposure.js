/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-09-18 03:30:14
 * @version $Id$
 */
var Exposure = {

  init: function($target, handler) {

    this.$c = $(window);
    this.$target = $target;
    this.handler = handler;

    this.bind();
    this.checkShow();
  },

  bind: function() {

    var me = this,
      timer = null,
      interval = 100;

    $(window).on('scroll', function(e) {
      timer && clearTimeout(timer);
      timer = setTimeout(function() {
        me.checkShow();
      }, interval);
    });

  },

  checkShow: function() {
    var me = this;
    this.$target.each(function() {

      var $cur = $(this);
      if (  me.isShow($cur) ) {
        me.handler && me.handler.call(this, this);
        $cur.data('loaded', true);
      }
    });
  },

  isShow: function($el) {

    var scrollH = this.$c.scrollTop(),
      winH = this.$c.height(),
      top = $el.offset().top;

    if (top < winH + scrollH) {
      return true;
    } else {
      return false;
    }
  },

  hasLoaded: function($el) {
    if ($el.data('loaded')) {
      return true;
    } else {
      return false;
    }
  }

};
