var obj = {
  name: 'hunger',
  sex: 'male',
  age: 28
}
//todo ...
// 输出 name: hunger, sex: male, age:28
results = "";
for (var key in obj) {
   if (obj.hasOwnProperty(key)) {
      results += key+": "+obj[key]+", ";
   }
}
console.log(results);
//http://js.jirengu.com/bufatikubi/1/