var say = 0;
(function say(n){
    console.log(n);
    if(n<3) return;
    say(n-1);
}(10)); 
console.log(say);
/* equals to
var say;
say = function (n) { 
    console.log(n); 
    if(n<3) return;
    say(n-1); 
}
say(10)
say = 0
console.log(say); //0
*/

/*
say is a recursive function. n will decreases until n<3 which is 2
result are:
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
*/