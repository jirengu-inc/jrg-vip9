require.config({
            baseUrl: 'scripts',
            paths: {
                'jquery': 'jquery-3.1.0',
                'goTop': 'task39/goTop',
                'carousel':'task39/carousel',
                'waterfall':'task39/waterfall',
                'fadeIn':'task39/fadeIn'
            },
            shim:{
                goTop:{
                    exports:'GoTop'
                },
                carousel:{
                    deps:['jquery'],
                    exports:'Carousel'
                },
                waterfall:{
                    deps:['jquery'],
                    exports:'exportsWtf'
                }
            }
        })

require(['goTop'],function(GoTop){
    var target = document.createElement('div')
    var ct = document.querySelector('body')
    new GoTop(ct,target)
})

require(['carousel'],function(){
    $('.ct').each(function() {
        new Carousel($(this))
    })
})

require(['waterfall'],function() {
    exportsWtf()
})

require(['jquery'],function(){
    var lock = false
    function navAnimate() {
        var scrollH = $(window).scrollTop()
        if (scrollH >= 100 && !lock) {
            lock = true
            $('.wrap-nav').css({'backgroundColor':'#222'})
                .animate({padding:'10px 0'},300,function(){
            })
        }
        if (scrollH < 100 && lock) {
            lock = false
            $('.wrap-nav').css({'backgroundColor':''})
                .animate({padding:'25px 0'},300,function(){
            })
        }
    }
    $(window).on('scroll',function(){
        navAnimate()
    })
    navAnimate()
})

require(['fadeIn'],function(func){
    func()      //按amd规范定义的模块api，调用时，需向callback传参数；未按amd规范模块则不用。
})