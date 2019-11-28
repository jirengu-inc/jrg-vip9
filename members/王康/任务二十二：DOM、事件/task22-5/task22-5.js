function $(str) {
  return document.querySelector(str);
}
function $$(str) {
  return document.querySelectorAll(str);
}
var btnBoss = $('#btn-boss');
var modal = $('.modal');
var dialogBox = $('.dialog-box');
function hasClass(ele, cls) {
  var reg = new RegExp('\\b' + cls + '\\b','ig');
  return reg.test(ele.className)
}
btnBoss.addEventListener('click', function(){
  modal.style.display = 'block';
})
dialogBox.addEventListener('click', function(e){
  e.stopPropagation();
  if (hasClass(e.target, 'close') || hasClass(e.target, 'cancel')) {
    modal.style.display = 'none';
  }
})
modal.addEventListener('click', function(e){
  modal.style.display = 'none';
})
