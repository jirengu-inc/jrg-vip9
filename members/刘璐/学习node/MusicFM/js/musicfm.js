/**
 * Created by dell on 2016/12/23.
 */
function createMusic(left, top, element) {
    this.voice = 0.75;
    this.objWord = {};
    this.arrWord = [];
    this.volumeHeight = this.voice * 70;
    this.wrap = element;
    this.musicInit();//初始化HTML
    this.fm = $('#fm');
    this.frame = $('#frame');
    this.sportMove(left, top);//图标移动
    this.getSong();//获取歌曲信息
    this.getChannel();//获取频道列表
    this.bindEvent();

}


createMusic.prototype = {
    constructor: createMusic,
    musicInit: function () {
        var html = '<div id="fm"> </div>'
            + '<div id="music-bg">'
            + '<div id="fliter-bg"></div>'
            + '<div class="music-main">'
            + '<div class="music-list"></div>'
            + '<i class="iconfont icon-yinle"></i>'
            + '        <div class="music-author"> '
            + '<i class="iconfont icon-tanhao"></i> '
            + '<i class="author">create by<br>65-liulu</i>'
            + ' </div>'
            + '<h2 class="music-name"></h2>'
            + '<p class="singer-name"></p>'
            + '<div class="wrap">'
            + '<i class="iconfont icon-left"></i>'
            + '<i class="iconfont icon-pause " id="play"></i>'
            + '<i class="iconfont icon-right"></i>'
            + '</div>'
            + '<div>'
            + '<p class="word">.............</p>'
            + '</div>'
            + '<iframe id="frame" src="frame.html" frameborder="0" crossorigin="anonymous"></iframe>'
            + '<div id="volume">'
            + '<span class="volume"></span>'
            + '<span class="volume-new"></span>'
            + '</div>'
            + '<div id="Progress-bar">'
            + '<i class="iconfont icon-shengyin"></i>'
            + '<span class="bar"></span>'
            + '<span class="bar-new"></span>'
            + '<span class="f-left">00:00</span>'
            + '<span class="f-right">00:00</span>'
            + '</div>'
            + '</div>'
            + '</div>';
        html = this.wrap.html() + html;
        this.wrap.html(html);
    },
    sportMove: function (top, left) {
        var clock = true,
            widthMin = 40,
            width = 260,
            height = 425,
            heightMin = 40;
        var musicFm = $('#music-fm')[0];//运动的小球
        var fm = $('#fm')[0];//运动的小球

        musicFm.setAttribute('style', 'position:fixed;width:' + width + 'px;' + 'height:' + height + 'px;top:' + top + 'px;left:' + left + 'px;');


        fm.addEventListener('mousedown', function () {
            clock = false;
        });

        window.addEventListener('mousemove', function move(e) {
            var X = e.clientX;
            var Y = e.clientY;

            if (Y <= 0 && !clock && e.button === 0) {
                musicFm.style.top = 0;
                musicFm.style.left = (X - widthMin / 2) + 'px';
            }
            else if (Y >= (window.innerHeight) && !clock && e.button === 0) {
                musicFm.style.top = window.innerHeight - widthMin + 'px';
                musicFm.style.left = (X - widthMin / 2) + 'px';
            }
            else if (X <= 0 && !clock && e.button === 0) {
                musicFm.style.top = (Y - heightMin / 2) + 'px';
                musicFm.style.left = 0;
            }
            else if (X >= (window.innerWidth) && !clock && e.button === 0) {
                musicFm.style.top = (Y - heightMin / 2) + 'px';
                musicFm.style.left = window.innerWidth - widthMin + 'px';
            }
            else if (!clock && e.button === 0) {
                musicFm.style.top = (Y - heightMin / 2) + 'px';
                musicFm.style.left = (X - widthMin / 2) + 'px';
            }
        });
        window.addEventListener('mouseup', function () {
            clock = true;
        });
    },
    getSong: function (channel) {
        if(!this.clock){
            this.clock= true;
            var _this = this;
            this.objWord = {};
            this.arrWord = [];
            if (!channel) {
                $.ajax({
                    dataType: "json",
                    url: 'http://api.jirengu.com/fm/getSong.php?channel=4',
                    success: success
                });
            } else {
                $.ajax({
                    dataType: "json",
                    url: 'http://api.jirengu.com/fm/getSong.php?channel=' + channel,
                    success: success
                });
            }
        }
        function success(data) {
            _this.appendSong(data); //添加歌曲信息
            _this.getWords();       //获取歌词
            _this.getDuration();
            _this.changeTime();
            _this.musicPlay();
            _this.frame.contents().find('#player')[0].volume = _this.voice;
            _this.wrap.find('.volume-new').height(_this.volumeHeight);
            _this.clock=false;
        }
    },
    appendSong: function (data) {
        var url = data.song[0].url;
        this.sid = data.song[0].sid;
        this.wrap.find('.music-name').text(data.song[0].title);//加入标题
        this.wrap.find('.singer-name').text(data.song[0].artist);//加入歌手
        this.frame.contents().find('#player').attr('src', url);//加入歌曲链接
    },
    getWords: function () {
        var _this = this;
        $.ajax({
            dataType: 'JSON',
            url: 'http://api.jirengu.com/fm/getLyric.php?sid=' + this.sid,
            success: success
        });
        function success(data) {
            var words = data.lyric;
            var arr = words.split('\n');
            for (var i = 0; i < arr.length; i++) {
                var rep = /[\[\]]/g;
                var arrNew = arr[i].split(rep);
                if (arrNew.length === 3) {
                    var a = arrNew[1].substr(0, 5);
                    _this.objWord[a] = arrNew[2];
                }
                else if (arrNew.length === 4) {
                    var c = arrNew[1].substr(0, 5);
                    var b = arrNew[2].substr(0, 5);
                    _this.objWord[c] = arrNew[3];
                    _this.objWord[b] = arrNew[3];
                }
            }
        }
    },
    getDuration: function () {
        var _this = this;
        setTimeout(function () {
            var songDuration = _this.frame.contents().find('#player')[0].duration;
            if (isNaN(songDuration)) {
                _this.getDuration();
            } else {
                _this.duration = _this.frame.contents().find('#player')[0].duration;
                _this.overTime()
            }
        }, 0);
    },
    overTime: function () {//时间总长度转换加入HTML
        var a = parseInt(this.duration / 60);
        if (a < 10) {
            a = '0' + a;
        }
        var b = (this.duration % 60).toFixed(2);
        if (b < 10) {
            b = '0' + b;
        }
        var c = (this.duration % 60).toFixed(0);
        if (c < 10) {
            c = '0' + c;
        }
        this.overtime = '[' + a + ':' + b + ']';
        this.wrap.find('.f-right').text(a + ':' + c);
    },
    getCurrentTime: function () {
        var _this = this;
        setTimeout(function () {
            var songTimes = _this.frame.contents().find('#player')[0].currentTime;
            if (isNaN(songTimes)) {
                _this.getCurrentTime();
            } else {
                _this.times = _this.frame.contents().find('#player')[0].currentTime;
            }
        }, 0);
    },
    changeTime: function () {
        var _this = this;
        setInterval(function () {
            _this.getCurrentTime();
            var a = parseInt(_this.times / 60);
            if (a < 10) {
                a = '0' + a;
            }
            var b = (_this.times % 60).toFixed(2);
            if (b < 10) {
                b = '0' + b;
            }
            var c = (_this.times % 60).toFixed(0);
            if (c < 10) {
                c = '0' + c;
            }
            _this.timeNow = a + ':' + c;
            _this.wrap.find('.f-left').text(a + ':' + c);//时间变化
            var l = 70 * (_this.times / _this.duration);//进度条
            _this.wrap.find('.bar-new').attr('style', 'width:' + l + '%;');

            for (var key in _this.objWord) {
                if (key === _this.timeNow) {
                    if (_this.arrWord.length === 0) {
                        _this.arrWord.push(_this.objWord[key]);
                    }
                    else if (_this.arrWord[length - 1] !== _this.objWord[key] && _this.objWord[key] !== '') {
                        _this.arrWord.push(_this.objWord[key]);
                    }
                }
                _this.wrap.find('.word').text(_this.arrWord[_this.arrWord.length - 1]);
            }
            if (_this.frame.contents().find('#player')[0].ended) {
                _this.getSong(_this.channel);
            }

        }, 500);
    },
    getChannel: function () {
        var _this = this;
        $.ajax({
            url: 'http://api.jirengu.com/fm/getChannels.php',
            dataType: "json",
            method: 'get',
            success: success
        });
        function success(data) {
            var arr = data.channels;
            appendList(arr);
        }

        function appendList(arr) {
            var html = '';
            for (var i = 0; i < arr.length; i++) {
                html += '<h2 class="' + arr[i].channel_id + '">' + arr[i].name + '</ h2>';
            }
            _this.wrap.find('.music-list').html(html);
        }
    },
    musicPlay: function () {
        var _this = this;
        if (_this.frame.contents().find('#player')[0].paused) {
            _this.frame.contents().find('#player')[0].play();
            _this.wrap.find('#play').addClass('icon-pause');
            _this.wrap.find('#play').removeClass('icon-bofang');
        }
    },
    bindEvent: function () {
        var _this = this;
        //弹开播放器
        this.fm.on('dblclick', function () {
            _this.wrap.find('#music-bg').fadeToggle(500, 'swing');
        });

        //播放音乐
        this.wrap.find('#play').on('click', function () {
            if (_this.frame.contents().find('#player')[0].paused) {
                _this.frame.contents().find('#player')[0].play();
                $(this).addClass('icon-pause');
                $(this).removeClass('icon-bofang');
            }
            else {
                _this.frame.contents().find('#player')[0].pause();
                $(this).addClass('icon-bofang');
                $(this).removeClass('icon-pause');
            }
        });
        //下一曲
        this.wrap.find('.icon-right').on('mousedown', function () {
            $(this).css('color', 'pink');
        });
        this.wrap.find('.icon-right').on('mouseup', function () {
            $(this).css('color', '#fff');
        });
        this.wrap.find('.icon-right').on('click', function () {
            _this.getSong(_this.channel);
        });
        //频道列表
        this.wrap.find('.icon-yinle').on('mouseenter', function () {
            _this.wrap.find('.music-list').show();
        });
        this.wrap.find('.music-list').on('mouseleave', function () {
            $(this).hide();
        });
        this.wrap.find('.music-list').on('mouseenter', 'h2', function () {
            $(this).addClass('active');
        });
        this.wrap.find('.music-list').on('mouseleave', 'h2', function () {
            $(this).removeClass('active');
        });
        this.wrap.find('.music-list').on('click', 'h2', function () {
            var myChannel = $(this).attr('class');
            _this.channel = myChannel.split(' ')[0];
            _this.getSong(_this.channel);
            $(this).addClass('selected');
            $(this).siblings().removeClass('selected');
        });
        //音量条
        this.wrap.find('.icon-shengyin').on('click', function () {
            $(this).parents('.music-main').find('.volume').toggleClass('active');
            $(this).parents('.music-main').find('.volume-new').toggleClass('active');
        });
        this.wrap.find('#volume').on('click', function (e) {
            var mouseH = e.clientY;
            var top = $(this).offset().top;
            var height = $(this).height();
            _this.voice = (height - (mouseH - top)) / height;
            _this.volumeHeight = height - (mouseH - top);
            _this.wrap.find('.volume-new').height(_this.volumeHeight);
            _this.frame.contents().find('#player')[0].volume = _this.voice;
        });

        //作者
        this.wrap.find('.music-author').on('mouseenter', function () {
            $(this).addClass('hover');
        });
        this.wrap.find('.music-author').on('mouseleave', function () {
            $(this).removeClass('hover');
        });
    }
};


var musicFm = new createMusic(30, 160, $('#music-fm'));