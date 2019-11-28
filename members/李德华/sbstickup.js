$.fn.sb_stick = function() {
  var $navs = this;
  var topTree = [];
  var elementIndex = 0;
  var $standElements = [];
  $(document).on('scroll', function() {
    var $curEle = $navs.eq(elementIndex);
    if (elementIndex < $navs.length && !$curEle.data('sb_hidden') && $(this).scrollTop() >= $curEle.offset().top) {
      console.log('add fix');
      var $standEle = $curEle.clone();
      $curEle.css({'opacity': '0'});
      $curEle.data('sb_hidden', true);
      $standEle.css({'position': 'fixed', 'top': 0, 'width': $curEle.width()});
      $curEle.parent().append($standEle);
      $standElements.push($standEle);
      elementIndex++;
      topTree.push($navs.eq(elementIndex - 1));
    } else if (topTree.length > 0 && topTree[topTree.length - 1].data('sb_hidden') && $(this).scrollTop() < topTree[topTree.length - 1].offset().top) {
      console.log('remove fix');
      $standElements[$standElements.length - 1].remove();
      topTree[topTree.length - 1].css({'opacity': '1'});
      topTree[topTree.length - 1].data('sb_hidden', false);
      elementIndex--;
      topTree.pop();
      $standElements.pop();
    }
  })
}
