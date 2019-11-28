var fnArr = []
for(var i = 0;i < 10; i++) {
  fnArr[i] = function() {
    return i
  }
}
console.log(fnArr[3]())

//==============等同于=============================

var fnArr = []
var i = 0
fnArr[0] = function() {
  return i
}

var i = 1
fnArr[1] = function() {
    return i
  }
//…………
var i = 3
fnArr[3] = function() {
    return i
  }
//…………
var i = 9
fnArr[9] = function() {
    return i
  }

var i = 10

console.log(fnArr[3]())
//==============与下面对比==========================

var fnArr = []
for(var i = 0;i < 10; i++) {
  (function(n) {
    fnArr[n] = function() {
      return n
    }
  })(i)
}
console.log(fnArr[3]())

//================等同于============================

var fnArr = []


var i = 3
  (function(n) {
    fnArr[n] = function() {
      return n
    }
  })(3)



console.log(fnArr[3]())
