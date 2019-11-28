// 1.给元素 $node 添加 class active，给元素 $noed 删除 class active
$node.addClass('active');
$node.removeClass('active');

// 2.展示元素$node, 隐藏元素$node
$node.show()
$node.hide()

// 3.获取元素$node 的 属性: id、src、title， 修改以上属性
$node.attr('id')
$node.attr('id', 'newValue')
$node.attr('src')
$node.attr('src', 'newValue')
$node.attr('title')
$node.attr('title','newValue')

// 4.给$node 添加自定义属性data-src
$node.attr('data-src', 'value')

// 5.在$ct 内部最开头添加元素$node
$ct.prepend($node)

// 6.在$ct 内部最末尾添加元素$node
$ct.append($node)

// 7.删除$node
$node.remove()

// 8.把$ct里内容清空
$ct.text('')

// 9.在$ct 里设置 html <div class="btn"></div>
$ct.html('<div class="btn"></div>')

// 10.获取、设置$node 的宽度、高度(分别不包括内边距、包括内边距、包括边框、包括外边距)
$node.width()
$node.height()
$node.innerWidth()
$node.innerHeight()
$node.outerWidth(false)
$node.outerHeight(false)
$node.outerWidth(true)
$node.outerHeight(true)

// 11.获取窗口滚动条垂直滚动距离
$(document).scrollTop()

// 12.获取$node 到根节点水平、垂直偏移距离
$node.offset()

// 13.修改$node 的样式，字体颜色设置红色，字体大小设置14px
$node.css('color', 'red')
$node.css('font-size', '14px')

// 14.遍历节点，把每个节点里面的文本内容重复一遍
$node.each(function(index){
  console.log($(this).text());
})

// 15.从$ct 里查找 class 为 .item的子元素
$ct.find('.item')

// 16.获取$ct 里面的所有孩子
$ct.children()

// 17.对于$node，向上找到 class 为’.ct’的父亲，在从该父亲找到’.panel’的孩子
$node.parents('.ct').find('.panel')

// 18.获取选择元素的数量
$node.length

// 19.获取当前元素在兄弟中的排行
$(this).siblings().index($(this))
