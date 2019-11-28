require("./lib/jquery.min.js");
var Music = (function(){
	var Fm = function(ct){
		this.init(ct);
		
		
	}
	Fm.prototype = {
		init: function(ct){
			this.html = 
	
			'<audio id="audio" autoplay>\
				<source src="" type="audio/mpeg">\
				您的浏览器不支持 audio 元素。\
			</audio>\
			<div class="icon">\
				<i class="iconfont icon-yinle"></i>\
			</div>\
			<div class="fm-warp">\
				<div class="fm-bg">\
				<div class="model">\
					<div class="list">\
						<i class="iconfont icon-liebiao fm-menu"></i>\
						<ul class="style-order">\
							<!-- <li>Channel_id</li> -->\
						</ul>\
					</div>\
					<ul class="lyric">\
						<li class="active">音乐来自百度FM, by 饥人谷</li>\
					</ul>\
				</div>		\
			</div>\
			<div class="fm-data clearfix">\
				<div class="fm-info">\
					<h2 class="fm-title">-</h2>\
					<p class="fm-author">-</p>\
				</div>\
				<div class="fm-shop">\
					<i class="iconfont icon-xiai xiai"></i>\
					<span class="down">下载</span>\
				</div>\
			</div>\
			 <div class="fm-progress">\
			 	<div class="fm-progress-bar">\
			 		<div class="fm-progress-value"></div>\
			 	</div>\
			 	<div class="cur-time">00:00</div>\
			 	<div class="total-time">--:--</div>\
			 </div>\
			<div class="control clearfix">\
				<div class="play-btn">\
					<!-- <i class="iconfont icon-kuaitui pre"></i> -->\
					<i class="iconfont icon-bofang play"></i>\
					<i class="iconfont icon-kuaijin next"></i>\
				</div>\
				<div class="control-btn">\
					<i class="iconfont icon-suiji loop"></i>\
					<i class="iconfont icon-changpian showLyric"></i>\
					<span class="fm-volume">\
						<div class="fm-volume-bg">\
								<div class="fm-volume-bar">\
									<div class="fm-volume-value"></div>\
								</div>\
								<div class="horn"></div>\
						</div>\
						<i class="iconfont icon-shengyin volume"></i>\
					</span>\
				</div>\
			</div>\
			</div>'
			,

		    this.$ct = ct,
		    this.create();
			this.$volume = this.$ct.find('.volume'),
			this.$volumeCt = this.$ct.find('.fm-volume'),
			this.$volBg = $volBg = this.$ct.find('.fm-volume-bg'),
			this.$play = this.$ct.find('.play'),
			this.audio = audio = document.getElementById('audio'),
			this.$volVal = $('.fm-volume-value'),
			this.$volBar = $('.fm-volume-bar'),
			this.$bgImg = this.$ct.find('.fm-bg'),
			this.$title = this.$ct.find('.fm-title'),
			this.$author = this.$ct.find('.fm-author'),
			this.$next = this.$ct.find('.next'),
			// this.pre = this.ct.find('.pre'),
			this.$loop = this.$ct.find('.loop'),
			this.$lyricBtn = this.$ct.find('.showLyric'),
			this.$menuBtn = this.$ct.find('.fm-menu'),
			this.$fmOrder = this.$ct.find('.style-order'),
			this.$down = this.$ct.find('.down'),
			this.$like = this.$ct.find('.xiai'),
			this.$lyric = $lyric= this.$ct.find('.lyric'),
			this.$lyricLi = $lyricLi = this.$lyric.find('.active'),
			this.$lyricTop = $lyricTop = parseInt($lyric.css('top')),
			this.$progressBar = $progressBar = this.$ct.find('.fm-progress-bar'),
			this.$progressVal = $progressVal = this.$ct.find('.fm-progress-value'),
			this.$model = this.$ct.find('.model'),
			this.$totalTime = $totalTime =  this.$ct.find('.total-time'),
			this.$playTime = $playTime = this.$ct.find('.cur-time'),
			this.$icon = $icon = this.$ct.find('.icon'),
			this.$warp = $warp = this.$ct.find('.fm-warp'),
 			this.downUrl = '',
			this.channelId =  '',
			this.timer,
			

			this.curVol = 0.8 * 100,
			this.audio.volume = 0.8,
			this.sid = -1;

			
			this.$volVal.height(100 - this.curVol + '%');

			this.randomSong();
			this.bind();
			this.getChannels();
			this.$volBg.hide();
			this.drag();

			
			setInterval(this.playProgress, 500);

		},
		getSong: function(){
			var self = this;
		 	$.ajax({
			  	url: 'http://api.jirengu.com/fm/getSong.php',
			  	type: 'get',
			  	dataType: 'json',
			  	data: {
			  		channel: this.channelId
			  	},
			  	timeout: 2500,
			  }).done(function(res){
				  	if (!res.song[0].url && typeof(res.song[0].url)!="undefined" && res.song[0].url!=0){
					    self.getSong();
					}
			  		self.$bgImg.css('background-image', 'url(' + res.song[0].picture + ')');
			  		$(audio).attr('src', res.song[0].url);
			  		self.$title.text(res.song[0].title).attr('title', res.song[0].title);
			  		self.$author.text(res.song[0].artist);
			  		self.downUrl = res.song[0].url;
			  		self.sid = res.song[0].sid;
			  		self.getLyric();
			 	 });
		},
		randomSong: function(){
			this.channelId = 'public_aaa_bbb';
			this.getSong();
		},
		getLyric: function(){
			var self = this;
			$.ajax({
				url: 'http://api.jirengu.com/fm/getLyric.php',
				type: 'post',
				dataType: 'json',
				data: {
					sid: this.sid
				}
			}).done(function(lyric){
				var lyricArr = lyric.lyric.split('\n'),
					lyricTime = [],
					lyricText = [],
					lyricInitArr = [],
					numArr = [],
					lyricTimeNum = 0,
					timeReg = /\[\d{2}:\d{2}.\d{2}\]/g;
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
				console.log(lyricInitArr)
				self.renderLyric(lyricInitArr);
			});
		},
		renderLyric: function(lyricArr){
			this.$lyric.find('li').empty();
			var html = '';
			for (var i = 0; i < lyricArr.length; i++) {
				html += '<li data-time="' + lyricArr[i].val + '">' + lyricArr[i].text + '</li>';
			}
			this.$lyric.append(html);
			this.$lyricLis = $lyricLis = $('.lyric > li');
			setInterval(this.showLyric, 100);
		},
		showLyric: function(){
			var liH = $lyricLi.outerHeight();
			var num = $lyricTop/liH
			for (var i = 0; i < $lyricLis.length; i++) {
				var curT = $lyricLis.eq(i).attr('data-time');
				var nexT = $lyricLis.eq(i+1).attr('data-time');
				var curTime = this.audio.currentTime;
				if ((curTime >= curT) && (curT < nexT)) {
					$lyricLis.removeClass('active');
					$lyricLis.eq(i).addClass('active');
					$lyric.css('top', -liH * (i-num) + 'px');
				}
			}
		},
		playProgress: function(e){
			$progressVal.css('width', (audio.currentTime / audio.duration) * 100 + '%');
			if(parseInt(audio.duration - (parseInt(audio.duration / 60) * 60)) < 10) {
				$totalTime.html(parseInt(audio.duration / 60) + ':' + '0' + parseInt(audio.duration - (parseInt(audio.duration / 60) * 60)));
			} else {
				$totalTime.html(parseInt(audio.duration / 60) + ':' + parseInt(audio.duration - (parseInt(audio.duration / 60) * 60)));
			}
			
			if (e) {
				$progressVal.css('width', (e.offsetX / $progressBar.outerWidth()) * 100 + '%');
				audio.currentTime = audio.duration * (parseInt($progressVal.css('width')) / parseInt($progressBar.css('width')));
				$playTime.html(parseInt(audio.currentTime / 60) + ':' + parseInt(audio.currentTime - (parseInt(audio.currentTime / 60) * 60)));
				return
			}
			if(parseInt(audio.currentTime - (parseInt(audio.currentTime / 60) * 60)) < 10) {
				$playTime.html(parseInt(audio.currentTime / 60) + ':' + '0' + parseInt(audio.currentTime - (parseInt(audio.currentTime / 60) * 60)));
			} else {
				$playTime.html(parseInt(audio.currentTime / 60) + ':' + parseInt(audio.currentTime - (parseInt(audio.currentTime / 60) * 60)));
			}
		},
		getChannels: function(){
			var self = this;
			$.ajax({
				url: 'http://api.jirengu.com/fm/getChannels.php',
				type: 'get',
				dataType: 'json'
			}).done(function(res){
				var html = '';
				for (var i = 0; i < res.channels.length; i++) {
					html += '<li data-channelid=' + res.channels[i].channel_id + '>' + res.channels[i].name + '</li>';
				}
				self.$fmOrder.append(html);
			});
		},
		setVolume: function(e){
			this.audio.muted = false;
			var curVol = this.curVol;
			this.$volVal.height(100 - curVol + '%');
			this.$volume.removeClass('icon-jingyin')
					    .addClass('icon-shengyin');
			if (($(e.target).hasClass('fm-volume-value') || $(e.target).hasClass('fm-volume-bar')) && e.offsetY >= 0 && e.offsetY <= 100) {
					this.audio.volume = 1 - (e.offsetY / 100);
					this.curVol = this.audio.volume * 100;
					this.$volVal.height(100 - this.curVol + '%');
				} 
			return
		},
		mute: function(){
			if (this.audio.muted != true) {
				this.audio.muted = true;
				this.$volVal.height('100%');
				this.$volume.removeClass('icon-shengyin')
						   .addClass('icon-jingyin');
			} else {
				this.audio.muted = false;
				var curVol = this.curVol;
				this.$volVal.height(100 - curVol + '%');
				this.$volume.removeClass('icon-jingyin')
						   .addClass('icon-shengyin');
			}			
		},
		play: function(){
			if (this.audio.paused != true) {
				this.audio.pause();
				this.$play.removeClass('icon-bofang')
					 	 .addClass('icon-zanting');
			} else {
				this.audio.play();
				this.$play.removeClass('icon-zanting')
					 	 .addClass('icon-bofang');
			}
		},
		loop: function(){
			var $audio = $(this.audio);
			if (this.$loop.hasClass('icon-suiji')) {
				$audio.attr('loop', 'loop');
				this.$loop.removeClass('icon-suiji')
						   .addClass('icon-danquxunhuan');
			} else {
				$audio.removeAttr('loop');
				this.$loop.removeClass('icon-danquxunhuan')
						   .addClass('icon-suiji');
			}
		},
		drag: function(){
			var top,
				left,
				setTop,
				setLeft,
				flag,
				self = this;
			this.$ct.on('mousedown', function(e){
				$this = $(this);
				flag = 1;
				top = e.pageY - $this.offset().top;
				left = e.pageX - $this.offset().left;
		        maxX = $(window).width() - $this.outerWidth(),
		        maxY = $(window).height() - $this.outerHeight();
			});
			$(document).on('mouseover', function(e){
				if (flag) {
					setTop = e.pageY - top;
					setLeft = e.pageX - left;
					if (setTop < 0) { setTop = 0 }
					if (setLeft < 0) { setLeft = 0 }
					if (setTop > maxY) { setTop = maxY }
					if (setLeft > maxX) { setLeft = maxX }
					self.$ct.css({
						top: setTop,
						left: setLeft
					});
				}
			});
			$(document).on('mouseup', function(e){
				if (self.$warp.css('display') === 'none' && !$(e.target).hasClass('icon-yinle') && flag) {
					self.$ct.css({
						top: e.pageY,
						left: e.pageX
					});
				}
				$(this).off('mousemove')
				flag = 0;
			});
		},
		bind: function(){
			var self = this;
			this.$play.on('click', function(){
				self.play();
			});
			this.$volume.on('click', function(){
				self.mute();
			});
			this.$down.on('click', function(){
				window.location.href = self.downUrl;
			});
			$(this.audio).on('ended', function(){
				self.getSong();
			});
			$(this.audio).on('error', function(){
				self.getSong();
			});
			this.$fmOrder.on('click', function(e){
				self.channelId = $(e.target).data('channelid');
				self.getSong();
			});
			this.$fmOrder.on('mouseover', function(){
				clearInterval(self.timer);
			});
			this.$fmOrder.on('mouseleave', function(){
				var self = this;
				setTimeout(function(){
					$(self).animate({ 'left': '-72px'});
				}, 500);
			});
			this.$menuBtn.on('click', function(){
				self.$fmOrder.animate({ 'left': '-10px'});
			});
			this.$next.on('click', function(){
				self.getSong();
			});
			this.$loop.on('click', function(){
				self.loop();
			});
			this.$like.on('click', function(){
				$(this).css('color', 'red');
			});
			this.$volumeCt.hover(function(){
				self.$volBg.fadeIn('fast');
			}, function(){
				setTimeout(function(){
					self.$volBg.fadeOut('fast');
				}, 500);
			});
			this.$volBg.on('click', function(e){
				var event = e;
				self.setVolume(event);
			});
			this.$progressBar.on('click', function(e){
				var event = e;
				self.playProgress(event);
			});
			this.$lyricBtn.on('click', function(){
				self.$lyric.toggle();
				self.$model.toggle('');
			});
			this.$icon.on('click', function(){
				self.$warp.slideToggle(500);
			});
		},
		create: function(){
			var html = this.html;
			$('head').append('<link rel="stylesheet" href="css/fm.css">');
			$('head').append('<link rel="stylesheet" href="icon/iconfont.css">');
			this.$ct.append(html);
			console.log(html)
		}
	}	
	return {
		init: function($node){
			$node.each(function(index, node){
				new Fm($(node));
			});
		}
	}
})();
module.exports = Music;



