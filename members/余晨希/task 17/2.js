function sumOfSquares() {
    var sumOfSquares = 0;
    for(var i = 0; i < arguments.length; i++) {
        if(arguments[i] != undefined){
            sumOfSquares += arguments[i]*arguments[i];
        }
    }
    return sumOfSquares;

}
sumOfSquares(2,3,4);  //29
sumOfSquares(1,3);   //10

//http://js.jirengu.com/sogekirunu/1/