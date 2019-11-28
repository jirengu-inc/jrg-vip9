//代码1 用 splice 实现 push、pop、shift、unshift方法
//push
function arrayPush(arr, obj) {
  arr.splice(arr.length, 1, obj);
}
//pop
function arrayPop(arr) {
  arr.splice(arr.length - 1, 1);
}
//shift
function arrayShift(arr) {
  arr.splice(0, 1);
}
//unshift
function arrayUnshift(arr, obj) {
  arr.splice(0, 1, obj);
}
//代码2 使用数组拼接出如下字符串
/*
<dl class="product">
    <dt>女装</dt>
    <dd>短款</dd>
    <dd>冬季</dd>
    <dd>春装</dd>
</dl>
*/
var prod = {
  name: '女装',
  styles: ['短款','冬季','春装']
};
function getTpl(data) {
  var arr = [];
  arr.push('<dl class="product"\>');
  arr.push('<dd>' + prod.name + '/<dd>');
  for (var i = 0; i < prod.styles.length; i++) {
    arr.push('<dt>');
    arr.push(prod.styles[i]);
    arr.push('/<dt>');
  }
  arr.push("</dl>");
  return arr.join('');
};
var result = getTpl(prod);

//代码3
var arr = ["test", 2, 1.5, false];
function find(array, object) {
  console.log(array.indexOf(object));
}
find(arr, "test"); //0
find(arr, 2); // 1
find(arr, 0); // -1

//代码4
arr = ["a", 1, 3, 5, "b", 2];
function filterNumeric(arr) {
  return arr.filter(function(item) {
    return typeof item == 'number';
  });
}
newArr = filterNumeric(arr);  //[1, 3, 5, 2]

//代码5 对象obj有个className属性，里面的值为的是空格分割的字符串(和html元素的class特性类似)，写addClass、removeClass函数
var obj = {
  className: 'open menu'
};
function addClass(obj, value) {
  var array = obj.className.split(' ');
  if (array.indexOf(value) < 0) {
    array.push(value);
  }
  obj.className = array.join(' ');
  console.log(obj.className);
}
function removeClass(obj, value) {
  var array = obj.className.split(' ');
  if (array.indexOf(value) >= 0) {
    array.splice(array.indexOf(value), 1);
  }
  obj.className = array.join(' ');
  console.log(obj.className);
}
addClass(obj, 'new'); // obj.className='open menu new'
addClass(obj, 'open'); // 因为open已经存在，此操作无任何办法
addClass(obj, 'me'); // obj.className='open menu new me'
console.log(obj.className); // "open menu new me"
removeClass(obj, 'open'); // obj.className='menu new me'
removeClass(obj, 'blabla'); // 不变
//代码6
function camelize(str) { //写一个camelize函数，把my-short-string形式的字符串转化成myShortString形式的字符串
  var array = str.split('-');
  if (array.length > 1) {
    for (var i = 1; i < array.length; i++) {
      var word = array[i];
      var tmp = word.substring(0, 1);
      console.log(word.substring(1));
      array[i] = tmp.toUpperCase() + word.substring(1);
    }
  }
  return array.join('');
}
camelize("background-color");  //backgroundColor
camelize("list-style-image");  //listStyleImage
//代码7
arr = ["a", "b"];
arr.push( function() {
  alert(console.log('hello hunger valley'))
});
arr[arr.length-1]()  //控制台输出hello hunger valley，弹出undefined的提示框，
//arr[arr.length-1]代表数组的最后一个元素,存储的是一个函数表达式，console.log('hello hunger valley')返回值为undefined

//代码8
arr = ["a", 1, 3, 4, 5, "b", 2]; //写一个函数filterNumericInPlace，过滤数组中的数字，删除非数字
function filterNumericInPlace(array) {
  var tmpArray = array.slice(0);
  tmpArray.forEach(function(item) {
    if (typeof item != 'number') {
      array.splice(array.indexOf(item), 1);
    }
  });
}
filterNumericInPlace(arr);
console.log(arr);

//代码9  按照年龄排序
var john = { name: "John Smith", age: 23};
var mary = { name: "Mary key", age: 18};
var bob = { name: "Bob-small", age: 6};
var people = [john, mary, bob];
function ageSort(array) {
  array.sort(function(a, b){
    if (a.age < b.age) return -1;
    if (a.age > b.age) return 1;
    if (a.age = b.age) return 0;
  });
}
ageSort(people);
//代码10 写一个filter(arr, func) 函数用于过滤数组，接受两个参数，第一个是要处理的数组，第二个参数是回调函数(回调函数遍历接受每一个数组元素，当函数返回true时保留该元素，否则删除该元素)
function isNumeric(el) {
  return typeof el == 'number';
}
var arr = ["a", 3, 4, true, -1, 2, "b"];
function filter(array, callBack) {
  if (!array || array.length==0) {
    return;
  }
  var tmpArray = array.slice(0);
  for (var i = 0; i < tmpArray.length; i++) {
    if (!callBack(tmpArray[i])) {
      array.splice(array.indexOf(tmpArray[i]), 1);
    }
  }
  return array;
}
arr = filter(arr, isNumeric);
console.log(arr);
arr = filter(arr, function(val) {
  return val > 0
});
console.log(arr);
//代码11 写一个 ucFirst函数，返回第一个字母为大写的字符
function ucFirst(str) {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}
//代码12 写一个函数truncate(str, maxlength), 如果str的长度大于maxlength，会把str截断到maxlength长，并加上...
function truncate(str, maxLength) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + "...";
  }
  return str;
}
truncate("hello, this is hunger valley", 10);
truncate("hello world", 20);
//代码13 写一个函数limit2，保留数字小数点后两位，四舍五入
function limit(num) {
  return num = (Math.round(num*100))/100;
}
//代码14 写一个函数，获取从min到max之间的随机数，包括min不包括max
function getRandom(max,min){
    return Math.random()*(max-min)+min;
}
//代码15 写一个函数，获取从min都max之间的随机整数，包括min包括max
function getRandomInt(max,min){
    return Math.floor(Math.random()*(max-min+1)+min);
}
//代码16 写一个函数，获取一个随机数组，数组中元素为长度为len，最小值为min，最大值为max(包括)的随机数
function getRandomArr(len,max,min){
    var arr= [];
    for(var i=0;i<len;i++){
        arr.push(Math.random()*(max-min+1)+min);
    }
    return arr;
}
