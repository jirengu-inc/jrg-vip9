var data,
    num = 10,
    page = 1,
    idx = 0,
    len = num,
    lock = false,
    clock,
    load = false

function jsonp() {
    var url = 'http://platform.sina.com.cn/slide/album_tech?jsoncallback=getData&app_key=1271687855',
        src = url + '&num=' + num + '&page=' + page,
        script = $('<script><\/script>').appendTo('body').attr('src', src)
    page++
}

function getData(ret) {
    data = ret.data
}

function factory() {
    for (var i = 0; i < len; i++) {
        var item = '<li>' +
                        '<img src="" alt="">' +
                        '<h4></h4>' +
                        '<p></p>' +
                    '</li>',
            $item = $(item)
        $item.children('img').attr('src', data[i].img_url)
        $item.children('h4').text(data[i].short_name)
        $item.children('p').text(data[i].short_intro)
        $item.appendTo('.img-ct')
    }
}


var waterfall = function (e) {
        var wtf = {
            init:function (e) {
                var $ct = $('.img-ct'),
                    $items = $(e).parents('li'),
                    $widthItem = $items.outerWidth(true),
                    $widthCt = $ct.width(),
                    $col = parseInt($widthCt / $widthItem),
                    $colsH = []
                for (var i = 0; i < $col; i++) {
                    $colsH.push(0)
                }
                return {'$colsH':$colsH,'$items':$items,'$widthItem':$widthItem,'$col':$col}
            },
        getMin:function getMin(arr) {
                    var min = arr[0],
                        max = arr[0],
                        idx = 0
                    for (var i = 0; i < $col; i++) {
                        if (arr[i] < min) {
                            min = arr[i]
                            idx = i
                        }
                        if (arr[i] > max) {
                            max = arr[i]
                        }
                    }
                    return {
                        min: min,
                        max: max,
                        idx: idx
                    }
                },
        placeItems:function placeItems() {
                        for (var i = 0; i < $items.length; i++) {
                            var xAxis = this.getMin($colsH).idx * $widthItem,
                                yAxis = this.getMin($colsH).min
                            $items.eq(i).css({
                                left: xAxis,
                                top: yAxis
                            })
                            $colsH[this.getMin($colsH).idx] += $items.eq(i).outerHeight(true)
                            console.log($items[0],$colsH)
                        }
                        return this.getMin($colsH).max + 50
                },
        render:function render(e) {
                    $items = $(e).parents('li')
                    var boxH = this.placeItems()
                    $items.animate({opacity:1},500)
                    return boxH
                },
        colsH:function () {
            console.log($colsH)
                }
        }
        var init = wtf.init(e),
            $colsH = init.$colsH,
            $items = init.$items,
            $widthItem = init.$widthItem,
            $col = init.$col
        return wtf
}


function isVisible(node) {
    var winTop = $(window).scrollTop(),
        winH = $(window).height(),
        referPointH = $(node).offset().top
    if( winTop + winH > referPointH) return true
    return false
}

function tmp() {
    factory()
    $('.img-ct').find('img').on('load',function () {
             if (lock === false ) {
                 lock = true
                 wtf = waterfall(this)
             }
            console.log(1)
             var boxH = wtf.render(this)
             $('.img-ct').height(boxH)
             load = false
        })
}

function loadMore() {
    jsonp()
    $('script').last().on('load',tmp)
}

function exportsWtf () {
    loadMore()

    $('.loadMore').on('click', function() {
        if(!load) {
            load = true
            loadMore()
        }
    })
}
