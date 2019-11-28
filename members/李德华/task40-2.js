$.fn.carousel = function() {
  this.each(function() {
    new Carousel(this);
  });
}
function Carousel($node) {
  this.node = $node;
  var itemWidth = itemWidth;
  var $list = this.node.find('ul');
  var firstEle = $list.find('li').first().clone();
  var lastEle = $list.find('li').last().clone();
  $list.prepend(lastEle);
  $list.append(firstEle);
  var itemCount = $list.children().length;
  var listWidth = itemWidth * $list.find('li').length
  $list.css({'left': -itemWidth, 'width': listWidth});
  var $this = this;
  $node.find('.pre').on('click', function() {
    $this.action(1);
  });
  $node.find('.next').on('click', function() {
    $this.action(-1);
  });
  this.action = function(index) {
    var x = index * itemWidth + $list.offset().left;
    $list.animate({
      'left': x
    }, 300, function() {
      if ($list.offset().left === 0)
        $list.css({'left': -itemWidth * (itemCount - 2)});
      else if ($list.offset().left === -itemWidth * (itemCount - 1))
        $list.css({'left': -itemWidth});
    });
  }
}
