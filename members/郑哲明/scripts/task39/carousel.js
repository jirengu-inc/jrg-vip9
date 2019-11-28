function Carousel($node){
    var $pre = $node.find('.pre')
    var $next = $node.find('.next')
    var $nav = $node.find('.slide-nav')
    var _this = this

    this.$node = $node.find('.slide')
    this.$navLi = $node.find('.slide-nav li')
    this.$imageWidth = $node.find('.slide li').first().width()
    this.$pointer = 0
    this.$navIdx = 0
    this.isAnimate = false
    this.$imageCount = this.$node.children().length

    var $firstLi = this.$node.children().first().clone()
    var $LastLi = this.$node.children().last().clone()
    $firstLi.appendTo(this.$node)
    $LastLi.prependTo(this.$node)
    this.$imageRealCount = this.$node.children().length

    this.$node.css({
        left:-this.$imageWidth
    })

//    $pre.on('click',function(){
//        if (_this.isAnimate) return
//        _this.isAnimate = true
//        _this.resetClock()
//        _this.playPre()
//    })
//    $next.on('click',function(){
//        if (_this.isAnimate) return
//        _this.isAnimate = true
//        _this.resetClock()
//        _this.playNext()
//    })
    $nav.on('click',function(e){
        if (e.target.tagName === 'UL') return 
        _this.resetClock()
        _this.$navIdx = $(e.target).index()
        _this.play()
    })
    $(window).on('resize',function(){
        _this.$imageWidth = $node.find('.slide li').first().width()
    })

    this.autoPlay()
}

Carousel.prototype = {
    playPre:function () {
        var $node = this.$node,
            _this = this
        this.$pointer--
        $node.animate({"left":"+=" + _this.$imageWidth},function(){
            if(_this.$pointer === -1) {
                $node.css({"left":-_this.$imageWidth*_this.$imageCount})
                _this.$pointer = _this.$imageRealCount - 3
            }
            _this.isAnimate = false
            _this.setNav(_this.$pointer)
        })
    },
    playNext:function () {
        var $node = this.$node,
            _this = this
        this.$pointer++
        $node.animate({left:'-=' + _this.$imageWidth},function(){
            if(_this.$pointer === (_this.$imageRealCount-2)) {
                $node.css({left : - _this.$imageWidth})
                _this.$pointer = 0
            }
            _this.isAnimate = false
            _this.setNav(_this.$pointer)
        })
    },
    play:function () {
        if(this.$pointer < this.$navIdx) {
            var i = this.$navIdx - this.$pointer
            while(i--) {
                this.playNext()
            }
        } else {
            var j = this.$pointer - this.$navIdx
            while(j--) {
                this.playPre()
            }
        }
    },
    setNav:function (idx) {
        this.$navLi.removeClass('active')
                    .eq(idx).addClass('active')
    },
    autoPlay:function () {
        var _this = this
        _this.clock = setInterval(function(){
            _this.playNext()
        },3000)
    },
    resetClock:function () {
        var _this = this
        clearInterval(_this.clock)
        this.autoPlay()
    }
}

