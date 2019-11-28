fn();
var i = 10;
var fn = 20;
console.log(i);
function fn(){
    console.log(i);
    var i = 99;
    fn2();
    console.log(i);
    function fn2(){
        i = 100;
    }
}
/*results is
undefined
100
10
*/




/*equals to
var i;
var fn;
function fn(){
  var i;
  function fn2(){
      i = 100;
  }
  console.log(i); // i is undefined
  i = 99;
  fn2(); // i = 100;
  console.log(i) // 100
}
fn(); // undefined
// 100
i = 10;
fn = 20;
console.log(i); // 10
*/