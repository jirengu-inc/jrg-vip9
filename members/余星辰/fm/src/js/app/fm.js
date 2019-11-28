var FmHtml = (function () {
    _FmHtml = function ($node) {
        this.$node = $node;
        this.createHtml();
    };
    _FmHtml.prototype.createHtml = function () {
        this.$node.append(
            '<div class="fm clearfix">'
            + '<audio id="audio" src=""></audio>'
            + '<span class="iconfont icon-yinle active"></span>'
            + '<div class="fm-main">'
            + '<img class="background active" src="http://musicdata.baidu.com/data2/pic/5b3525f06d097d1dcc55923256632913/117416863/117416863..jpg">'
            + '<div class="lrc-wrap active">'
            + '<div class="lyric-box">'
            + '<ul class="lyric">'
            + '</ul></div></div>'
            + '<div class="content">'
            + '<div class="music-info layout clearfix">'
            + '<div class="info">'
            + '<h1 class="title"></h1>'
            + '<h3 class="artist"></h3>'
            + '<h3 class="show-channel"></h3></div>'
            + '<div class="music-icon clearfix">'
            + '<span class="like iconfont icon-like" title="喜欢"></span>'
            + '<a href="" target="_blank" class="iconfont icon-download" title="下载"></a>'
            + '<span class="switch-lrc-wrap active iconfont icon-lyric" title="关闭歌词"></span></div></div>'
            + '<div class="control">'
            + '<div class="time layout clearfix">'
            + '<div class="time-line">'
            + '<div class="time-outline"></div></div>'
            + '<span class="cur-time">0</span>'
            + '<span class="total-time">0</span></div>'
            + '<div class="btn-control clearfix">'
            + '<span class="iconfont icon-previous"></span>'
            + '<span class="btn-play iconfont icon-pause"></span>'
            + '<span class="iconfont icon-next"></span>'
            + '<span class="circle iconfont icon-shuffle"></span>'
            + '<span class="volume iconfont icon-sound"></span>'
            + '<div class="volume-bar clearfix">'
            + '<div class="volume-outline"></div></div></div></div></div>'
            + '<div class="footer clearfix">'
            + '<span class="to-channel iconfont icon-to-left"></span>'
            + '<span class="to-list iconfont icon-to-right"></span></div>'
            + '<div class="fm-channel"><ul class="channels"><li>随机频道</li></ul></div>'
            + '<div class="fm-list" ><ul class="option clearfix"><li class="history active"><span>播放历史</span></li>'
            + '<li class="like-list "><span>喜爱歌曲</span></li></ul>'
            + '<ul class="list  my-history active"></ul>'
            + '<ul class="list  my-like "></ul></div></div></div>'
        )
    };
    return _FmHtml;
})();
var Fm = (function () {
    function _Fm($node) {
        this.$node = $node;
        var channelId = this.channelId = undefined,
            channelName = this.channelName = undefined,
            likeSong = this.likeSong = [],
            historySong = this.history = [];
        this.$audio = this.$node.find("#audio");
        this.audio = this.$audio[0];
        this.$background = this.$node.find("img.background");// 背景板
        this.$lyric = this.$node.find(".lrc-wrap .lyric"); // 歌词
        this.lrcWrap = this.$node.find(".lrc-wrap");//歌词板
        this.$title = this.$node.find(".music-info .title");// 歌曲名
        this.$artist = this.$node.find(".music-info .artist");// 歌手
        this.$channel = this.$node.find(".music-info .show-channel");// 频道
        this.$like = this.$node.find(".music-info .like");// 喜爱歌曲
        this.$download = this.$node.find(".music-info .icon-download");// 下载
        this.$swithLrc = this.$node.find(".music-info .switch-lrc-wrap");// 歌词开关
        this.$timeLine = this.$node.find(".control .time-line");
        this.$timeOutline = this.$node.find(".control .time-outline");// 歌曲进度条
        this.$curTime = this.$node.find(".control .cur-time");// 播放时间
        this.$totalTime = this.$node.find(".control .total-time");// 歌曲总长
        this.$prev = this.$node.find(".control .icon-previous");// 上一曲
        this.$play = this.$node.find(".control .btn-play");// 歌曲播放
        this.$next = this.$node.find(".control .icon-next");// 下一曲
        this.$circle = this.$node.find(".control .circle");// 歌曲循环
        this.$volume = this.$node.find(".control .volume");// 静音切换
        this.$volumeBar = this.$node.find(".control .volume-bar");//音量条容器
        this.$volumeOutline = this.$node.find(".control .volume-outline");// 音量条
        this.$left = this.$node.find(".footer .to-channel");// 打开频道列表
        this.$right = this.$node.find(".footer .to-list");// 打开歌曲列表
        this.$channels = this.$node.find(".channels");// 频道列表
        this.$option = this.$node.find(".fm-list .option");
        this.$myHistory = this.$node.find(".my-history");// 播放历史列表
        this.$myLike = this.$node.find(".my-like");// 喜爱歌曲列表
        this.$fmChannel = this.$node.find(".fm-channel");
        this.$fmList = this.$node.find(".fm-list");
        this.listItem = this.$node.find(".fm-list .list");
        this.$music = this.$node.find('.icon-yinle');
        this.fmMain = this.$node.find('.fm-main');
        this.bind();
        this.init();
    }

    _Fm.prototype = {
        init: function () {
            this.channelInit();
        }, //初始化
        bind: function () {
            var _this = this,
                history = _this.history,
                likeS = _this.likeSong,
                audio = _this.audio;
            _this.$audio.on('timeupdate', function () {
                var t = audio.currentTime;
                _this.showLrc(t);
                _this.setCurTime(t);
            })
                .on('canplay', function () {
                    clearTimeout(addHisClock);
                    _this.fillFM();
                    _this.playstatus();
                    _this.checkLike();
                    var addHisClock = setTimeout(function () {
                        _this.addHistory()
                    }, 2000);
                })
                .on('ended', function () {
                    _this.getMusic();
                });
            _this.$prev.on('click', function () {
                _this.playPrev();
            });
            _this.$play.on('click', function () {
                _this.playstatus()
            });
            _this.$next.on('click', function () {
                _this.playNext();
            });
            _this.$left.on('mouseenter', function () {
                _this.$fmChannel.show('400');
            });
            _this.$right.on('mouseenter', function () {
                _this.$fmList.show('400');
            });
            _this.$timeLine.on('click', function (e) {
                _this.$timeOutline.width(e.pageX - $(this).offset().left);
                audio.currentTime = ((e.pageX - $(this).offset().left) / $(this).width()) * audio.duration;
                if (_this.$play.hasClass('icon-play')) {
                    audio.play();
                } else {
                    audio.pause();
                }
            });
            _this.$volume.on('click', function () {
                _this.toggleMuted()
            });
            _this.$volumeBar.on('click', function (e) {
                var pagex = e.pageX,
                    left = $(this).offset().left;
                _this.$volumeOutline.width(pagex - left);
                audio.volume = (pagex - left) / $(this).width();
                if (audio.volume > 0.94) {
                    _this.$volumeOutline.width($(this).width());
                    audio.volume = 1
                }
                if (audio.volume < 0.04) {
                    _this.$volumeOutline.width(0);
                    audio.muted = true;
                    _this.checkMuted()
                }
                if (audio.volume >= 0.04) {
                    audio.muted = false;
                    _this.checkMuted()
                }
            });
            _this.$circle.on('click', function () {
                _this.toggleCircle()
            });
            _this.$like.on('click', function () {
                _this.toggleLike()
            });
            _this.$myLike.on('click', '.item', function () {
                var idx = $(this).index();
                audio.src = likeS[idx].src;
                _this.$audio.data('data', likeS[idx]);
                audio.pause();
                _this.getLrc(likeS[idx].sid);
            });
            _this.$option.on('click', 'li', function () {
                _this.$option.find('li').removeClass('active');
                _this.listItem.removeClass('active');
                $(this).addClass('active');
                _this.listItem.eq($(this).index()).addClass('active');
            });
            _this.$myHistory.on('click', '.item', function () {
                var idx = $(this).index();
                audio.src = history[idx].src;
                _this.$audio.data('data', history[idx]);
                audio.pause();
                _this.getLrc(history[idx].sid);
            });
            _this.$channels.on('click', 'li', function () {
                var idx = $(this).index();
                if (idx !== 0) {
                    _this.channelId = $(this).attr('data-id');
                    _this.channelName = $(this).text();
                    _this.$channels.children().removeClass('active');
                    $(this).addClass('active');
                    _this.$circle.removeClass('icon-list-loop').removeClass('icon-single').addClass('icon-shuffle');
                    _this.getMusic();
                }
                if (idx === 0) {
                    _this.$channels.children().removeClass('active');
                    $(this).addClass('active');
                    _this.$circle.removeClass('icon-list-loop').removeClass('icon-single').addClass('icon-shuffle');
                    _this.getMusic();
                }
            });
            _this.$fmChannel.on('mouseleave', function () {
                $(this).hide('400');
            });
            _this.$fmList.on('mouseleave', function () {
                $(this).hide('400');
            });
            _this.$swithLrc.on('click', function () {
                var $this = $(this);
                _this.$swithLrc.toggleClass('active');
                _this.lrcWrap.toggle('400');
                _this.$background.toggle('400');
            });
            _this.$node.on('mousedown', function (e) {
                _this.drag(_this.$node)
            });
            _this.$music.on('dblclick', function (e) {
                       _this.fmMain.toggle('600');
            })
        }, //绑定事件
        drag: function ($node) {
            $node.on('mousedown', function (e) {
                    var offset = $(this).offset(),
                        x = e.pageX - offset.left,
                        y = e.pageY - offset.top;
                    $(document).on('mousemove', function (ev) {
                        var _x = ev.pageX - x;
                        var _y = ev.pageY - y;
                        $node.offset({left: _x , top: _y });
                    });
                    $(document).on('mouseup',function () {
                        $(this).off("mousemove");
                    })
                }
            )
        },
        channelInit: function () {
            var _this = this;
            $.ajax({
                Method: 'get',
                url: 'http://api.jirengu.com/fm/getChannels.php',
                dataType: 'json'
            }).done(function (res) {
                var channels = res.channels;
                for (var i = 0; i < channels.length; i++) {
                    _this.$channels.append(
                        '<li data-id='
                        + channels[i].channel_id
                        + '>'
                        + channels[i].name
                        + '</li>'
                    )
                }
                _this.randomCH();
                _this.getSong()
            })
        }, //频道初始化
        randomCH: function () {
            var ranNum = Math.floor(Math.random() * this.$channels.children().length);
            if (ranNum !== 0) {
                this.channelId = this.$channels.children().eq(ranNum).attr('data-id');
                this.channelName = this.$channels.children().eq(ranNum).text();
            }
        }, // 随机频道
        getSong: function () {
            var _this = this;
            $.ajax({
                url: 'http://api.jirengu.com/fm/getSong.php',
                Method: 'get',
                data: {
                    'channel': _this.channelId
                },
                dataType: 'json'
            }).done(function (res) {
                var song = res.song[0];
                _this.$audio.attr('src', song.url)
                    .data('data', {
                        'src': song.url,
                        'sid': song.sid,
                        'pic': song.picture,
                        'artist': song.artist,
                        'title': song.title,
                        'channel': _this.channelId,
                        'channelName': _this.channelName
                    });
                if (_this.$swithLrc.hasClass('active')) {
                    _this.getLrc(song.sid);
                }
            });
        }, // 获取歌曲
        getLrc: function (sid) {
            var _this = this;
            $.ajax({
                method: 'get',
                url: 'http://api.jirengu.com/fm/getLyric.php',
                data: {
                    sid: sid
                },
                dataType: 'json'
            }).done(function (res) {
                _this.$lyric.empty();
                _this.$lyric.css('top', 0);
                var resLrcArr = res.lyric.split('\n'),
                    reg = /\[\d{2}:\d{2}.\d{2}\]/g,
                    final = [];
                for (var i = 1; i < resLrcArr.length; i++) {
                    var time = resLrcArr[i].match(reg),
                        value = resLrcArr[i].replace(reg, '');
                    if (!time)continue;
                    for (var o in time) {
                        var t = time[o].slice(1, -1).split(':'),
                            realT = parseInt(t[0], 10) * 60 + parseFloat(t[1]);
                        final.push([realT, value]);
                    }
                }
                final.sort(function (a, b) {
                    return a[0] - b[0]
                });
                _this.renderLrc(final)
            }).fail(function () {
                _this.$lyric.append('<li>抱歉，未能找到歌词</li>')
            })
        },//获取歌词
        renderLrc: function (obj) {
            for (var i = 0; i < obj.length; i++) {
                this.$lyric.append('<li data-time=' + obj[i][0] + '>' + obj[i][1] + '</li>');
                if (i <= 5) {
                    this.$lyric.children().eq(i).data('top', 0)
                }
                if (i > 5) {
                    var lastTop = this.$lyric.children().eq(i - 1).data('top'),
                        lastH = this.$lyric.children().eq(i - 1).outerHeight();
                    this.$lyric.children().eq(i).data('top', lastH + lastTop)
                }
            }
        }, //渲染歌词
        showLrc: function (t) {
            var liArr = this.$lyric.find('li'),
                len = liArr.length;
            for (var i = 0; i < len; i++) {
                if (t >= liArr.eq(i).attr('data-time') && liArr.eq(i + 1).attr('data-time') > t) {
                    liArr.removeClass('active');
                    liArr.eq(i).addClass('active');
                    this.$lyric.css('margin-top', -liArr.eq(i).data('top'))
                }
            }
        }, // 展示歌词
        getMusic: function () {
            if (this.$circle.hasClass('icon-shuffle')) {
                this.shuffleMusic()
            }
            if (this.$circle.hasClass('icon-single')) {
                this.singleMusic()
            }
            if (this.$circle.hasClass('icon-list-loop')) {
                this.listMusic()
            }
        }, // 获取音乐及音乐信息
        shuffleMusic: function () {
            var _this=this,
                can = false;
            if (_this.$channels.children().eq(0).hasClass("active")) {
                (function () {
                    _this.randomCH();
                    can = true;
                })();
                if (can) {
                    _this.getSong()
                }
                return
            }
            if (_this.$channels.children().hasClass("active")) {
                _this.getSong();
                return
            } else {
                (function () {
                    _this.randomCH();
                    can = true;
                })();
                if (can) {
                    _this.getSong()
                }
                return
            }
        },// 随机音乐
        listMusic: function () {
            var _this = this;
            if (_this.$myHistory.hasClass('active')) {
                var idx = $.inArray(_this.$audio.data('data'), _this.history),
                    len = _this.history.length;
                if (idx != -1 && idx <= len - 2) {
                    _this.audio.src =  _this.history[idx + 1].src;
                    _this.$audio.data('data', _this.history[idx + 1]);
                    _this.getLrc(_this.history[idx + 1].sid)
                }
                if (idx === len - 1) {
                    idx = -1;
                }
                if (idx === -1) {
                    _this.audio.src = this.history[0].src;
                    _this.$audio.data('data', _this.history[0]);
                    _this.getLrc(_this.history[0].sid);
                    return
                }
            }
            if (_this.$myLike.hasClass('active')) {
                var idx = $.inArray(_this.$audio.data('data'), _this.likeSong),
                    len = _this.likeSong.length;
                if (idx != -1 && idx <= len - 2) {
                    _this.audio.src =  _this.likeSong[idx + 1].src;
                    _this.$audio.data('data', _this.likeSong[idx + 1]);
                    _this.getLrc(_this.likeSong[idx + 1].sid)
                }
                if (idx === len - 1) {
                    idx = -1;
                }
                if (idx === -1) {
                    _this.audio.src = this.likeSong[0].src;
                    _this.$audio.data('data', _this.likeSong[0]);
                    _this.getLrc(_this.likeSong[0].sid);
                    return
                }
            }
        }, // 列表音乐
        singleMusic: function () {
            this.$audio[0].src = this.$audio.data('data').src;
        }, //单曲
        playstatus: function () {
            if (this.audio.paused) {
                this.audio.play();
                this.$play.removeClass('icon-play').addClass('icon-pause');
            } else {
                this.audio.pause();
                this.$play.removeClass('icon-pause').addClass('icon-play');
            }
        },// 播放状态
        fillFM: function () {
            var t = this.audio.duration,
                data = this.$audio.data('data');
            this.$background.attr('src', data.pic);
            this.$title.text(data.title);
            this.$artist.text(data.artist);
            this.$channel.text(data.channelName);
            this.$download.attr('href', this.audio.src);
            this.setTotalTime(t);
        },// 填充FM显示
        playPrev: function () {
            var len = this.history.length,
                index = $.inArray(this.$audio.data('data'), this.history);
            if (len === 0)return;
            if (index === -1) {
                this.audio.pause();
                this.$audio.attr('src', this.history[len - 1].src);
                this.$audio.data('data', this.history[len - 1]);
                this.getLrc(this.history[len - 1].sid);
            } else {
                if (index - 1 < 0) {
                    return
                }
                else {
                    this.audio.pause();
                    this.audio.src = this.history[index - 1].src;
                    this.$audio.data('data', this.history[index - 1]);
                    this.getLrc(this.history[index - 1].sid);
                }
            }
        },  // 播放上一曲
        playNext: function () {
            this.getMusic()
        }, // 播放下一曲
        addHistory: function () {
            if ($.inArray(this.$audio.data('data'), this.history) === -1) {
                this.$myHistory.append('<li class=item  ><span>' + this.$audio.data('data').title + '</span></li>');
                this.history.push(this.$audio.data('data'));
            } else return
        }, // 添加播放历史
        setCurTime: function (t) {
            var totalT = this.audio.duration,
                recT = Math.floor(t),
                mins = Math.floor(recT / 60),
                secs = Math.floor(recT - 60 * mins);
            this.$curTime.text(mins + ':' + secs);
            this.$timeOutline.width($('.time-line').outerWidth() * (t / totalT));
        }, // 设置当前播放时间
        setTotalTime: function (t) {
            var recT = Math.floor(t),
                mins = Math.floor(recT / 60),
                secs = Math.floor(recT - 60 * mins);
            this.$totalTime.text(mins + ':' + secs);
        }, // 设置总时间
        toggleMuted: function () {
            if (this.audio.muted) {
                this.audio.muted = false;
                this.$volume.removeClass('icon-muted').addClass('icon-sound')
            } else {
                this.audio.muted = true;
                this.$volume.removeClass('icon-sound').addClass('icon-muted')
            }
        }, // 切换音量状态
        checkMuted: function () {
            if (this.audio.muted) {
                this.$volume.removeClass('icon-sound').addClass('icon-muted')
            } else {
                this.$volume.removeClass('icon-muted').addClass('icon-sound')
            }
        }, // 检查音量状态
        checkLike: function () {
            var len = this.$myLike.find('li').length;
            for (var i = 0; i < len; i++) {
                if (this.likeSong[i].sid == this.$audio.data('data').sid) {
                    this.$like.addClass('active');
                    break
                } else {
                    this.$like.removeClass('active');
                }
            }
        }, // 检查是否喜爱歌曲
        toggleLike: function () {
            if (this.$like.hasClass('active')) {
                this.$like.removeClass('active');
                var likeArr = this.$myLike.find('li');
                for (var i = 0; i < likeArr.length; i++) {
                    if (this.likeSong[i] === undefined)break
                    if (this.likeSong[i].src == this.$audio.attr('src')) {
                        likeArr.eq(i).remove();
                        this.likeSong.splice(i, 1);
                    }
                }
            } else {
                this.$like.addClass('active');
                this.$myLike.append('<li class=item  ><span>' + this.$audio.data('data').title + '</span></li>');
                this.likeSong.push(this.$audio.data('data'))
            }
        },// 喜爱歌曲处理
        toggleCircle: function () {
            if (this.$circle.hasClass('icon-list-loop')) {
                this.$circle.removeClass('icon-list-loop').addClass('icon-single');
                return
            }
            if (this.$circle.hasClass('icon-single')) {
                this.$circle.removeClass('icon-single').addClass('icon-shuffle');
                return
            }
            if (this.$circle.hasClass('icon-shuffle')) {
                this.$circle.removeClass('icon-shuffle').addClass('icon-list-loop');
                return
            }
        }// 切换播放顺序
    };
    return _Fm
})();
new FmHtml($('body'));
new Fm($('.fm'));