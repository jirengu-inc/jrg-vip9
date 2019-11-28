var Expouse = (function() {
  var store = [];
  var oneStore = [];
  function bind($target, action) {
    store.push({
      target: $target,
      action: action
    });
  }
  function one($target, one) {
    oneStore.push({
      target: $target,
      action: action
    });
  }
  $(window).on('scoll', function() {
    for (var i = 0; i < store.length; i++) {
      if (isVisible(store[i]['target'])) {
        store[i]['action'].call(store['target']);
      }
    }
    for (var i = 0; i < oneStore.length; i++) {
      if (isVisible(oneStore[i]['target'])) {
        store[i]['action'].call(store['target']);
        oneStore.splice(i, 1);
      }
    }
  })
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
  return {
    bind: bind,
    one: one
  }
})();
