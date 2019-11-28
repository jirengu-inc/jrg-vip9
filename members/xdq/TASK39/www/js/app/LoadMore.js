
define(['jquery'],function($){
	function LoadMore($ct){
		this.$ct = $ct;
		this.init();
	}


	LoadMore.prototype.init = function(){
		this.curPage = 1;
		this.perPageCount = 9;
		this.target = this.$ct.find('#btn-load');
		this.colSumHeight = [];
		this.handler();
		this.bind();
	}

	LoadMore.prototype.bind =function(){
		var me =this;
		this.target.on('click',function(){
			me.handler();
		})
	}




	LoadMore.prototype.isShow = function($el){
		  var scrollH = $(window).scrollTop(),
			  winH = $(window).height(),
			  top = $el.offset().top;

	  	  if(top < winH + scrollH){
	  	  	return true;
	  	  }else{
	  	  	return false;
	  	  }
	}

	LoadMore.prototype.handler =function handler(){
		var me = this;
		$.ajax({
			url:'http://platform.sina.com.cn/slide/album_tech',
			dataType:'jsonp',
			jsonp:'jsoncallback',
			data:{
				app_key: '1271687855',
				num: this.perPageCount,
				page: this.curPage
			},
			success:function(ret){
				if(ret && ret.status && ret.status.code === "0"){
					var dataArr = ret.data;
					// var $nodes = renderData(dataArr);
					me.place(ret.data);
					me.curPage++;
				}
			}
		})
		}

	LoadMore.prototype.place =function place(nodeList){
		var me = this;
		// console.log(nodeList);
		var $nodes = this.renderData(nodeList);  //节点生成后添加到页面上

		var defereds = [];  //创建存储 defered 对象的数组
		$nodes.find('img').each(function(){
			var defer = $.Deferred();
			$(this).load(function(){
				defer.resolve();
			});   //当每个图片加载完成后，执行 resolve
			defereds.push(defer);
		});
		$.when.apply(null,defereds).done(function() { //当所有的图片都执行 resolve 后，即全部图片加载后，执行下面的内容
			console.log('new images all loaded ...');
			//当节点里的图片全部加载后再使用瀑布流计算，否则会因为图片未加载 item 高度计算错误导致瀑布流高度计算出问题
			me.render($nodes);
		});
	}


	LoadMore.prototype.renderData = function renderData(items){
		var tpl = '',
			cnt = 0,
			$nodes;
		for(var i =0;i<items.length;i++){
			tpl += '<li class="item">';
			tpl += ' <a href="'+ items[i].url +'" class="link"><img src="' + items[i].img_url + '" alt=""></a>';
			tpl += ' <h4 class="header">'+ items[i].short_name +'</h4>';
			tpl += '<p class="desp">'+items[i].short_intro+'</p>';
			tpl += '</li>';
		}
		$nodes = $(tpl);
		$('#pic-ct').append($nodes);
		return $nodes;
	}

	LoadMore.prototype.render =function render($nodes){
		var me = this;
		var nodeWidth = $nodes.outerWidth(true);
		var colNum = parseInt($('.wrap').width()/nodeWidth); //确定列数
		if(this.colSumHeight.length==0){
		  for(var i = 0;i<colNum;i++){
			this.colSumHeight.push(0);
		  }
		}

		$nodes.each(function(){
		var $cur = $(this);
			// $(this).find('img').on('load',function(){
				var idx = 0,
					minSumHeight = me.colSumHeight[0];
				for(var i=0;i<me.colSumHeight.length;i++){
					if(me.colSumHeight[i]<minSumHeight){
						idx = i;
						minSumHeight = me.colSumHeight[i];
					}
				}

				$cur.css({
					left:nodeWidth*idx,
					top:minSumHeight
				})
				me.colSumHeight[idx] = $cur.outerHeight(true) + me.colSumHeight[idx];
				$('#pic-ct').height(Math.max.apply(null,me.colSumHeight));

		// })

			})

	}
	return LoadMore;
})