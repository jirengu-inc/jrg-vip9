// 1.左侧边栏动画效果：
var roomInfor = $(".content_leftbox-baseinformation-guestroom-type")
var roomInforList = $(".content_leftbox-baseinformation li:first-child")
//获取当前元素

var stepInfor = $(".content_leftbox-baseinformation-floormanage")
var stepInforList = $(".content_leftbox-baseinformation li:nth-child(2)")

var producttypeInfor = $(".content_leftbox-baseinformation-product-type")
var producttypeInforList = $(".content_leftbox-baseinformation li:nth-child(3)")

var productInfor = $(".content_leftbox-baseinformation-product")
var productInforList = $(".content_leftbox-baseinformation li:nth-child(4)")

var vipInfor = $(".content_leftbox-baseinformation-vip")
var vipInforList = $(".content_leftbox-baseinformation li:nth-child(5)")

function reset() {
    $(roomInfor).css("display", "none");
    $(stepInfor).css("display", "none");
    // $(producttypeInfor).css("display", "none");
    $(productInfor).css("display", "none");
    $(vipInfor).css("display", "none");
}
//重置页面元素，隐藏所有子菜单


function showRoomInfor() {
    $(roomInfor).slideDown(500);
//滑动动画
    $(stepInfor).css("display", "none");
    $(producttypeInfor).css("display", "none");
    $(productInfor).css("display", "none");
    $(vipInfor).css("display", "none");
    //同时隐藏其他子菜单，避免重复点击
}

function showStepInfor() {
    $(stepInfor).slideDown(500);

    $(roomInfor).css("display", "none");

    $(producttypeInfor).css("display", "none");
    $(productInfor).css("display", "none");
    $(vipInfor).css("display", "none");
}

function showProductTypeInfor() {
    $(producttypeInfor).slideDown(500);

    $(roomInfor).css("display", "none");
    $(stepInfor).css("display", "none");
    $(productInfor).css("display", "none");
    $(vipInfor).css("display", "none");
}

function showProductInfor() {
    $(productInfor).slideDown(500);

    $(roomInfor).css("display", "none");
    $(stepInfor).css("display", "none");
    $(producttypeInfor).css("display", "none");
    $(vipInfor).css("display", "none");
}

function showVipInfor() {
    $(vipInfor).slideDown(500);

    $(roomInfor).css("display", "none");
    $(stepInfor).css("display", "none");
    $(producttypeInfor).css("display", "none");
    $(productInfor).css("display", "none");

}

reset();
roomInforList.click(showRoomInfor);//绑定对应的点击事件
stepInforList.click(showStepInfor);
producttypeInforList.click(showProductTypeInfor);
productInforList.click(showProductInfor);
vipInforList.click(showVipInfor);

// 2.表格可编辑：
$(function (){

  $("tbody td:even").click(function(){
    var tdObj = $(this);
    var oldText = $(this).text();
    var inputObj = $("<input type ='text' value='" + oldText +"'/>");
    inputObj.css("border-width",0);
    inputObj.click(function(){
      return false;
    });
    inputObj.width(tdObj.width());
    inputObj.height(tdObj.height());

    inputObj.css("margin",0);
    inputObj.css("padding",0);
    inputObj.css("text-align","center");
    inputObj.css("font-size","16px");
    inputObj.css("background",tdObj.css("background"));

    tdObj.html(inputObj);

    inputObj.blur(function(){
      var newText = $(this).val();
      tdObj.html(newText);
    });
    inputObj.trigger("focus").trigger("select");
  });
});

$(".add").click(function(){
  $("table").append($("table tr:nth-child(2)").clone(true));
});

$(".del").click(function(){
  $(this).parent().parent().remove();
})
