    
define(['jquery'],function($){
    function Exposure($target,callback){
        this.$target = $target;
        this.callback = callback;
        this.bind();
        this.check();

    }


    Exposure.prototype.bind = function(){
        var _this = this;
        $(window).on('scroll',function(){
          _this.check()
        })
    }
    Exposure.prototype.check = function(){
        if(this.isShow(this.$target)){
        this.callback(this.$target);
        }
    }
    Exposure.prototype.isShow = function($node){
       var windowHeight = $(window).height(),
        scrollTop = $(window).scrollTop(),
        offsetTop = $node.offset().top,
        nodeHeight = $node.outerHeight(true);
      if(windowHeight+scrollTop>offsetTop && scrollTop<offsetTop+nodeHeight){
        return true
      }else{return false}

    }

    return Exposure;
})