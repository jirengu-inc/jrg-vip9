# 微金所项目实战

## 1. 搭建Bootstrap页面骨架及项目目录结构

```
├─ /weijinsuo/ ··················· 项目所在目录
└─┬─ /css/ ······················· 我们自己的CSS文件
  ├─ /font/ ······················ 使用到的字体文件
  ├─ /img/ ······················· 使用到的图片文件
  ├─ /js/ ························ 自己写的JS脚步
  ├─ /lib/ ······················· 从第三方下载回来的库【只用不改】
  ├─ /favicon.ico ················ 站点图标
  └─ /index.html ················· 入口文件
```

### 1.1.约定编码规范

#### 1.1.1.HTML约定

- 在head中引入必要的CSS文件，优先引用第三方的CSS，方便我们自己的样式覆盖
- 在body末尾引入必要的JS文件，优先引用第三方的JS，注意JS文件之间的依赖关系，比如bootstrap.js依赖jQuery，那就应该先引用jquery.js 然后引用bootstrap.js

#### 1.1.2.CSS约定

- 除了公共级别样式，其余样式全部由 模块前缀
- 尽量使用 直接子代选择器， 少用间接子代 避免错杀



### 1.2.HTML5文档结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>页面标题</title>
</head>
<body>
  
</body>
</html>
```

### 1.3.Viewport设置

```html
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">
```

> html中插入视口设置，可以通过emmet __meta:vp__ 插入

### 1.4.浏览器兼容模式

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```

> html中插入兼容模式设置，可以通过emmet __meta:compat__ 插入

### 1.5.favicon（站点图标）

```html
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
```

> html中插入图标链接，可以通过emmet __link:favicon__ 插入

### 1.6.引入相应的第三方文件

```html
<link rel="stylesheet" href="bootstrap.css">
<link rel="stylesheet" href="my.css">
...
<script src="jquery.js"></script>
<script src="bootstrap.js"></script>
<script src="my.js"></script>
```

### 1.7.在我们默认的样式表中将默认字体设置为：

```css
body{
  font-family: "Helvetica Neue", 
                Helvetica, 
                Microsoft Yahei, 
                Hiragino Sans GB, 
                WenQuanYi Micro Hei, 
                sans-serif;
}
```

## 2.完成页面空结构

> 先划分好页面中的大容器，然后在具体看每一个容器中单独的情况

```html
<body>
  <!-- 头部区域 -->
  <header></header>
  <!-- /头部区域 -->
  <!-- 广告轮播 -->
  <section></section>
  <!-- /广告轮播 -->
  <!-- 特色介绍 -->
  <section></section>
  <!-- /特色介绍 -->
  <!-- 立即预约 -->
  <section></section>
  <!-- /立即预约 -->
  <!-- 产品推荐 -->
  <section></section>
  <!-- /产品推荐 -->
  <!-- 新闻列表 -->
  <section></section>
  <!-- /新闻列表 -->
  <!-- 合作伙伴 -->
  <section></section>
  <!-- /合作伙伴 -->
  <!-- 脚注区域 -->
  <footer></footer>
  <!-- /脚注区域 -->
</body>
```

## 3.构建顶部通栏

```html
<header>
  <div class="topbar"></div>
</header>
```

### 3.1.container类

- 用于定义一个固定宽度且居中的版心

```html
<div class="topbar">
  <div class="container">
    <!--
      此处的代码会显示在一个固定宽度且居中的容器中
      该容器的宽度会跟随屏幕的变化而变化
    -->
  </div>
</div>
```

### 3.2.栅格系统

- Bootstrap中定义了一套响应式的网格系统，
- 其使用方式就是将一个容器划分成12列，
- 然后通过col-xx-xx的类名控制每一列的占比

#### 3.2.1.row类

- 因为每一个列默认有一个15px的左右外边距
- row类的一个作用就是通过左右-15px屏蔽掉这个边距

```html
<div class="container">
  <div class="row"></div>
</div>
```

#### 3.2.2.col-*\*-\*类

- col-xs-[列数]：在超小屏幕下展示几份
- col-sm-[列数]：在小屏幕下展示几份
- col-md-[列数]：在中等屏幕下展示几份
- col-lg-[列数]：在大屏幕下展示几份
- __xs__ : 超小屏幕 手机 (<768px)  
- __sm__ : 小屏幕 平板 (≥768px) 
- __md__ : 中等屏幕 桌面显示器 (≥992px) 
- __lg__ : 大屏幕 大桌面显示器 (≥1200px)

```html
<div class="row">
  <div class="col-md-2 text-center"></div>
  <div class="col-md-5 text-center"></div>
  <div class="col-md-2 text-center"></div>
  <div class="col-md-3 text-center"></div>
</div>
```

> 此处顶部通栏已经被划分成四列
> text-center的作用就是让内部内容居中显示

### 3.2.字体图标

```css
@font-face {
  font-family: 'itcast';
  src: url('../font/MiFie-Web-Font.eot') format('embedded-opentype'), url('../font/MiFie-Web-Font.svg') format('svg'), url('../font/MiFie-Web-Font.ttf') format('truetype'), url('../font/MiFie-Web-Font.woff') format('woff');
}

[class^="icon-"],
[class*=" icon-"] {
  /*注意上面选择器中间的空格*/
  /*我们使用的名为itcast的字体就是上面的@font-face的方式声明的*/
  font-family: itcast;
  font-style: normal;
}

.icon-mobilephone::before{
  content: '\e908';
}
```

```html
<div class="col-md-2 text-center">
  <a class="mobile-link" href="#">
    <i class="icon-mobile"></i>
    <span>手机微金所</span>
    <!-- 这里使用的是bootstrap中的字体图标 -->
    <i class="glyphicon glyphicon-chevron-down"></i>
    <img src="..." alt="">
  </a>
</div>
```

#### 字体文件格式

- eot : embedded-opentype
- svg : svg
- ttf : truetype
- woff : woff

### 3.4.hover图片展示

```css
.mobile-link:hover > img {
  display: block;
}
```

### 3.5.按钮样式生成

- http://blog.koalite.com/bbg/
- 可以通过界面生成一个新的按钮样式

```css
.btn-itcast {
  color: #ffffff;
  background-color: #E92322;
  border-color: #DB3B43;
}

.btn-itcast:hover,
.btn-itcast:focus,
.btn-itcast:active,
.btn-itcast.active,
.open .dropdown-toggle.btn-itcast {
  color: #ffffff;
  background-color: #E92322;
  border-color: #DB3B43;
}

.btn-itcast:active,
.btn-itcast.active,
.open .dropdown-toggle.btn-itcast {
  background-image: none;
}

.btn-itcast.disabled,
.btn-itcast[disabled],
fieldset[disabled] .btn-itcast,
.btn-itcast.disabled:hover,
.btn-itcast[disabled]:hover,
fieldset[disabled] .btn-itcast:hover,
.btn-itcast.disabled:focus,
.btn-itcast[disabled]:focus,
fieldset[disabled] .btn-itcast:focus,
.btn-itcast.disabled:active,
.btn-itcast[disabled]:active,
fieldset[disabled] .btn-itcast:active,
.btn-itcast.disabled.active,
.btn-itcast[disabled].active,
fieldset[disabled] .btn-itcast.active {
  background-color: #E92322;
  border-color: #DB3B43;
}

.btn-itcast .badge {
  color: #E92322;
  background-color: #ffffff;
}
```

### 3.5小屏幕隐藏

```html
<div class="topbar hidden-xs hidden-sm"></div>
```

或者

```html
<div class="topbar visible-md visible-lg"></div>
```

- __hidden-xx__ : 在某种屏幕下隐藏 
- __visible-xx__ : 在某种屏幕尺寸下显示
  + visible-xx-xx：最后一个xx是决定显示时的display到底是啥

## 4.导航通栏

- 在使用了boostrap过后，大多数界面元素都是通过bootstrap提供好的界面组件修改得来

```html
<nav class="navbar navbar-itcast navbar-static-top">
  <div class="container">
    <div class="navbar-header">
      <button id="btn" type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav_list" aria-expanded="false">
        <span class="sr-only">切换菜单</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">
        <i class="icon-icon"></i>
        <i class="icon-logo"></i>
      </a>
    </div>
    <div id="nav_list" class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">我要投资</a></li>
        <li><a href="#">我要借款</a></li>
        <li><a href="#">平台介绍</a></li>
        <li><a href="#">新手专区</a></li>
        <li><a href="#">最新动态</a></li>
        <li><a href="#">微论坛</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right hidden-sm">
        <li><a href="#">个人中心</a></li>
      </ul>
    </div>
  </div>
</nav>
```

### 4.1.Bootstrap扩展

- 通过bootstrap文档对导航条样式的设置发现，其实本身是有一个类似于主题的概念
- navbar-default：默认的外观
- navbar-inverse：暗色背景的样式
- 所以我们希望可以通过自定义一套完整的风格：
  + navbar-itcast

```css
.navbar-itcast{
  ...
}
...具体代码参考navbar-default实现即可
```

### 4.2.品牌logo

- 任然使用字体图标

### 4.3.菜单行高调整

- 默认样式中菜单的行高为20px，我们可以调整为自己想要的高度
- 一般都是通过自己的样式去覆盖

## 5.轮播图

### 5.1.Bootstrap JS插件使用


- 在一个较小屏幕下展示一个超宽的图片，想让图片居中显示
  + 背景图
  + p-a l 50% m-l -width/2

### 5.2.background使用

#### 5.2.1.background-size

- length
  + 如100px 100px
- percentage
  + 如90% 90%
- cover
  + 背景图片的较小边放大到目标大小结束
- contain
  + 相反


### 5.3.图片响应式

- 目的
  + 各种终端都需要正常显示图片
  + 移动端应该使用更小（体积）的图片
- 实现方式



### 5.4.window resize事件




## 6.网站特性

### 6.1.网格系统



### 6.2.媒体对象样式



### 6.3.响应式辅助类型

    - hidden-xx

## 7.预约投标

### 7.1.pull-left



### 7.2.pull-right



## 8.投资产品

### 8.1.Tab选项卡



### 8.2.网格系统



### 8.3.::before



### 8.4.::after



### 8.5.tooltip插件



## 9.新闻资讯

### 9.1.Tab选项卡



### 9.2.响应式偏移



## 10.合作伙伴

### 10.1.相邻兄弟选择器



## 11.登录对话框

### 11.1模态框



### 11.2表单样式



## 12.导航吸顶

### 12.1affix组件



## 13.深度自定义

### 13.1.http://v3.bootcss.com/customize

### 13.2通过 Less 文件修改
