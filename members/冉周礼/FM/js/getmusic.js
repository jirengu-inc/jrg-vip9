function GetMusic($ct) {
    this.$ct = $ct;

    this.init();
    this.bind();
}

GetMusic.prototype.init = function() {
    this.$audio = $('#music');
    this.audio = $('#music')[0];
    this.$panel = this.$ct.find('.panel');
    this.$channels = this.$ct.find('.channels');
    this.$channelBtn = this.$ct.find('.channel-btn');
    this.$channelsList = this.$ct.find('.channels-list');
    this.$onoff = this.$ct.find('.on-off');
    this.$prev = this.$ct.find('.prev');
    this.$next = this.$ct.find('.next');
    this.$songName = this.$ct.find('.title .song-name');
    this.$singer = this.$ct.find('.title .singer');
    this.$rotate = this.$ct.find('.rotate');
    this.$disco = this.$ct.find('.rotate .disco');
    this.$needle = this.$ct.find('.rotate .needle');
    this.$cover = this.$ct.find('.current-cover');
    this.$getLyric = this.$ct.find('.get-lyric');
    this.$lyric = this.$ct.find('.lyric');
    this.$lyricCt = this.$ct.find('.lyric-ct');
    this.$lyricBox = this.$ct.find('.lyric-box');
    this.$lyricBtn = this.$ct.find('.lyric-btn');
    this.channelId = 'public_tuijian_spring';
    this.Song = {};
    this.currentTiemSec = 0;
    this.lyricTimeArr = [];
    this.islyricShow = false;
    this.letsPlay = false;
    this.SongArr = [];
}

GetMusic.prototype.bind = function() {
    this.channelsIconChange();
    this.channelSelect();
    this.panelReady();
    this.rotateCtrl();
    this.canPlay();
    this.autoPlay();
    this.prev();
    this.nextSong();
    this.onOff();
    this.needleChange();
    this.lyricShow();
    this.timeUpdate();
}

GetMusic.prototype.channelsIconChange = function() {
    var _this = this;
    this.$channels.on('mouseover', function() {
        _this.$channelsList.fadeIn(200);
        _this.$channelBtn.removeClass('icon-menu').addClass('icon-minus');
    })
    this.$channels.on('mouseleave', function() {
        _this.$channelsList.fadeOut(200);
        _this.$channelBtn.removeClass('icon-minus').addClass('icon-menu');
    })
}

GetMusic.prototype.channelSelect = function() {
    var _this = this;
    this.$channelsList.on('click', 'li', function() {
        _this.audio.pause();
        $(this).siblings().removeClass('list-selected');
        $(this).addClass('list-selected');
        _this.channelId = $(this).attr('channel-id');
        // _this.SongArr = [];
        _this.letsPlay = true;
        _this.getAndReset(_this.channelId);
    })
}


GetMusic.prototype.panelReady = function() {
    var _this = this;
    this.$ct.ready(function() {
        $.get('http://api.jirengu.com/fm/getChannels.php')
            .done(function(channelsStr) {
                var channelsArr = JSON.parse(channelsStr).channels;
                for (var i = 0; i < channelsArr.length; i++) {
                    var channelName = channelsArr[i].name;
                    var channelID = channelsArr[i].channel_id;
                    var html = '<li channel-id=\"' + channelID + '\" >' + channelName + '</li>';
                    _this.$channelsList.append(html);
                }
                $('.channels-list li').first().addClass('list-selected');
                _this.getAndReset(_this.channelId);
                _this.$disco.toggleClass('active');
                _this.$disco.css('animation-play-state', 'paused');
            })
    })

}
GetMusic.prototype.rotateCtrl = function() {
    var _this = this;
    this.$audio.on('play', function() {
        _this.$disco.css('animation-play-state', 'running');
    })
    this.$audio.on('pause', function() {
        _this.$disco.css('animation-play-state', 'paused');
    })
}
GetMusic.prototype.canPlay = function() {
    var _this = this;
    this.$audio.on('canplay', function() {
        if (_this.letsPlay) {
            _this.audio.play();
        };
        _this.letsPlay = false;
    })
}
GetMusic.prototype.autoPlay = function() {
    var _this = this;
    this.$audio.on('ended', function() {
        _this.letsPlay = true;
        _this.getAndReset(_this.channelId);
    })

}


// 上一曲
GetMusic.prototype.prev = function() {
    var _this = this;
    this.$prev.on('click', function() {
        if (_this.SongArr.length > 1) {
            _this.SongArr.pop();
            _this.songReset(_this.SongArr[_this.SongArr.length - 1]);
            _this.letsPlay = true;

        }
    })
    this.$prev.on('mousedown', function() {
        _this.audio.pause();

    })
}


// 下一曲
GetMusic.prototype.nextSong = function() {
    var _this = this;
    this.$next.on('click', function() {
        _this.letsPlay = true;
        _this.getAndReset(_this.channelId);
    })
    this.$next.on('mousedown', function() {
        _this.audio.pause();

    })

}

GetMusic.prototype.getAndReset = function(str) {
    var _this = this;
    $.get('http://api.jirengu.com/fm/getSong.php', {
            channel: str
        })
        .done(function(song) {
            _this.Song = JSON.parse(song).song[0];
            _this.songReset(_this.Song);
            _this.SongArr.push(_this.Song);
        })
}
GetMusic.prototype.songReset = function(Song) {
    this.audio.src = Song.url;
    this.audio.load();
    this.audio.currentTime = 0;
    this.lyricReset(Song.sid);
    this.$songName.text(Song.title);
    this.$singer.text(Song.artist);
    this.$cover.css('background-image', 'url(\'' + Song.picture + '\')');
}





// 播放暂停功能
GetMusic.prototype.onOff = function() {
    var _this = this;
    this.$onoff.on('click', function() {
        if (_this.audio.paused) { // 暂停播放的时候
            _this.audio.play();
            if (_this.$onoff.hasClass('icon-start1')) {
                _this.$onoff.removeClass('icon-start1');
            }
            _this.$onoff.addClass('icon-stop');
        } else {
            _this.audio.pause();
            if (_this.$onoff.hasClass('icon-stop')) {
                _this.$onoff.removeClass('icon-stop');
            }
            _this.$onoff.addClass('icon-start1');
        }
    })
    this.$audio.on('play', function() {
        if (_this.$onoff.hasClass('icon-start1')) {
            _this.$onoff.removeClass('icon-start1');
        }
        _this.$onoff.addClass('icon-stop');
    })
    this.$audio.on('pause', function() {
        if (_this.$onoff.hasClass('icon-stop')) {
            _this.$onoff.removeClass('icon-stop');
        }
        _this.$onoff.addClass('icon-start1');
    })
}

//  黑胶指针转动
GetMusic.prototype.needleChange = function() {
    var _this = this;
    this.$audio.on('play', function() {
        _this.$needle.addClass('needle-play');
    })
    this.$audio.on('pause', function() {
        _this.$needle.removeClass('needle-play');
    })
}



//  歌词滚动
GetMusic.prototype.lyricShow = function() {
    var _this = this;
    this.$lyricBtn.on('click', function() {
        if (!_this.islyricShow) {
            _this.$lyricBtn.css('color', '#db4437');
            _this.$lyric.fadeIn(500);
            _this.$rotate.fadeOut(500);
            _this.islyricShow = true;
        } else {
            _this.$lyricBtn.css('color', 'rgba(170, 170, 170, 0.7)');
            _this.$rotate.fadeIn(500);
            _this.$lyric.fadeOut(500);
            _this.islyricShow = false;
        }
    })
}

GetMusic.prototype.lyricReset = function(sidstr) {
    var _this = this;
    $.post('http://api.jirengu.com/fm/getLyric.php', {
            sid: sidstr
        })
        .done(function(lyric) {
            var Lyric = JSON.parse(lyric).lyric;
            $('.lyric-box>p').remove();
            _this.lyricTimeArr = [];
            _this.lyricFormat(Lyric);
        })
}
GetMusic.prototype.lyricFormat = function(str) {
    var html = '';
    var lyricArr = str.split('\n');
    for (var i = 0; i < lyricArr.length; i++) {
        var lyric = lyricArr[i].slice(10, 48);
        if (!lyric) {
            lyric = '-';
        };
        html += '<p class=' + '\"lyric' + i + '\">' + lyric + '</p>';
        this.lyricTimeFormat(lyricArr[i]);
    }
    this.$lyricBox.append(html);
}

GetMusic.prototype.lyricTimeFormat = function(str) {
    var min = parseFloat(str.slice(1, 3));
    var sec = Math.round(min * 60 + parseFloat(str.slice(4, 9)));
    this.lyricTimeArr.push(sec);
}

GetMusic.prototype.timeUpdate = function() {
    var _this = this;
    this.$audio.on('timeupdate', function() {
        if (_this.currentTiemSec != Math.round(_this.audio.currentTime)) {
            _this.currentTiemSec = Math.round(_this.audio.currentTime);
            _this.lyricBoxMove(_this.currentTiemSec);
        }
    })

}

GetMusic.prototype.lyricBoxMove = function(num) {
    for (var i = 1; i < this.lyricTimeArr.length; i++) {
        if (num === this.lyricTimeArr[i]) {
            var Top = 80 - i * 40 + 'px';
            var lightClass = '.lyric' + i;
            $(lightClass).siblings().removeClass('light-lyric');
            $(lightClass).addClass('light-lyric');
            this.$lyricBox.animate({
                top: Top
            }, 300);
        }
    }
}
