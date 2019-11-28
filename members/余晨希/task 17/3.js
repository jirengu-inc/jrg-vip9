console.log(a);
var a = 1;
console.log(b);
//Undefined
// error: Can't find b
//因为声明前置
//代码相当于：
// var a;
// console.log(a);
// a = 1;
// console.log(b);
//http://js.jirengu.com/jabamelaqe/1/