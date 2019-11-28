	 		function renderData(items){
	 			var tpl = '',
	 				$nodes;
	 			for (var i = 0; i < items.length; i++) {
	 				tpl += '<li class="item">';
	 				tpl += '<a href="#"><img src="' + item[i].img_url + '"alt=""</a>';
	 				tpl += '<h3>'+items[i].short_name + '</h3>';
	 				tpl += '<p>'+item[i].short_intro+'</p>';
	 				tpl += '</li>';

	 			}
	 			$nodes = $(tpl);
	 			$('#pic-ct').append($nodes);
	 			return $nodes;
	 		}