// 代码1
function getInfo(name, age, sex) {
  console.log('name', name);
  console.log('age', age);
  console.log('sex', sex);
  console.log(arguments);
  arguments[0] = 'valley';
  console.log('name', name);
}
getInfo('hunger', 28, '男');
/*
name hunger
age 28
sex 男
["hunger", 28, "男"]
name valley
*/
getInfo('hunger', 28);
/*
name hunger
age 28
sex undefined
["hunger", 28]
name valley
*/
getInfo('男');
/*
name 男
age undefined
sex undefined
[“男"]
name valley
*/

//代码2
function sumOfSquares() {
  var sum = 0;
  console.log(arguments);
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i]*arguments[i];
  }
  return sum;
}

//代码3
console.log(a);  //Undefined  变量声明提升
var a = 1;
console.log(b); //Error,变量b为定义

//类似代码
var a;
console.log(a);
a = 1;
console.log(b);

//代码4
sayName('world');  // hello world
sayAge(10); //Error
function sayName(name) {
  console.log('hello', name);
}
var sayAge = function(age) {
  console.log(age);
};
//类似代码
function sayName(name) {
  console.log('hello', name);
}
var sayAge;
sayName('world');
sayAge(10);
sayAge = function(age) {
  console.log(age);
};

//代码5
function fn() {}
var fn = 3;
console.log(fn);  // 3  当在同一个作用域内定义了名字相同的变量和方法的话，变量的赋值会覆盖方法的赋值

//代码6
function fn(fn2) {
  console.log(fn2);
  var fn2 = 3;
  console.log(fn2);
  console.log(fn);
  function fn2() {
    console.log('fnnn2');
  }
}
fn(10);

类似代码
function fn(fn2) {
  var fn2;
  function fn2() {
    console.log('fnnn2');
  }
  console.log(fn2);
  fn2 = 3;
  console.log(fn2);
  console.log(fn);
}
fn(10);

/*
function fn2() {
  console.log('fnnn2');
}
3
function fn(fn2) {
  console.log(fn2);
  var fn2 = 3;
  console.log(fn2);
  console.log(fn);
  function fn2() {
    console.log('fnnn2');
  }
}
*/

//代码7

var fn = 1;
function fn(fn) {
  console.log(fn);
}
console.log(fn(fn)); //Error  fn是Number 1,不是方法 当在同一个作用域内定义了名字相同的变量和方法的话，变量的赋值会覆盖方法的赋值

//代码8
console.log(j); //Undefined
console.log(i); //Undefined
for (var i = 0; i < 10; i++) {
  var j = 100;
}
console.log(i); // 10
console.log(j); // 100

//代码9
fn();
var i = 10;
var fn = 20;
console.log(i);
function fn() {
  console.log(i);
  var i = 99;
  fn2();
  console.log(i);
  function fn2() {
    i = 100;
  }
}

类似代码
var i;
var fn;
function fn() {
  var i;
  function fn2() {
    i = 100;
  }
  console.log(i);
  i = 99;
  fn2();
  console.log(i);
}
fn();
i = 10;
fn = 20;
console.log(i);

/*
Undefined
100
10
*/

//代码10

var say = 0;
(function say(n) {
  console.log(n);
  if(n < 3) return;
  say(n-1);
}(10));
console.log(say);
/*
10
9
8
7
6
5
4
3
2
0
say函数立即执行循环打印，当n=2时退出循环函数执行完毕被回收，say为0
*/
