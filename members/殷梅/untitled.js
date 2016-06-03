网页乱码的问题是如何产生的？
	 文件保存成GBK格式，但是<head>标签里面是UTF8.反之亦然
颜色有几种写法， 红色、 绿色、蓝色、白色、黑色如何表示？ 透明黑色如何表示？#ccc的颜色， #eee的颜色？ #333的颜色？
	red; //直接以颜色名指定}
	rgd(80%, 40%, 0%); //按红，绿，蓝百分比数指定}
	rgd(204, 102, 0); //按0~255的红，绿，蓝分量值指定}
	#cc6600; //使用一个十六进制码指定，可简写为#c60}​﻿​

	红色表示方法：字母：red
                十六进制：#ff0000 或f00
                RGB：（255，0，0）
     蓝色表示方法：字母：blue
				十六进制：#0000ff或00f
				RGB：（0，0，255）
	 白色表示方法：字母：white
				十六进制：#ffffff或fff
				RGB：（255，255，255）
	黑色表示方法：字母：black
				十六进制：#000000或00
				RGB：（0，0，0）

	透明黑色：
	body {background-color: rgda(0, 0, 0, 0.3)
 //RGBA颜色值是RGB颜色值alpha通道的延伸 - 指定对象的透明度。
 //RGBA（红，绿，蓝，alpha）。 Alpha参数是一个介于0.0（完全透明）和1.0（完全不透明）之间的参数。}​﻿​

 #ccc的颜色， #eee的颜色， #333的颜色？

#ccc等于#CCCCCC（即 R 204 G 204 B 204），灰色，银灰或者灰白﻿​
#eee等于#EEEEEE（即 R 238 G 238 B 238），浅灰色
#333等于#333333（即 R 51 G 51 B 51），深灰黑色

<!doctype html>的作用是什么？
       1. doctype 作用就是用来激活各种渲染模式！

          我们可以使用不同的 doctype 来激活不同的模式，现在最常用的有两个：

          第一种是 html5 的 doctype，激活标准模式

<!DOCTYPE html>
          第二种是 XHTML 1.0 用于过渡的 doctype，它会激活准标准模式

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/x﻿​


严格模式和混杂模式指什么?
Doctype可声明三种DTD类型，分别表示严格版本、过渡版本以及基于框架的 HTML 文档。

当浏览器厂商开始创建与标准兼容的浏览器时，他们希望确保向后兼容性。为了实现这一点，他们创建了两种呈现模式：严格模式和混杂模式

严格模式（strict mode）：浏览器以其支持的最高标准呈现页面；

混杂模式（promiscuous mode）：页面以一种比较宽松的向后兼容的方式显示。混杂模式通常模拟老式浏览器的行为以防止老站点无法工作。

     3. 模式触发
         浏览器根据DOCTYPE是否存在以及使用的哪种DTD来选择要使用的呈现方法。

如果XHTML、HTML 4.01文档包含形式完整的DOCTYPE，那么它一般以标准模式呈现。

包含过渡DTD和URI的DOCTYPE也导致页面以标准模式呈现，但是有过渡DTD而没有URI会导致页面以混杂模式呈现。

DOCTYPE不存在或形式不正确会导致HTML和XHTML文档以混杂模式呈现。

      html5既然没有DTD，也就没有严格模式与混杂模式的区别，html5有相对宽松的语法，实现时，已经尽可能大的实现了向后兼容。

<meta>有什么作用，常见的值有哪些？

     <meta> 元素可提供有关页面的元信息（meta-information），比如针对搜索引擎和更新频度的描述和关键词。

     <meta> 标签位于文档的头部，不包含任何内容。<meta> 标签的属性定义了与文档相关联的名称/值对。

      必需的属性

属性	值	描述
content	some_text	定义与 http-equiv 或 name 属性相关的元信息

常见的浏览器内核总结：
浏览器	内核
IE浏览器（IE4以上）	Trident内核（IE内核）
Mozilla Firefox	Gecko
Google Chrome	前期webkit（苹果），如今blink
Opera	blink
Safari	webkit
搜狗浏览器

傲游浏览器

QQ浏览器

兼容模式（IE：Trident）和高速模式（webkit）
360极速浏览器	基于谷歌（Chromium）和IE内核
360安全浏览器	IE内核
Netscape	Gecko