var obj = {
  a:1,
  b:2
}
var obj2 = create(obj);
function create(obj){
  if(typeof Object.create === 'function'){
    return Object.create(obj);
  } else {
    function fn(){}
    fn.prototype = obj;
    newObj = new fn();
  }
  return newObj;
}
console.log(obj2.a);//1
