
/*用 splice 实现 push、pop、shift、unshift方法*/
function push(arr,value){// value 只能是一个值 不支持 push(value1,value2....)
    arr.splice(arr.length,0,value);
    //console.log(arr);
    return arr.length;
}
function pop(arr){
    return arr.splice(arr.length-1,1);
}
function shift(arr){
    return arr.splice(0,1);
}
function unshift(arr,value){
    arr.splice(0,0,value);
    return arr.length;
}

/*使用数组拼接出如下字符串*/
var prod = {
    name: '女装',
    styles: ['短款', '冬季', '春装']
};
function getTplStr(data){
    var result = '<dl class="product">';
    result += '<dt>' + data.name + '</dt>';
    for(var i = 0; i < data.styles.length; i++){
        result += '<dd>' + data.styles[i]  + '</dd>';
    }
    result += "</dl>";
    return result;
}
var result = getTplStr(prod);  //result为下面的字符串
// <dl class="product">
//     <dt>女装</dt>
//     <dd>短款</dd>
//     <dd>冬季</dd>
//     <dd>春装</dd>
// </dl>

/*写一个find函数，实现下面的功能*/
var arr = [ "test", 2, 1.5, false ];
function find(arr, testVal){
    for(var i = 0; i < arr.length; i++){
        if (arr[i] === testVal){
            return i;
        }
    }
    return -1;
}
find(arr, "test"); // 0
find(arr, 2); // 1
find(arr, 0); // -1

/*写一个函数filterNumeric，把数组 arr 中的数字过滤出来赋值给新数组newarr， 原数组arr不变 */
arr = ["a", "b", 1, 3, 5, "b", 2];
function filterNumeric(arr){
    var resultArray = [];
    for(var i = 0; i < arr.length; i++){
        if(!isNaN(parseFloat(arr[i])) && isFinite(arr[i])){// 过滤出来的是有理数。 NaN 和 Infinity 不包括在内
            resultArray.push(arr[i]);
        }
    }
    return resultArray;
}
newarr = filterNumeric(arr);  //   [1,3,5,2]

/*对象obj有个className属性，里面的值为的是空格分割的字符串(和html元素的class特性类似)，写addClass、removeClass函数，有如下功能：*/
var obj = {
  className: 'open menu'
};

function addClass(obj, className){//can only supports adding one class name
    var classArray = obj.className.split(" ");
    for(var i = 0; i < classArray.length; i++){
        if( className === classArray[i] ){
            return;
        }
    }
    obj.className = obj.className.concat(" "+className);
}

function removeClass(obj, className){//can only supports removing one class name
    var classArray = obj.className.split(" ");
    for(var i = 0; i < classArray.length; i++){
        if( className === classArray[i] ){
            classArray.splice(i,1);
            break;
        }
    }
    obj.className = classArray.join(" ");
}


addClass(obj, 'new'); // obj.className='open menu new'
console.log(obj.className);
addClass(obj, 'open');  // 因为open已经存在，所以不会再次添加open
console.log(obj.className);
addClass(obj, 'me'); // me不存在，所以 obj.className变为'open menu new me'
console.log(obj.className);  // "open menu new me"

removeClass(obj, 'open'); // 去掉obj.className里面的 open，变成'menu new me'
console.log(obj.className);
removeClass(obj, 'blabla');  // 因为blabla不存在，所以此操作无任何影响
console.log(obj.className);

/*写一个camelize函数，把my-short-string形式的字符串转化成myShortString形式的字符串，如 */
function camelize(str) {
    var strArray = str.split("-");
    if (strArray.length === 1) return str;
    for(var i = 1 ; i < strArray.length; i++){
        strArray[i] = strArray[i].charAt(0).toUpperCase() + strArray[i].slice(1);
    }
    return strArray.join("");
}

console.log(camelize("background-color"));
console.log(camelize("list-style-image"));

/*如下代码输出什么？为什么? */
arr = ["a", "b"];
arr.push( function() { alert(console.log('hello hunger valley')); } );
arr[arr.length-1]();  // hello hunger valley 弹出的alert框显示 undefined

//因为 arr push 了一个匿名函数 function() { alert(console.log('hello hunger valley')) }
//arr[arr.length-1]() 此时为 arr[2]() 也就是 (function() { alert(console.log('hello hunger valley')) })()
//执行 alert(console.log('hello hunger valley'))
//因为 console.log('hello hunger valley') return type 为 undefined 所以 alert 得到的结果为 undefined


/*写一个函数filterNumericInPlace，过滤数组中的数字，删除非数字。要求在原数组上操作 */
arr = ["a", "b", 1, 3, 4, 5, "b", 2];
//对原数组进行操作，不需要返回值
function filterNumericInPlace(arr){
    for(var i = 0; i < arr.length; i++){
        if(typeof arr[i] !== 'number'){
            //console.log(i + " " +arr[i]);
            arr.splice(i,1);
            i--; //每次数组变短要让i复原****
        }  
    }
}
filterNumericInPlace(arr);
console.log(arr);  // [1,3,4,5,2]

/*写一个ageSort函数实现数组中对象按age从小到大排序 */
var john = { name: "John Smith", age: 23 };
var mary = { name: "Mary Key", age: 18 };
var bob = { name: "Bob-small", age: 6 };
var people = [ john, mary, bob ];

function ageSort(arr){
    arr.sort(function compare(a,b){
    return a.age - b.age;
});
}

ageSort(people); // [ bob, mary, john ]


/*写一个filter(arr, func) 函数用于过滤数组，接受两个参数，第一个是要处理的数组，第二个参数是回调函数(回调函数遍历接受每一个数组元素，当函数返回true时保留该元素，否则删除该元素)。实现如下功能： （*/
function isNumeric (el){
    return typeof el === 'number'; 
}

function filter(arr, callback){
    for(var i = 0; i < arr.length; i++){
        if(!callback(arr[i])){
            console.log(i + " " +arr[i]);
            arr.splice(i,1);
            i--; //每次数组变短要让i复原****
        }
    }
    return arr;
}
arr = ["a",3,4,true, -1, 2, "b"];
arr = filter(arr, isNumeric) ; // arr = [3,4,-1, 2],  过滤出数字
arr = filter(arr, function(val) { return  typeof val === "number" && val > 0; });  // arr = [3,4,2] 过滤出大于0的整数

/*写一个 ucFirst函数，返回第一个字母为大写的字符 （*/
function ucFirst(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}
console.log(ucFirst("hunger") == "Hunger"); //true

/*写一个函数truncate(str, maxlength), 如果str的长度大于maxlength，会把str截断到maxlength长，并加上...，如 （*/
function truncate(str, maxlength){
    if(str.length <= maxlength){
        return str;
    }else{
        return str.slice(0, maxlength)+"...";
    }
}
console.log(truncate("hello, this is hunger valley,", 10) == "hello, thi...");
console.log(truncate("hello world", 20) == "hello world");

/*写一个函数，获取从min到max之间的随机数，包括min不包括max （*/
function rand1(min, max){
    return Math.random()* (max - min) + min;
}
/*写一个函数，获取从min都max之间的随机整数，包括min包括max （*/
function rand2(min, max){
    return Math.floor( Math.random()* (max+1-min) + min );
}
/*写一个函数，获取一个随机数组，数组中元素为长度为len，最小值为min，最大值为max(包括)的随机数 （***/
function rand3(len,min,max) {
    var arr = [];
    for(var i = 0; i < len; i++){
        arr.push(Math.floor(Math.random()* (max-min+1)) + min);
    }
    return arr;
}
console.log(rand3(100,1,10));
/*写一个函数，生成一个长度为 n 的随机字符串，字符串字符的取值范围包括0到9，a到 z，A到Z。*/

function getRandStr(len){
  var str = '';
  var dict = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for(var i = 0; i < len; i++){
      str += dict[Math.floor(Math.random()*dict.length)];
  }
  return str;
}
var str = getRandStr(10); // 0a3iJiRZap
console.log(str);