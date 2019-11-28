var arr = [3,4,5];
var arrLength = arr.length;
var results;
for (var i = 0; i < arrLength; i++){
    if(i === 0){
        results = (arr[i])*(arr[i]);
    }else{
        results += ", "+(arr[i])*(arr[i]);
    }
}
console.log(results);
//http://js.jirengu.com/heholefiwu/1/