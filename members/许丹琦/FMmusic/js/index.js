/*
DONE:
- play/pause;
- volume;
- progress bar.

TODO:
- backward/forward;
- repeat/shuffle;
- lyrics;
- playlist.
*/
var audio = document.getElementById('audio');
var progress = document.getElementById('progress');
var playpause = document.getElementById("play");
var replay = document.getElementById("replay");
var volume = document.getElementById("volume");
var time=document.getElementById('times');

audio.controls = false;
// audio.autoplay=true;
audio.addEventListener('timeupdate', function() {
	
  	updateProgress();
	  var	aTime =parseInt(audio.currentTime);
	  var   aLength =parseInt(audio.duration) ; 
	  if(aTime<10){
	  		time.innerHTML='00:0'+aTime+'/00:'+aLength;
	  }else{
	  	 time.innerHTML='00:'+aTime+'/00:'+aLength;
	  }
      
	}, false);

function togglePlay() {
   if (audio.paused || audio.ended) {

      playpause.title = "Pause";
      playpause.innerHTML = '<i>&#xe603;</i>';
      audio.play();
   } else {
      playpause.title = "Play";
      playpause.innerHTML = '<i>&#xe600;</i>';
      audio.pause();
   }
}
function toggleNext() {
	$.ajax({
	  	url: 'http://api.jirengu.com/fm/getSong.php',
	  	type: 'get',
	  	dataType: 'json',
	  	data: {
	  		channel: 'public_aaa_bbb'
	  	},
	  	timeout: 2500,
	  }).done(function(res){
	  		 $('#audio').attr('src', res.song[0].url);
	  		  sid = res.song[0].sid;
			   // console.log(sid);
			   getLyric();
	  		 // console.log(res.song[0].url)
	  		 // console.log(res.song[0].lrc)
	});
	  replayAudio();
	  playpause.title = "Pause";
      playpause.innerHTML = '<i>&#xe603;</i>';
      audio.autoplay=true;
}

function replayAudio(){
	audio.currentTime = 0; 
	ctx.clearRect(0,0,canvas.width,canvas.height);
}


function setVolume() {
   audio.volume = volume.value;
}
var canvas = document.getElementById('progress');
var ctx = canvas.getContext('2d');
function updateProgress() {
	var percent = Math.floor((100 / audio.duration) * audio.currentTime);
	progress.value = percent;		
	var centerX = canvas.width / 2;
	var centerY = canvas.height / 2;
	var radius = 150;	
	var circ = Math.PI;
	var quart = Math.PI / 4;
	var cpercent = percent / 100; /* current percent */
	ctx.beginPath();
	ctx.lineCap='round';
	ctx.arc(centerX, centerY, radius,0, ((circ) * cpercent), false);
	ctx.lineWidth =5;
	ctx.strokeStyle = 'yellow';
	ctx.stroke();
	if(audio.ended){
		resetPlayer();
	}
}

function resetPlayer() {
	audio.currentTime = 0; 
	ctx.clearRect(0,0,canvas.width,canvas.height);
	playpause.title = "Play";
    playpause.innerHTML = '<i>&#xe600;</i>';

 	  /*playpause.title = "Play";
	  playpause.innerHTML = '<i class="fa fa-play fa-3x"></i>';*/
}




		function renderLyric(lyricArr){
			$('.lyric').find('li').empty();
			var html = '';
			for (var i = 0; i < lyricArr.length; i++) {
				html += '<li data-time="' + lyricArr[i].val + '">' + lyricArr[i].text + '</li>';
			}
			$('.lyric').append(html);
			// this.$lyricLis = $lyricLis = $('.lyric > li');
			setInterval(showLyric, 100);
		}

		function showLyric(){
			var Top = $('.lyric').css('top');
			
			var liH = $('.lyric > li').outerHeight();
			
			// console.log($('.lyric').css('top'));
			// console.log(liH)
			var num = 180/liH;
			for (var i = 0; i < $('.lyric > li').length; i++) {
				var curT = $('.lyric > li').eq(i).attr('data-time');
				var nexT = $('.lyric > li').eq(i+1).attr('data-time');
				var curTime = audio.currentTime;
				if ((curTime >= curT) && (curT < nexT)) {
					$('.lyric > li').removeClass('active');
					$('.lyric > li').eq(i).addClass('active');
					$('.lyric').css('top', (-18*i));
					// console.log(Top);
				}
			}
			// console.log(2);
		}

		function getLyric(){

		$.ajax({
				url: 'http://api.jirengu.com/fm/getLyric.php',
				type: 'get',
				dataType: 'json',
				data: {
					sid: sid,
				}
			}).done(function(ret){
				var lyricArr = ret.lyric.split('\n'),
					lyricTime = [],
					lyricText = [],
					lyricInitArr = [],
					numArr = [],
					lyricTimeNum = 0,
					timeReg = /\[\d{2}:\d{2}.\d{2}\]/g;
					console.log(lyricArr)
				for (var i = 0; i < lyricArr.length; i++) {
					lyricText.push(lyricArr[i].replace(timeReg, ''));
					if (!(!lyricArr[i].match(timeReg) && typeof(lyricArr[i].match(timeReg))!="undefined" && lyricArr[i].match(timeReg)!=0)) {
						lyricTime.push(lyricArr[i].match(timeReg));
					} else {
						lyricArr.splice(i, 1);
						i--;
					}
					numArr.push(lyricTime[i][0].slice(1, -1).split(':'));
					lyricTimeNum = parseInt(numArr[i][0] * 60) + parseFloat(numArr[i][1]);
					if (lyricTimeNum === 0.01) {
						continue;
					}
					var obj = { val: 0, text: ''};
					obj.val = lyricTimeNum;
					obj.text = lyricText[i];
					lyricInitArr.push(obj);
				}
				console.log(1)
				$('.lyric').css('top',18);
				renderLyric(lyricInitArr);
			});
		}

