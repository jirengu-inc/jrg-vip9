// define(function(){
  var GoTop = function(){
  	this.target;
  	this.createNode();
  	this.bindEvent();
  }
  GoTop.prototype.bindEvent = function(){
   	var _this = this;
    	this.target.addEventListener('click', function(){
    		window.scrollTo(0,0);
    	});
    	window.addEventListener('scroll', function(){
    		if (document.documentElement.scrollTop > 500 || document.body.scrollTop > 500) {
    			_this.target.style.display = 'block';
    		} else {
    			_this.target.style.display = 'none';
    		}
    	})//document.documentElement 为根节点
  }
  GoTop.prototype.createNode = function(){
     	var target = document.createElement('div');
     	this.target = target;
    	this.target.style.cssText = 'display: none; background: #fed136; color:#fff; position:fixed; right:30px; bottom:20px;   padding: 10px;border-radius: 3px;cursor: pointer;'
    	this.target.innerHTML = '回到顶部';
    	document.body.appendChild(this.target);
  }
  // return GoTop;
  var GoTop = new GoTop();
// })


//jquery实现
