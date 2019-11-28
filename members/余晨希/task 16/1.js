function isNumber(el){
    return typeof el === 'number';
}
function isString(el){
    return typeof el === 'string';
}
function isBoolean(el){
    return typeof el === 'boolean';
}
function isFunction(el){
    return typeof el === 'function';
}

var a = 2,
    b = "jirengu",
    c = false;
alert( isNumber(a) );  //true
alert( isString(a) );  //false
alert( isString(b) );  //true
alert( isBoolean(c) ); //true
alert( isFunction(a)); //false
alert( isFunction( isNumber ) ); //true