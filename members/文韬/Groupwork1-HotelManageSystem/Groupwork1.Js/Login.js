function changeuserBg() {
    $("#username").css("background-color", "rgba(255,255,0,0.5");
}

function changepassBg() {
    $("#password").css("background-color", "rgba(255,255,0,0.5");
}

function resetBg() {
    $("input").css("background-color", "white");
}

function endLogin() {
    $("header").fadeOut(2000);
    $(".button").fadeIn(2000);
}

function resetLogin() {
    $("header").fadeOut(1);
}

function starLogin() {
    $("header").fadeIn(2000);
    $(".button").fadeOut(1);
}
function inputFirNum(){
  $(".request").text("1")

}
function inputSecNum(){
  $(".request").text("2")
}
function inputThirNum(){
  $(".request").text("3")
}


$("#username").focus(changeuserBg);
$("#username").blur(resetBg);

$("#password").focus(changepassBg);
$("#password").blur(resetBg);

$(".login_btn-end").click(endLogin);
$(".button").click(starLogin);

 $(".btn-1").click(inputFirNum);
 $(".btn-2").click(inputSecNum);
 $(".btn-3").click(inputThirNum);



resetLogin();
