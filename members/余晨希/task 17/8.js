console.log(j);
console.log(i);
for(var i = 0; i < 10; i++){
    var j = 100;
}
console.log(i);
console.log(j);
/*results
undefined
undefined
10
100
*/



/* equals to
var i;
var j;
console.log(j);
console.log(i);
for(var i = 0; i < 10; i++){
    var j = 100;
}
//after the for loop. i becomes 10, j becomes 100
console.log(i); // 10
console.log(j); // 100
*/