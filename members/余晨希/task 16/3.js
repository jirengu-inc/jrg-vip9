var a = 1;
a+++a; // ++比+的优
console.log(a+(++a))
console.log((a++)+a)
typeof a+2; // typeof的优先级比+高 所以结果为 "number2"