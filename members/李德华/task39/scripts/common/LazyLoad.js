define(function() {
  var willLoadImages = [];
  $('.about-list>li').each(function(index) {
    $(this).css({'opacity': '0'});
    willLoadImages.push($(this));
  });
  var timer;
  $(window).on('scroll', function() {
    if (willLoadImages.length > 0) {
      var tmpArr = willLoadImages.slice(0);
      for (var i = 0; i < tmpArr.length; i++) {
        if (isVisible(tmpArr[i])) {
          tmpArr[i].animate({
            'opacity': 1
          }, 1500);
          // tmpArr[i].css({'opacity':'1'});
          willLoadImages.splice(willLoadImages.indexOf(tmpArr[i]), 1);
        }
      }
    }
  });
  function isVisible($node) {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var topOffset = $(window).scrollTop();
    var leftOffset = $(window).scrollLeft();
    var nodeTop = $node.offset().top;
    var nodeLeft = $node.offset().left;
    var nodeWidth = $node.width();
    var nodeHeight = $node.height();
    if ((nodeTop > topOffset && nodeTop < topOffset + windowHeight) || (nodeTop + nodeHeight > topOffset && nodeTop + nodeHeight < topOffset + windowHeight)) {
      if ((nodeLeft > leftOffset && nodeLeft < leftOffset + windowWidth) || (nodeLeft + nodeWidth > leftOffset && nodeLeft + nodeWidth < leftOffset + windowWidth))
        return true;
    }
    return false;
  }
});
