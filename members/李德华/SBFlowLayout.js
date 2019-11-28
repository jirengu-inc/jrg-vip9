$.fn.sb_flowLayout = function($items, finish) {
  this[0].sb_itemWidth = this[0].sb_itemWidth || $items.first().outerWidth(true);
  this[0].sb_col = this[0].sb_col || parseInt(this.width()/this[0].sb_itemWidth);
  this[0].sb_maxHeight = this[0].sb_maxHeight || 0;
  if (this[0].sb_heights === undefined) this[0].sb_heights = [];
  this[0].sb_colIndex = this[0].sb_colIndex || 0;
  var $content = this;
  $items.each(function(index) {
    $(this).finish();
    if ($content[0].sb_heights.length < $content[0].sb_col) {
      $(this).animate({'top': 0 - 30, 'left': index * $content[0].sb_itemWidth - 30, 'opacity': 0}, 0, function() {
        $(this).animate({'top': '+=30', 'left': '+=30', 'opacity': 1}, 1000);
      });
      $content[0].sb_heights.push($(this).outerHeight(true));
    } else {
      var min = $content[0].sb_heights[0];
      $content[0].sb_colIndex = 0;
      for (var i = 0; i < $content[0].sb_heights.length; i++) {
        if (min > $content[0].sb_heights[i]) {
          $content[0].sb_colIndex = i;
          min = $content[0].sb_heights[i];
        }
      }
      $(this).animate({'top': min - 30, 'left': $content[0].sb_colIndex * $content[0].sb_itemWidth - 30, 'opacity': 0}, 0, function() {
        $(this).animate({'top':  '+=30', 'left': '+=30', 'opacity': 1}, 1000, function() {
          if (index === $items.length - 1)
            finish();
        });
      });
      $content[0].sb_heights[$content[0].sb_colIndex] = $content[0].sb_heights[$content[0].sb_colIndex] + $(this).outerHeight(true);
    }
  });
  this[0].sb_maxHeight = Math.max.apply(Math, this[0].sb_heights);
  if (this.height() == 0 || this.height() < this[0].sb_maxHeight)
    this.css({'height': this[0].sb_maxHeight});
}
