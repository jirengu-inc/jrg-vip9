function fn(fn2){
    console.log(fn2);
    var fn2 = 3;
    console.log(fn2);
    console.log(fn);
    function fn2(){
        console.log('fnnn2');
    }
}
fn(10);
/*results
function fn2(){
    console.log('fnnn2');
}
3
function fn(fn2){
    console.log(fn2);
    var fn2 = 3;
    console.log(fn2);
    console.log(fn);
    function fn2(){
        console.log('fnnn2');
    }
}
*/


/*equals to
var fn2 = 10;
fn2 = function(){};
console.log(fn2) // function fn2(){}
fn2 = 3;
console.log(fn2) //3
console.log(fn) // function fu(){}
*/