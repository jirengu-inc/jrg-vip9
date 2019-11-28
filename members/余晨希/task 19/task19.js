// 如下代码的输出? 为什么?
var obj1 = {a:1, b:2};
var obj2 = {a:1, b:2};
console.log(obj1 == obj2);
console.log(obj1 = obj2);
console.log(obj1 == obj2);
//输出：
// false
// Object(a:1, b:2)
// true
//obj1 和 obj2 开始时指向不同的地址。 所以第一个obj1和obj2不同。 让 obj1 = obj2 则让 obj1 的指针指向 obj2 的地址。 所以这个时候 obj1 == obj2 为真。

//写一个函数getIntv，获取从当前时间到指定日期的间隔时间
var str = getIntv("2016-08-20");// 这种写法表示的时间是UTC时间。 如果要用当地时区的时间，请用 "August 20, 2016"
console.log(str);  
function getIntv(date){
    var future = Date.parse(date);
    if(future === NaN) {
        console.log("日期格式不对");
        return;
    }
    var now = Date.now();
    var duration = future - now;
    if(duration < 0){
        console.log("请提供将来的日期");
        return;
    }
    return "据 " + date + " 还有 " + Math.floor(duration / 86400000) + " 天 " + Math.floor((duration % 86400000) / 3600000) + " 小时 " + Math.floor(((duration % 86400000) % 3600000) / 60000) + " 分 " + Math.floor((((duration % 86400000) % 3600000) % 60000) / 1000) + " 秒"
}

//把数字日期改成中文日期
var str = getChsDate('2015-01-08');
console.log(str);  // 二零一五年一月八日
function getChsDate(date) {
    var chstr = "零一二三四五六七八九";
    var chr;
    var result ="";
    var dateArr = date.split('-');
    var monthInt = parseInt(dateArr[1], 10);
    var dayInt = parseInt(dateArr[2], 10);
    if(monthInt > 12 || monthInt < 1){
        console.log("wrong month");
        return;
    }
    if(dayInt > 31 || dayInt < 1){
        console.log("wrong day");
        return;
    }
    for(var i = 0; i < 4; i ++){
        result += chstr.charAt(dateArr[0].charAt(i));
    }
    result += "年";
    result += twoDigitsChs(monthInt);
    result += "月";
    result += twoDigitsChs(dayInt);
    result += "日"


    return result;
}
function twoDigitsChs (twoDigitsNum) {
    var chstr = "零一二三四五六七八九";
    if(twoDigitsNum < 10) {
        return chstr.charAt(twoDigitsNum);
    } if (twoDigitsNum < 20) {
        return "十" + chstr.charAt(twoDigitsNum % 10);
    } else {
        return chstr.charAt(Math.floor(twoDigitsNum / 10)) + "十" + chstr.charAt(twoDigitsNum % 10);
    }
}

//写一个函数获取n天前的日期
function getLastNDays(days) {
    var now = Date.now();
    var daysToMillisec = days * 86400000;
    var dateBefore = now - daysToMillisec;
    if(dateBefore < 0){
        console.log("Can't get date before 1970-01-01 UTC");
        return;
    }
    return new Date(dateBefore).toDateString();
}

var lastWeek =  getLastNDays(7); 
console.log(lastWeek);
var lastMonth = getLastNDays(30); 
console.log(lastMonth);

//完善如下代码，用于获取执行时间如：
var Runtime = (function(){
    //code here ...
    var start;
    var end;
    var obj = {
        start: function(){
              //code here ...， 当前时间
              start = Date.now();
              return new Date(start).toString();
        },
        end: function(){
             //code here ...  结束时间
             end = Date.now();
             return new Date(end).toString();
        },
        get: function(){
             //code here ...  获取执行时间
             if(start == undefined || end == undefined){
                 console.log("没有执行 Runtime.start() 或者 Runtime.end()。不能得到执行时间");
             } else if((end - start) < 0) {
                 console.log("Runtime.end() 要在 Runtime.start() 之后执行");
             } else {
                 var time = end - start;
                 start = undefined;
                 end = undefined;
                 return "程序执行了 " + time + " 毫秒。"
             }
        }
    };
return obj;
}());
console.log(Runtime.start());
for(var i = 0; i < 100; i++){console.log(i)};
console.log(Runtime.end());
console.log(  Runtime.get() );

//楼梯有200级，每次走1级或是2级，从底走到顶一共有多少种走法？用代码（递归）实现
function upStairs (steps) {
    if (steps === 2){
        return 2;
    }
    else if (steps === 1){
        return 1;
    }
    else {
        return upStairs(steps-1) + upStairs(steps-2);
    }
}
console.log(upStairs(20));

//写一个json对象深拷贝的方法，json对象可以多层嵌套，值可以是字符串、数字、布尔、json对象中的任意项
function deepCopy (originJson){
    var copyJson = {};
    for (var key in originJson){
        if(!originJson.hasOwnProperty(key)) continue;
        var child = originJson[key];
        if (typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean' || child === null || typeof child === 'undefined') {
            copyJson[key] = child;
        }else if (Array.isArray(child)){
            copyJson[key] = child.slice(0);
        } else if (typeof child === 'object'){
            copyJson[key] = deepCopy(child);
        } else {
            copyJson[key] = undefined;
        }
    }
    return copyJson
}
var jsonExample = {"apiVersion":"2.0",
 "data":{
    "updated":"2010-01-07T19:58:42.949Z",
    "totalItems":800,
    "startIndex":1,
    "itemsPerPage":1,
    "items":[
        {"id":"hYB0mn5zh2c",
         "uploaded":"2007-06-05T22:07:03.000Z",
         "updated":"2010-01-07T13:26:50.000Z",
         "uploader":"GoogleDeveloperDay",
         "category":"News",
         "title":"Google Developers Day US - Maps API Introduction",
         "description":"Google Maps API Introduction ...",
         "tags":[
            "GDD07","GDD07US","Maps"
         ],
         "thumbnail":{
            "default":"http://i.ytimg.com/vi/hYB0mn5zh2c/default.jpg",
            "hqDefault":"http://i.ytimg.com/vi/hYB0mn5zh2c/hqdefault.jpg"
         },
         "player":{
            "default":"http://www.youtube.com/watch?vu003dhYB0mn5zh2c"
         },
         "content":{
            "1":"rtsp://v5.cache3.c.youtube.com/CiILENy.../0/0/0/video.3gp",
            "5":"http://www.youtube.com/v/hYB0mn5zh2c?f...",
            "6":"rtsp://v1.cache1.c.youtube.com/CiILENy.../0/0/0/video.3gp"
         },
         "duration":2840,
         "aspectRatio":"widescreen",
         "rating":4.63,
         "ratingCount":68,
         "viewCount":220101,
         "favoriteCount":201,
         "commentCount":22,
         "status":{
            "value":"restricted",
            "reason":"limitedSyndication"
         },
         "accessControl":{
            "syndicate":"allowed",
            "commentVote":"allowed",
            "rate":"allowed",
            "list":"allowed",
            "comment":"allowed",
            "embed":"allowed",
            "videoRespond":"moderated"
         }
        }
    ]
 }
};
var copyExample = deepCopy(jsonExample, {});
var copyJsonStr = JSON.stringify(copyExample);
console.log(copyJsonStr);