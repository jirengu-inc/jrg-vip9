function render($nodes) {
	var nodeWidth = $nodes.outerWidth(true),
		colNum = parseInt($(window).width()/nodeWidth),
	
	if (colSumHeight.length>0) {
		for (var i = 0; i < colNum; i++) {
		colSumHeight.push(0);
		}
	}

	

	$nodes.each(function(){
		var $cur = $(this);
		var idx = 0,
			minSumHeight = colSumHeight[0];

		for (var i = 0; i < colSumHeight.length; i++) {
			if(colSumHeight[i]<minSumHeight){
				idx = i;
				minSumHeight = colSumHeight[i];
			}
		}

		$cur.css({
			left:nodeWidth*idx,
			top:minSumHeight
		});
		colSumHeight[idx] = $cur.outerHeight(true) + colSumHeight[idx];

	})
}