/**
 * Created by dell on 2016/12/9.
 */

    var play = document.getElementById('play');//获取播放暂停按钮
    var frame = document.getElementById('frame');//获取audio元素
    var song;
    var musicList = document.getElementById('music-fm').getElementsByClassName('music-list')[0];

    var musicBg = document.getElementById('music-bg');
    var fliterBg = document.getElementById('fliter-bg');//背景//背景
    var word =musicBg.getElementsByClassName('word')[0];
    var musicName = document.getElementsByClassName('music-name')[0];//名字
    var singerName = document.getElementsByClassName('singer-name')[0];//名字
    var rightTime = document.getElementById('Progress-bar').getElementsByClassName('f-right')[0];
    var leftTime = document.getElementById('Progress-bar').getElementsByClassName('f-left')[0];
    var barNew = document.getElementById('Progress-bar').getElementsByClassName('bar-new')[0];
    var objWord, arrWord;
    var sid = 0;
    var test = '';

    frame.onload = function(){
        song = frame.contentDocument.getElementById('player');
    };



    getChannel();


    //随机获取歌曲===//后获取歌词
    getSong();
    function getSong(){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState===4 && xhr.status===200){
                appendSong(JSON.parse(xhr.responseText));//获取歌曲
                getWords();//获取歌词
                getDuration();//

            }};
        xhr.open('get','http://api.jirengu.com/fm/getSong.php?channel=4','true');
        xhr.send();
    }






    //获取歌曲添加链接函数
    function appendSong(data){
        var url = data.song[0].url,
            picture= data.song[0].picture;
        sid = data.song[0].sid;
        //fliterBg.style='background: url('+picture+') no-repeat;background-size:cover;';//加入背景
        musicName.innerText= data.song[0].title;//加入标题
        singerName.innerText= data.song[0].artist;//加入歌手
        song.src=url;//加入歌曲链接
    }


    //获取歌曲歌词函数
    function getWords() {
        arrWord = [];
        objWord = {};
        var xhr2 = new XMLHttpRequest();
        xhr2.onreadystatechange = function () {
            if (xhr2.readyState === 4 && xhr2.status === 200) {
                var words = JSON.parse(xhr2.responseText).lyric;
                var arr = words.split('\n');
                for(var i= 0;i<arr.length;i++){
                    var rep = /[\[\]]/g;
                    var arrNew = arr[i].split(rep);
                    if(arrNew.length===3){
                        var a =arrNew[1].substr(0, 5);
                        objWord[a]=arrNew[2];
                    }
                    else if(arrNew.length===4) {
                        var c =arrNew[1].substr(0, 5);
                        var b =arrNew[2].substr(0, 5);
                        objWord[c]=arrNew[3];
                        objWord[b]=arrNew[3];
                    }
                }
            }
        };
        xhr2.open('get', 'http://api.jirengu.com/fm/getLyric.php?sid=' + sid, 'true');
        xhr2.send();
    }



        function getChannel(){
            var xhr3 = new XMLHttpRequest();
            xhr3.onreadystatechange = function(){
                if(xhr3.readyState===4 &&xhr3.status===200){
                    var arr= JSON.parse(xhr3.responseText).channels;
                    appendList(arr);
                }
                else{
                    console.log('error');
                }
            };
            xhr3.open('get','http://api.jirengu.com/fm/getChannels.php',true);
            xhr3.send();
        }


    //获取时间

    var duration;
    var overtime;
    var timeNow;
    function getDuration() {//获取时间总长度
        setTimeout(function () {
            var songDuration = song.duration;
            if(isNaN(songDuration)){
                getDuration();
            }else{
                duration = song.duration;
                overTime()
            }
        },0);
    }
    function overTime() {//时间长度转换加入HTML
        var a = parseInt(duration/60);
        if(a<10){
            a = '0'+a;
        }
        var b = (duration%60).toFixed(2);
        if(b<10){
            b = '0'+b;
        }
        var c = (duration%60).toFixed(0);
        if(c<10){
            c = '0'+c;
        }
        overtime = '['+a+':'+b+']';
        rightTime.innerText= a+':'+c;
    }


    setInterval(function(){//时间变化以及进度条
        var times =song.currentTime;
        var a = parseInt(times/60);
        if(a<10){
            a = '0'+a;
        }
        var b = (times%60).toFixed(2);
        if(b<10){
            b = '0'+b;
        }
        var c = (times%60).toFixed(0);
        if(c<10){
            c = '0'+c;
        }
        timeNow =a+':'+c;
        leftTime.innerText= a+':'+c;//时间变化
        var l = 70*(times/duration);
        barNew.style = 'width:'+l+'%;';//进度条变化


        for(var key in objWord){
            if(key ===timeNow){
                if(arrWord.length===0){
                    arrWord.push(objWord[key]);
                }
                else if(arrWord[length-1] !== objWord[key] && objWord[key]!==''){
                    arrWord.push(objWord[key]);
                }
            }
            word.innerText = arrWord[arrWord.length-1]
        }

    },500);



    function appendList(arr){
        var html='';
        for(var i=0;i<arr.length;i++){
            html+='<h2 class="'+arr[i].channel_id+'">'+arr[i].name+'</ h2>';
        }
        musicList.innerHTML=html;
    }





    play.addEventListener('click',function(){
        if(song.paused){
            song.play();
            play.setAttribute('class','iconfont icon-pause')
        }
        else{
            song.pause();
            play.setAttribute('class','iconfont icon-bofang')
        }
    });



