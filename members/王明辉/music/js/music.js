"use strict";

var curTimer = null;
// 专辑按钮
var $listBtn = $('#listBtn');
// 专辑容器
var $special = $('#special');
// 图片
var $musicImg = $('#musicImg');
// 歌曲名字
var $musicName = $('#musicName');
// 艺术家
var $artist = $('#artist');
// audio
var $myPlayer = $('#myPlayer');
// 歌词
var $lyric = $('#lyric');
// 总时间
var $totalTime = $('#totalTime');
// 当前时间
var $curTime = $('#curTime');
// 按钮
var $play = $('#play');
var $next = $('#next');
var $love = $('#love');
var $trumpet = $('#trumpet');
// 专辑名字
var $specialName = $('#specialName');
// loading
var $loading = $('#loading');
// 进度条
var $progressBar = $('#progressBar span');
// 音量条
var $soundBar = $('#soundBar span');
var $soundBtn = $('#soundBar em');

// 获取专辑
function special($ele){
    $loading.fadeIn();
    $.ajax({
        url: "http://api.jirengu.com/fm/getChannels.php",
        jsonp: "callback",
        dataType: "jsonp",
        data: {},
        success: function( data ) {
            var data = data.channels;
            var html = '';
            $.each(data,function(key,val){
                html += '<li data-channel_id="'+ val.channel_id +'">'+ val.name +'</li>'
            });
            $ele.append(html);
            $specialName.text(data[0].name);

            $loading.fadeOut();
        }
    });
}

// 获取歌曲信息 专辑: channelId
function getMusic(channelId){
    $loading.fadeIn();
    var channelId = channelId ? channelId :'public_tuijian_spring'

    $.ajax({
        url: 'http://api.jirengu.com/fm/getSong.php',
        type: 'get',
        data:{
            'app_name':'radio_android',
            'version':100,
            'channel':channelId,
            'type':'n'
        },
        success: function (data) {
            var data = JSON.parse(data).song[0]
            $artist.text(data.artist);
            $myPlayer.attr('src',data.url);
            $musicImg.attr('src',data.picture);
            $musicName.text(data.title);

            // 返回当前音频/视频的长度
            $myPlayer.off('canplay').on('canplay',function(){
                //console.log('返回当前音频/视频的长度 +++++ 可以播放了');
                var n = $myPlayer[0].duration;
                var mm = zeroFill(parseInt(n/60))
                var ss = zeroFill(parseInt(n%60));
                $totalTime.text(mm+' : '+ss);
            });
            // 歌词
            getLic(data.sid);
        }
    });
}

// 获取歌词
function getLic(sid){
    $.ajax({
        'url':'http://api.jirengu.com/fm/getLyric.php',
        'type':'get',
        'data':{
            'sid' : sid
        },
        'success':function(data){
            // lrc 歌词
            var lrc = analysisLrc(JSON.parse(data).lyric);
            var arrScrollHeight = [];
            var arrTtanslateHeight = {};
            $lyric.find('ul').html('');

            lrc = lrc.sort(function(a, b){
                return a.timeNum - b.timeNum;
            });


            $.each(lrc,function(i,ele){
                var li =  $(ele.html).appendTo($lyric.find('ul'));
                arrScrollHeight.push($(li).height());

                arrTtanslateHeight[ele.timeNum] = 0;
                for(var j=0; j<arrScrollHeight.length; j++){

                    arrTtanslateHeight[ele.timeNum] += arrScrollHeight[j];
                }
            });
            var h = $lyric.find('ul').height();


            $myPlayer.off('timeupdate').on('timeupdate',function(e){
                //var time = Math.floor(e.timeStamp/1000);
                var time = Math.floor(this.currentTime);
                var endTime = Math.floor($myPlayer[0].duration)
                if(time >= endTime){
                    var channelId = $specialName.attr('data-channel_id')
                    getMusic(channelId);
                    return;
                }
                // 当前时间
                var fen = parseInt(time/60);
                var s = time - fen*60;
                $curTime.text(zeroFill(fen) +' : '+ zeroFill(s));

                // 进度条
                $progressBar.css({'width' : (time/endTime*100).toFixed(2)+'%'});

                $lyric.find('ul').css('transform','translate(-50%,'+ -arrTtanslateHeight[time]/h*100 +'%)');

                // 歌词滚动
                $lyric.find('li').each(function(i,ele){
                    if($(this).attr('data-time') == time){
                        $(this).addClass('active').siblings().removeClass('active');
                        return;
                    }
                });
            });

            $loading.fadeOut();
        }
    });
}

// 解析 lrc歌词
function analysisLrc (lrc){
    var lyrics = lrc.split("\n");// 分解成数组
    var arrHtml = [];
    for(var i = 0; i < lyrics.length; i++){

        var lyric = decodeURIComponent(lyrics[i]);

        // 匹配时间格式: [00:02.69]沧浪之歌、[00:02:69]沧浪之歌、[00:02]沧浪之歌
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;

        // 时间
        var timeRegExpArr = lyric.match(timeReg);

        if(!timeRegExpArr)continue;

        // 把时间替换成空格,只留下歌词
        var clause = lyric.replace(timeReg,'');

        // timeRegExpArr.length === 1;
        for(var num = 0; num < timeRegExpArr.length; num++) {
            var t = timeRegExpArr[num];
            var min = Number(String(t.match(/\[\d*/i)).slice(1));
            var sec = Number(String(t.match(/\:\d*/i)).slice(1));

            var time = min * 60 + sec;

            arrHtml.push({
                html : '<li data-time="'+ time +'">'+ clause +'</li>',
                timeNum :time
            });
        }
    }
    return arrHtml;
}

// 补零
function zeroFill(num){
    return num < 10 ? '0'+num : ''+ num;
}



/* ---------------- 操作 --------------------  */
// 加载专辑
special($special.find('ul'));

// 获取音乐
getMusic('public_tuijian_spring');

// 专辑容器 显示/隐藏
$listBtn.on('click',function(ev){
    //console.log(ev)
    ev.stopPropagation();
    $special.addClass('show');
});

$(document).on('click',function(){
    $special.removeClass('show');
});

// 切换专辑
$special.on('click','li',function(ev){
    var channelId = $(this).attr('data-channel_id');
    getMusic(channelId);
    $specialName.text($(this).text()).attr('data-channel_id',channelId);
});


// 播放按钮
$play.on('click',function(){
    //console.log($(this).is('.stop'))
    if($(this).is('.stop')){
        $myPlayer[0].play();
        $(this).removeClass('stop');
    }else{
        $myPlayer[0].pause();
        $(this).addClass('stop');
    }
});
// 下一首按钮
$next.on('click',function(){
    var channelId = $specialName.attr('data-channel_id')
    getMusic(channelId);
});

// 音量按钮
$trumpet.on('click',function(){
    if($(this).is('.mute')){
        $(this).removeClass('mute');
        $myPlayer[0].muted = false;
    }else{
        $(this).addClass('mute');
        $myPlayer[0].muted = true;
    }
});

$soundBtn.on('mousedown',function(ev){
    ev.stopPropagation();
    var $this = $(this);
    var disX = ev.pageX - parseInt($this.css('left'));

    $(document).on('mousemove',function(ev){
        var x = ev.pageX - disX;
        if(x <= 0){
            $this.css('left' , 0+'px');
            $soundBar.css('width', '0');
            $myPlayer[0].muted = true;
            $trumpet.addClass('mute');
        }else if( x > $soundBar.parent().width() - $soundBtn.width() ){
            $this.css('left' , $soundBar.parent().width() - $soundBtn.width() +'px');
            $soundBar.css('width', '100%');
            $myPlayer[0].muted = false;
            $myPlayer[0].volume = '1';
            $trumpet.removeClass('mute');
        }else{
            $this.css('left' , x+'px');
            console.log(x,$soundBar.parent().width() - $soundBtn.width(),Math.floor(x/($soundBar.parent().width() - $soundBtn.width())))
            $soundBar.css('width', Math.floor(x/($soundBar.parent().width() - $soundBtn.width())*100)+'%');

            $myPlayer[0].muted = false;
            $myPlayer[0].volume = (x/($soundBar.parent().width() - $soundBtn.width())).toFixed(2);
            $trumpet.removeClass('mute');
        }
    });
    $(document).on('mouseup',function(ev){
        $(document).off('mousemove');
        $(document).off('mouseup');

        return false;
    });
});
/* ------------------------------------  */

