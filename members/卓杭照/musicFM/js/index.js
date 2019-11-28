//播放控制
var myAudio = $("audio")[0];
var $audio = $('audio');
var $btn1 = $('.btn1');
var $channel=$('.channel');
var _this=this;
var volume = 1.0;
var draging = false;



// 播放/暂停控制
$btn1.on('click',function(){
	if (myAudio.paused) {
		play();
	} else {
		pause();
	}
});
// 播放上一首
$(".btn2").on('click',function(){

	getmusic(channel_id);

});
// 播放下一曲音乐
$(".btn3").on('click',function(){

	getmusic(channel_id);
	
});

function play(){
	myAudio.play();
     $btn1.removeClass('m-play').addClass('m-pause');
}
function pause(){
	myAudio.pause();
	 $btn1.removeClass('m-pause').addClass('m-play');
}

//获取频道信息
function getChannel(){
	$.ajax({
		 url: 'http://api.jirengu.com/fm/getChannels.php',
		 dataType: 'json',
		 Method: 'get',
		 success: function(response){
		 	_this.appendChannel(response.channels);
		 }
	})
	getmusic();
}

function appendChannel(data){
	var html='';
	for(i=0;i<data.length;i++){
		html += '<li' +' channel_id='+data[i].channel_id+'>'+data[i].name+'</li>';
	};
	$channel.append(html);
}

$('.m-xiangmu').on('click',function(){
	$channel.animate({'left':'0px'},500);
})
$channel.on('click','li',function(){
	$('.channel .m-channel').removeClass('m-channel m-icon');
	$(this).addClass('m-channel m-icon');
	getmusic($(this).attr('channel_id'));
	$channel.animate({'left':'-137px'},500);
})
$channel.on('mouseleave',function(){
	$channel.animate({'left':'-137px'},500);
})
// 通过ajax获取歌曲
function getmusic(channel_id){
	_this.channel_id = channel_id;
	$.ajax({
		url: 'http://api.jirengu.com/fm/getSong.php',
		dataType: 'json',
		type: 'get',
		data:{
		      channel: channel_id
		    },
		success: function (ret) {
		   var resource = ret.song[0],
		       url = resource.url,
		       bgPic = resource.picture,
		       sid = resource.sid,//
		       ssid = resource.ssid,//
		       title = resource.title,
		       author = resource.artist;
	       $audio.attr('src',url);
	       $audio.attr('sid',sid);
	       $audio.attr('ssid',ssid);
	       $('.musicname').text(title);
	       $('.musicname').attr('title',title)
	       $('.musicer').text(author);
	       $('.musicer').attr('title',author)
	       $(".background").css({
	       		'background':'url('+bgPic+')',
	       		'background-repeat': 'no-repeat',
				'background-position': 'center',
				'background-size': 'cover',
	 		});
	       play();//播放
	       getlyric(sid,ssid);//获取歌词    
	       setTimeout(setDuration,1000);
		}
	})
	
};

//获取歌词
function getlyric(ssid,sid){
	var Sid = $audio.attr('sid');
	var Ssid = $audio.attr('ssid');
	$.ajax({
		url:'http://api.jirengu.com/fm/getLyric.php',
		dataType:'json',
		type:'get',
		data:{
			ssid:Ssid,
			sid:Sid
		},
	}).done(function (lyr){  
			if(lyr.lric === false)return;
	        $('.music-lyric .lyric').empty();	//清空歌词信息
	        var line = lyr.lyric.split('\n'),	//歌词为以排数为界的数组
             	timeReg = /\[\d{2}:\d{2}.\d{2}\]/g,	//时间的正则
            	 result = [];
                if(line != ""){
                    for(var i in line){			//遍历歌词数组
                        var lyricTime = line[i].match(timeReg);	//时间数组
                        var lyricText = line[i].replace(timeReg,"");// 纯歌词数组

                        for(j in lyricTime){			//遍历时间数组
                            var t = lyricTime[j].slice(1,9).split(':');//分析时间  时间的格式是[00:00.00] 分钟和毫秒是t[0],t[1]
                            //把结果做成数组 result[0]是当前时间，result[1]是纯歌词
                            

                            var timeArr = parseInt(t[0])*60 + parseFloat(t[1]); 

                            //计算出一个curTime s为单位
                            result.push([timeArr, lyricText]);
                        };
                    };
                    console.log(result)
                    result.sort(function(a,b){
                    	return a[0]-b[0];
                    })
                };
	            lyricArr = result;//存到lyricArr里面
	            
	            renderLyric(lyricArr);//渲染歌词

        }).fail(function(){
        	$('.music-lyric .lyric').html("<li>本歌曲展示没有歌词</li>");
        });
};

function renderLyric(lyricArr){
	var lyrLi = "";
    for (var i = 0; i < lyricArr.length; i++) {
        lyrLi += "<li data-time='"+lyricArr[i][0]+"'>"+lyricArr[i][1]+"</li>";
    }
    $('.music-lyric .lyric').append(lyrLi);
    setInterval(showLyric,100);
}
function showLyric(){
    var liH = $(".lyric li").eq(5).outerHeight(); //每行高度
    for(var i=0;i< lyricArr.length;i++){//遍历歌词下所有的li
        var curT = $(".lyric li").eq(i).attr("data-time");//获取当前li存入的 当前一排歌词时间
        var nexT = $(".lyric li").eq(i+1).attr("data-time");
        var curTime = myAudio.currentTime;
        if ((curTime >= curT) && (curT < nexT)){		//当前时间在下一句时间和歌曲当前时间之间的时候 就渲染并滚动
            $(".lyric li").removeClass("active");
            $(".lyric li").eq(i).addClass("active");
            $('.music-lyric .lyric').css('top', -liH*(i-5));
        }
    }
}

//进度条控制
$(".time-outline").on('click',function(e){  //拖拽进度条控制进度
	_this.currentTime=((e.pageX-$(this).offset().left)/310)*myAudio.duration;
	myAudio.currentTime=_this.currentTime;
	var timeNumber=_this.dealTime(_this.currentTime);
	$('.time-outline .cur-time').text(timeNumber);
	$('.time-outline .time').css('width',e.pageX-$(this).offset().left);
});

setInterval(setTime,500)	//每0.5秒计算进度条长度
function setTime(){
	var time = myAudio.currentTime/myAudio.duration;
	var timeNumber = this.dealTime(myAudio.currentTime);
	$('.time-outline <div class="cur-time"></div>').text(timeNumber);
	if(time>=1){
		$('.time-outline .time').css('width','0');
		getmusic();
	}else{
		$('.time-outline .time').css('width',310*time);
	}
}
// setTimeout(totalTime,2000)
function setDuration(){
	var timeNumber = this.dealTime(myAudio.duration);
	$('.time-outline .total-time').text(timeNumber);
}
function dealTime(second){
	var second = parseInt(second);
	var min = Math.floor(second/60);
	var sec = second - min*60;
	if(min<10){
		min = 0+String(min);
	}else min = String(min);
	if(sec<10){
        sec=0+String(sec);
    }else sec=String(sec);
    return (min+":"+sec);
}

// 循环按钮
$('.m-star').on('click',function(){
	$(this).toggleClass('stared')
})
$('.m-heart').on('click',function(){
	$(this).toggleClass('loved')
})
$('.m-xunhuan').on('click',function(){
	if (!$audio.attr('loop')) {
		$audio.attr('loop','loop');
		$(this).removeClass('m-xunhuan').addClass('m-danquxunhuan')
	}
	else{
		$audio.removeAttr('loop','no-loop');
		$(this).removeClass('m-danquxunhuan').addClass('m-xunhuan')
	}
})

// 调节音量
$('.music-control .m-volume').on('click',function(){
	$('.music-control .volume-adj').toggle();
})

$('.music-control .volume-adj').on('mouseleave',function(){
	$('.music-control .volume-adj').hide();
})
$('.music-control .volume-outline').on('click',function(e){
	_this.volume = (e.pageX-$(this).offset().left)/100; 
	myAudio.volume = _this.volume;
	if(_this.volume === 0){
		myAudio.volume === 0.0;
	}
	if(_this.volume ===1){
		myAudio.volume === 1.0;
	}
	$('.music-control .volume-light').css('width',_this.volume*100);
})
//歌词开关按钮
$('.m-lyric').on('click',function(){
	 $(this).toggleClass('lyriced');
	 if ($(this).hasClass('lyriced')) {
	 	$('.background .music-lyric').css({'display':'block'})
	 	$(this).removeClass('n-lyric').addClass('m-lyric')
	 }else{
	 	$('.background .music-lyric').css({'display':'none'})
	 	$(this).removeClass('m-lyric').addClass('n-lyric')
	 }

})


$(document).ready(getChannel());