define(['jquery'],function(){
    var $node = $('.about-desp li')
    
    function isVisible(node) {
        var winTop = $(window).scrollTop(),
            winH = $(window).height(),
            referPointH = $(node).offset().top
        if( winTop + winH > referPointH) return true
        return false
    }

    function exportsFadeIn() {
        $(window).on('scroll',function() {
        
            $node.each(function() {
                if(isVisible(this)) {
                    $(this).animate({
                        'opacity':1
                    },800)
                }
            })
        })
    }
    
    return exportsFadeIn
})