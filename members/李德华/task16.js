// 代码1
function isNumber(el) {
  return el instanceof Number;
}

function isString(el) {
  return el instanceof String;
}

function isBoolean(el) {
  return el instanceof Boolean;
}

function isFunction(el) {
  return el instanceof Function;
}

// 代码2

console.log(1+1);   // 2 Number
console.log("2"+"4");  // 24 String
console.log(2+"4");  // 24 String
console.log(+new Date()); // 距离1970年1月1日 00:00:00的毫秒数
console.log(+("4")); // 4 Number

// 代码3

var a = 1;
a++++a;  // 3

typeof a+2;  // Number

// 代码4

var arr = [3, 4, 5];

for (var a in arr) {
  console.log(arr[a]*arr[a]);
}

// 代码5

var obj = {
  name: 'hunger',
  sex: 'male',
  age: 28
};

for (var a in obj) {
  console.log(a + ":" + obj[a]);
}

// 代码6

console.log(a);  // Underfine
var a = 1;
console.log(a);  // 1
console.log(b); // Error
