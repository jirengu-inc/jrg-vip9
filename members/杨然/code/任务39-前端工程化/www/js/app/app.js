
//所需组件：轮播（首屏），曝光（About），回到顶部（首页），瀑布流布局（portfolio使用ajax获取新闻图片进行瀑布流布局），导航条固定（head）
define(['jquery', 'app/gotop', 'app/carousel', 'app/stickup', 'app/exposure', 'app/lazy'],
function   ($,        GoTop,       Carousel,       Stickup,       Exposure,       Lazy) {
  var GoTop = new GoTop();

  // $('.carousel').each(function(){
  //   new Carousel($(this));
  // });
  Carousel.init($('.carousel'));

  // $('.head').each(function(){
  //   new Stickup($(this));
  // });
  Stickup.init($('.head'));

  // $('.about-order li').each(function(){
  //   new Exposure($(this));
  // });
  Exposure.init($('.about-order li'));

  Lazy.init($('.portfolio-ct'));
  $('.load').click();

  var $head = $('.head').eq(1);
  $(window).on('scroll', function(){
    if($(this).scrollTop() > 300){
      $head.css("background-color","#000")
    } else {
      $head.css("background-color", "")
    }
  })
});
