define(function() {
    return function($node, scroll) {
      this.node = $node;
      var screenWidth = $(window).width();
      var $list = this.node.find('ul');
      var firstEle = $list.find('li').first().clone();
      var lastEle = $list.find('li').last().clone();
      $list.prepend(lastEle);
      $list.append(firstEle);
      $list.find('img').css({'width': screenWidth});
      var listWidth = screenWidth * $list.find('li').length
      $list.css({'left': -screenWidth, 'width': listWidth});
      var $this = this;
      $node.parent().find('.pre').on('click', function() {
        $this.action(1);
      });
      $node.parent().find('.next').on('click', function() {
        $this.action(-1);
      });
      setInterval(function() {
        $this.action(-1);
      }, 5000);
      var animating = false;
      this.action = function(index) {
        if (animating) return;
        animating = true;
        var x = index * screenWidth + $list.offset().left;
        $list.finish();
        $list.animate({
          'left': x
        }, 800, function() {
          if ($list.offset().left === 0)
            $list.css({'left': -screenWidth * 4});
          else if ($list.offset().left === -screenWidth * 5)
            $list.css({'left': -screenWidth});
          scroll(-$list.offset().left/screenWidth);
          animating = false;
        });
      }
    }
});
