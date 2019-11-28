/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-09-18 03:29:58
 * @version $Id$
 */
	var WaterFall = {

		//[0,0,0,0]
		//[20, 10, 30, 15]

		arrColHeight: [],

		init: function( $ct ){
			this.$ct = $ct;
			this.arrColHeight = [];

			this.bind();
			this.start();
		},

		bind: function(){
			var me = this;
			$(window).on('resize', function(){
				me.start();
			});
		},

		start: function($nodes){
			var me = this;
			this.$items = this.$ct.find('.item');
			if(this.$items.length ===0) return;
			this.itemWidth = this.$items.outerWidth(true);
			this.$ct.width('auto');
			this.colNum = Math.floor( this.$ct.width() / this.itemWidth );
			this.$ct.width(this.itemWidth*this.colNum);
			if(this.arrColHeight.length === 0 || !$nodes){
				this.arrColHeight = [];
				for(var i=0; i<this.colNum; i++){
					this.arrColHeight[i] = 0;
				}	
			}

			if($nodes){
				//console.log(this.arrColHeight.length)
				$nodes.each(function(){
					var $item = $(this);
					$item.find('img').on('load', function(){
						me.placeItem( $item );
						me.$ct.height( Math.max.apply(null, me.arrColHeight) );
					})
				});	
			}else{
				this.$items.each(function(){
					var $item = $(this);
					me.placeItem( $item );
				});
				console.log(me.arrColHeight);
				me.$ct.height( Math.max.apply(null, me.arrColHeight) );	
			}
			
		},

		placeItem: function( $el ) {
			// 1. 鎵惧埌arrColHeight鐨勬渶灏忓€硷紝寰楀埌鏄鍑犲垪
			// 2. 鍏冪礌left鐨勫€兼槸 鍒楁暟*瀹藉害
			// 3. 鍏冪礌top鐨勫€兼槸 鏈€灏忓€�
			// 4. 鏀剧疆鍏冪礌鐨勪綅缃紝鎶奱rrColHeight瀵瑰簲鐨勫垪鏁扮殑鍊煎姞涓婂綋鍓嶅厓绱犵殑楂樺害
			var obj = this.getIndexOfMin(this.arrColHeight),
				idx = obj.idx,
				min = obj.min;
			$el.css({
				left: idx * this.itemWidth,
				top: min
			});
			this.arrColHeight[idx] += $el.outerHeight(true);
		},

		getIndexOfMin: function( arr ){
			var min = arr[0],
				idx = 0;
			for(var i = 1; i< arr.length; i++){
				if(min > arr[i]){
					min = arr[i];
					idx = i;
				}
			}
			return {min: min, idx: idx};
		}
	}
