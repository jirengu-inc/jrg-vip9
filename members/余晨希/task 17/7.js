var fn = 1;
function fn(fn){
    console.log(fn);
}
console.log(fn(fn)); //Uncaught Type error: fn is not a function


// equals to
// var fn;
// function fn(fn){...}
// fn = 1;
// cosole.log(fn(fn)); // fn is not a function

