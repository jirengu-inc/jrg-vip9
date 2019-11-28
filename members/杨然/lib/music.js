(function($){

    /**
     *  滑块实现
     * @param options={
            maxValue:1,//最大值
            defaultValue:1,//默认值
            direction:'x',//方向   x y all   没实现
            unit:0.1,//单位步长对应的实际值
            moveCallback:function (pos,utils) {
                $('.slider-range').width(pos*100+'%')
                $('.rightTip').css('display','block');
                $('.rightTip').text(pos)
                player.setVolume(pos);
            },//鼠标移动中
            lastCallBack:function (value,utils) {
                $('.slider .rightTip').css('display','none');
            }//鼠标松开是调用
        }
     * @returns {*}
     */
    $.fn.slider=function (options) {
        //$.extend(defaultOptions, options);//copy至defaultOptions
        var utils;
        this.each(function() {
            var handleBtn = $(this);
            utils={
                currentValue:null,//移动步长个数
                scalePerStep: 20,  //单位步长对应像素
                stepSize:10,//步长的总个数
                clickedOnCursor: false,//标识
                width:0,//滑块所在容器宽度
                //setVal:null ,//根据实际值计算移动像素时的回调函数，为窗口resize
                init:function () {
                    this.$ct = options.$ct || $('__player_container__');
                    this.width=handleBtn.parent().width();
                    //console.log( this.width)
                    this.stepSize = options.maxValue / options.unit;//最大值中包含步长的总个数
                    this.scalePerStep = utils.width / this.stepSize;
                    this.setValue((!!utils.currentValue ? utils.currentValue : options.defaultValue)/options.unit)
                    return this;
                },
                layout:function () {
                    this.width=handleBtn.parent().width()||100;
                    this.scalePerStep = utils.width / this.stepSize;
                    //utils.setVal(utils.currentValue*utils.scalePerStep, utils.setView)
                },
                bindEvent:function () {
                    $(window).on('resize',function (e) {
                        utils.layout();
                    });

                    handleBtn.parent().on('click',function (e) {
                        e.stopPropagation();
                        var curPostion = $(handleBtn).offset().left+ ($(handleBtn).width())*0.5;
                        var posX =e.pageX - curPostion;
                        var left = $(handleBtn).position().left+ ($(handleBtn).width())*0.5;
                        var stepCunt = ( left+posX)/utils.scalePerStep;
                        utils.setValue(stepCunt);
                    });

                    utils.$ct.mouseup(function() {//鼠标按键被松开
                        if (utils.clickedOnCursor) {
                            options.lastCallBack && options.lastCallBack.call(this, utils.currentValue * options.unit,utils);
                            utils.clickedOnCursor=false
                        }
                    }).mousemove(function(e) {//鼠标被移动
                        e.preventDefault();
                        e.stopPropagation();
                        utils.handle(e);
                    });
                    handleBtn.mousedown(function(e) {// 鼠标按钮被按下
                        e.preventDefault();
                        e.stopPropagation();
                        utils.clickedOnCursor = true;
                    });
                    handleBtn.click(function (e) {
                        e.stopImmediatePropagation();
                    });
                    return this;
                },
                handle: function(e) {
                    if (utils.clickedOnCursor) {
                        var currentX = $(handleBtn).parent().offset().left;
                        if(e.pageX < currentX){
                            return ;
                        }
                        var pos = [];
                        pos[0] = e.pageX - currentX;
                        //在宽度为options.width包含stepSize个步长，移动pos[0]相当于几个步长
                        var curStep = pos[0] * this.stepSize / utils.width //Math.floor();
                        //拖动超出范围，取最大步长数
                        this.currentValue = (curStep >= this.stepSize ? this.stepSize: curStep);
                        this.setValue(this.currentValue);
                    }
                },
                /**
                 * 根据步长算移动像素
                 * @param currentValue  共多少个步长
                 */
                setValue: function(currentValue) {
                    options.moveCallback && options.moveCallback.call(this, currentValue * options.unit,utils);
                    $(handleBtn).css({
                        'left':  (currentValue * utils.scalePerStep)  + 'px'
                    });
                    utils.isCalled = false;
                },

                /**
                 * 根据实际值计算移动像素
                 * @param currentValue N个步长的距离
                 */
                setVal: function(currentValue,setView) {
                    var lefPos = currentValue* this.width/options.maxValue ;
                    //var l2 = (currentValue/options.unit)*this.scalePerStep;// utils.width / this.stepSize
                    $(handleBtn).css({
                        'left':  lefPos + 'px'
                    });
                    utils.setView =setView;
                    utils.setView && utils.setView.call(utils,lefPos);

                }
            }
            utils.init().bindEvent();
        });
        return utils;
    }

})(jQuery)

var player = (function() {


    function Player() {}

    /**
     * 
     * @param opts{
     * media  媒体播放元素
     *  0 = NETWORK_EMPTY - 音频/视频尚未初始化
        1 = NETWORK_IDLE - 音频/视频是活动的且已选取资源，但并未使用网络
        2 = NETWORK_LOADING - 浏览器正在下载数据
        3 = NETWORK_NO_SOURCE - 未找到音频/视频来源
     *
     *
     * loop  循环播放
     * }
     */
    Player.prototype.init = function(target, draggable) {
        this.createElement();

        this.$target = $(target);
        this.$ct = $('#__player_container__');
        this.$switch = this.$ct.find('.switch'); //
        this.media = this.$ct.find('.media')[0];
        this.$lyricCt = this.$ct.find('.lyric');
        this.$progressBar = this.$ct.find('.progress-handle');
        this.$volumeBar = this.$ct.find('.slider-handle');
        this.loop = false;
        this.lyricURL = '';
        this.draggable = draggable||false;


        this.bindEvent(this.media);
        this.setChannel();
        this.loadLocalSong();

        localStorage.music_open = +new Date();

        if(localStorage.music_is_show_bg === 'true'){
            this.setBg()
        }else{
            this.unsetBg()
        }

        return this;
    }


    Player.prototype.createElement = function() {
        $('head').append('<meta name="referrer" content="no-referrer">');
        $('head').append('<link rel="stylesheet" type="text/css" href="http://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css">')
        $('head').append('<link rel="stylesheet" id="__player_container__css" href="http://cdn.jirengu.com/music/music.css">')
        //下面的不是注释，千万不要删除
        var playerHtml = str(function() {/*
            <div id="__player_container__" style="display: none">
                <audio class="media" src="">
                    not support the audio tag
                </audio>
                <div class="music-ct cur">
                    <div class="cover">
                        <div class="func-ct">
                            <header class="top justify">
                                <i class="fa fa-music small open" aria-hidden="true"></i>
                                <div class="coder-info">
                                    <i class="fa fa-info-circle small" aria-hidden="true"></i>
                                    <div class="author"><a href="http://www.jirengu.com/" class="under-line">饥人谷任务3班王龙</a></div>
                                </div>
                            </header>
                            <div class="music-info">
                                <div class="music-title small"></div>
                                <div class="singer"></div>
                            </div>
                            <div class="music-ctrl">
                                <ul>
                                    <li class="big"><a href="javascript:void (0);"><i class="switch fa fa-play-circle pause  " ></i></a></li>
                                    <li class="small"><a href="javascript:void (0);"><i class="fa fa-forward next"></i></a></li>
                                </ul>
                            </div>
                            <div class="music-lyric">
                                <ul class="lyric">
                                </ul>
                            </div>
                            <div class="music-volume justify">
                            <span class="volume">
                                <i class="fa fa-volume-up small" aria-hidden="true"></i>
                                <div class="slider-volume" >
                                    <div class="slider">
                                        <div class="slider-range">
                                        </div>
                                        <a href="javascript:void(0)" class="slider-handle" draggable="true"></a>
                                    </div>
                                </div>
                            </span>
                            <span class="display-Lyric" title="歌词开关">
                                <!--<i class="fa fa-toggle-on" aria-hidden="true"></i>
                                <i class="fa fa-refresh" aria-hidden="true"  title="单曲循环"></i>
                                -->
                                <i class="bg-switch fa fa-tree small"></i>
                                <i class="lyric-switch fa fa-toggle-on small" aria-hidden="true" ></i>
                            </span>
                            </div>
                            <!--进度-->
                            <div class="music-progress">
                                <div class="progress-wrap">
                                    <ul>
                                        <li class="currentTime"></li>
                                        <li>
                                            <div class="progress">
                                                <div class="progress-range">
                                                </div>
                                                <a href="javascript:void(0)" class="progress-handle" draggable="true"></a>
                                            </div>
                                        </li>
                                        <li class="duration"></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="channel">
                        <i class="fa fa-arrow-circle-left close" aria-hidden="true"></i>
                        <ul>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="__player_container__bgcover">
        */})

        $('body').append(playerHtml);

    }

    Player.prototype.setBg = function(){
        this.$ct.find('.bg-switch').removeClass('ban')
        $('#__player_container__bgcover').css({'background-image': 'url('+localStorage.music_picture+')'});      
    }
    Player.prototype.unsetBg = function(){
        this.$ct.find('.bg-switch').addClass('ban')
        $('#__player_container__bgcover').css({'background-image': 'none'});      
    }

    Player.prototype.setChannel = function() {
        //频道
        var self = this;
        $.ajax({
            url: 'http://api.jirengu.com/fm/getChannels.php',
            type: 'get',
            success: function(data) {
                $.each(JSON.parse(data).channels, function(i, e) {
                    var cls = '';
                    if(!localStorage.music_channel_id) localStorage.music_channel_id = 'public_fengge_xiaoqingxin'
                    if (localStorage.music_channel_id && e.channel_id === localStorage.music_channel_id) {
                        cls = 'view'
                    }
                    self.$ct.find('.channel>ul').append('<li class="'+cls+'" data-id=' + e.channel_id + '>' + e.name + '<span class="bg"></span></li>')
                });
            },
            error: function(e) {
                if (e) console.log('error', e);
            }
        });
    }

    Player.prototype.bindEvent = function(media) {
            var self = this;
            this.$ct.find('.music-ct').mousedown(function(e) {
                e.stopPropagation();
            })


            //开关切换
            this.$switch.on('click', function(e) {
                self.$switch.hasClass('play') ? self.pause() : self.start();
            });

            //单曲循环 TODO
            //hide or show
            this.$target.on('click', function(e) {
                e.stopImmediatePropagation();
                var isMove = $(this).data('move');
                //利用move和谐mousedown 和 click之间的冲突
                if (isMove) {
                    $(this).removeData('move');
                    return;
                }
                var pos = {
                    left: self.$target.offset().left,
                    top: self.$target.offset().top + self.$target.outerHeight(true) + 10
                }
                self.$ct.css('display', 'block')
                self.$ct.css({top: pos.top, left: pos.left})

                var $target = self.$ct.find('.music-ct');
                
                $target.toggleClass('cur');
                //target.hasClass('cur') ? target.addClass('display') : target.removeClass('display')
            });


            //FM的显示和隐藏
            this.$ct.find('.open,.close').on('click', function(e) {
                self.$ct.find('.channel').toggleClass('active4channel')
            });
            //频道点击
            this.$ct.find('.channel>ul').on('click', 'li', function(e) {
                self.$ct.find('.channel').toggleClass('active4channel')
                $(this).addClass('view').siblings().removeClass('view');
                var channelID = $(e.target).attr('data-id');
                localStorage.music_channel_id = channelID;
                self.pause().setURL(channelID); //.start();
            });

            /**
             * 下一曲
             */
            this.$ct.find('.next').on('click', function(e) {
                e.stopImmediatePropagation();
                self.next();
            });

            this.$ct.find('.display-Lyric').on('click', function(e) {
                e.stopPropagation();
                var $target = $(e.target);
                var $musicLyric = self.$ct.find('.music-lyric');
                console.log($target)
                if($target.hasClass('lyric-switch')){
                    $target.toggleClass('fa-toggle-on').toggleClass('fa-toggle-off')
                    $target.hasClass('fa-toggle-off') ? $musicLyric.addClass('transparent').removeClass('opaque') : $musicLyric.addClass('opaque').removeClass('transparent');                    
                }else if($target.hasClass('bg-switch')){
                    $target.toggleClass('ban');
                    if($target.hasClass('ban')){
                        self.unsetBg();
                        localStorage.music_is_show_bg = 'false';
                    }else{
                        self.setBg();
                        localStorage.music_is_show_bg = 'true';
                    }
                }
                    

            });
            $(this.media).on('timeupdate', function() {
                if(!self.hasSetCurrentTime && localStorage.music_current_time){
                    media.currentTime =localStorage.music_current_time 
                    self.hasSetCurrentTime = true
                }else{
                    localStorage.music_current_time = media.currentTime;
                }
                //音乐当前位置
                var curr = Math.floor(media.currentTime);
                
                //音乐长度
                var dur = Math.floor(media.duration);
                if (self.media.networkState != 3) {
                    self.$ct.find(".duration").text(formatTime(dur));
                    self.$ct.find(".currentTime").text(formatTime(curr));
                }
                //console.log('timeupdate',self.media.networkState)
                //进度条位置
                self.progress && self.progress.setVal(curr, function(pos) {
                    self.$ct.find('.progress-range').width(pos)
                });
                //console.log(media.currentTime*100)

                rollLyric(self, curr);

            });
            //成功获取资源长度, init
            $(self.media).on('loadedmetadata', function() {
                //console.log('loadedmetadata',self.media.networkState)
                //页面滑块初始化--播放进度条
                self.progress = self.$progressBar.slider({
                    maxValue: self.media.duration, //最大值
                    defaultValue: 0, //默认值
                    direction: 'x', //方向   x y all  TODO
                    unit: 1,
                    moveCallback: function(step, utils) {
                        self.$ct.find('.progress-range').width(step * utils.scalePerStep)
                        self.media.currentTime = step;
                        // localStorage.music_current_time = step;
                    }
                });

            });

            //播放结束
            $(self.media).on('ended', function() {

                localStorage.music_current_time = 0;
                if (self.loop) {
                    self.media.loop = self.loop;
                    self.start()
                } else {
                    self.next();
                }
            });
            //play事件会让暂停后的play方法从头播放
            //    $(self.media).on('play',function () {
            //
            // });

            window.addEventListener('storage', function(e){
                if(e.key === 'music_open'){
                    self.pause()
                }
            })
            $('#__player_container__css').on('load', function(){
                        //音量滑块
                self.volume = self.$volumeBar.slider({
                    maxValue: 1, //最大值
                    defaultValue: 0.4, //默认值
                    direction: 'x', //方向   x y all
                    unit: 0.1, //单位步长
                    moveCallback: function(pos, utils) {
                        self.$ct.find('.slider-range').width(pos * 100 + '%')
                        player.setVolume(pos);
                    }
                });
            })
        }
    
    Player.prototype.loadLocalSong = function(){
        if(localStorage.music_url){
            this.loadSong({
                picture: localStorage.music_picture,
                title: localStorage.music_title,
                artist: localStorage.muisc_artist,
                url: localStorage.music_url,
                sid: localStorage.muisc_sid
            })
        }else{
            this.setURL(localStorage.music_channel_id||0)
        }
    }

    Player.prototype.loadSong = function(opts){
        var self = this;
        self.$ct.find('.music-ct').css('background-image', 'url(' + opts.picture + ')');
        self.$ct.find('.music-title').text(opts.title)
        self.$ct.find('.singer').text(opts.artist);
        $(self.media).attr('src', opts.url);


        localStorage.music_picture = opts.picture
        localStorage.music_title = opts.title
        localStorage.muisc_artist = opts.artist
        localStorage.music_url = opts.url
        localStorage.muisc_sid  = opts.sid 

        $.post('http://api.jirengu.com/fm/getLyric.php', {
            sid: opts.sid
        }).done(function(lyc) {
            if (lyc) {
                lyc = JSON.parse(lyc)
                console.log(lyc)
                self.lyricContent = parseLyric(lyc.lyric);
                //初始化歌词
                //console.log('初始化歌词',self.lyricContent)
                if (self.lyricContent) {
                    renderLRC(self.$lyricCt, self.lyricContent);
                }
            } else {
                //TODO
            }
        });
        if(localStorage.music_status === 'play'){
            self.start();
        }
    }

    Player.prototype.setURL = function(cID) {
        var self = this;
        var channelID = cID || 0;
        $.ajax({
            url: 'http://api.jirengu.com/fm/getSong.php',
            type: 'get',
            data: {
                'channel': channelID,
            },
            success: function(data) {
                var songInfo = JSON.parse(data).song[0];
                self.loadSong(songInfo)
            }
        });

        return this;
    }

    Player.prototype.setVolume = function(volume) {
        this.media.volume = 1 > volume > 0 ? volume : 1;
    }

    Player.prototype.next = function() {
        this.$lyricCt.empty();
        this.lyricContent = '';
        this.setURL(localStorage.music_channel_id||0);
    }



    Player.prototype.setModel = function(model) {
        this.media.loop = this.loop;
        return this;
    }

    Player.prototype.start = function() {
        if(localStorage.music_is_show_bg === 'true'){
            this.setBg()
        }
        this.media.play();
        localStorage.music_status = 'play'
        this.$switch.removeClass('pause').removeClass('fa-play-circle').addClass('play').addClass('fa-pause-circle')
        return this;
    }

    Player.prototype.pause = function() {
        this.media.pause();
        localStorage.music_status = 'pause'
        this.$switch.removeClass('play').removeClass('fa-pause-circle').addClass('pause').addClass('fa-play-circle')
        return this;
    }

    Player.prototype.getMedia = function() {
        return this.media;
    }



    function renderLRC($ele, lrc) {
        $ele.empty();
        var lis = ""; //TODO  lis 没有被初始化，所以第一次循环会得到undefined
        for (var line in lrc) {
            lis += '<li data-time = "'+line+'">' + lrc[line].text + '</li>';
        }
        $ele.append(lis);
    }

    function rollLyric(self, cur) {
        var lyric = self.lyricContent; //歌词
        if (lyric) {
            var ct4Lyric = self.$lyricCt; //容器
            var content = lyric[cur]; //当前播放的行
            var target = ct4Lyric.find('li[data-time='+cur+']');
            if(target.length === 0) return;
            var top = target.outerHeight();

            if (content) {
                target.addClass('active').siblings().removeClass('active');
            }
        }
    }

    //音乐计时格式
    function formatTime(time) {
        var h = 0,
            i = 0,
            s = parseInt(time);
        if (s > 60) {
            i = parseInt(s / 60);
            s = parseInt(s % 60);
            if (i > 60) {
                h = parseInt(i / 60);
                i = parseInt(i % 60);
            }
        }
        var zero = function(v) {
            return (v >> 0) < 10 ? "0" + v : v;
        };
        //return (zero(h)+":"+zero(i)+":"+zero(s));
        return (zero(i) + ":" + zero(s));
    }

    //用于声明大段字符串
    function str(f) {
        return f.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
    }

    /**
     * @param lrc 歌词
     * @returns {0: "你的每一次呼吸 - 水木年华", 4: "(电影《怒放》插曲)"......}
     */
    function parseLyric(lrc) {
        var lyrics = lrc.split("\n");
        var lrcObj = {};
        var x = 0;
        var lasttime = 0;
        for (var i = 0; i < lyrics.length; i++) {
            var lyric = decodeURIComponent(lyrics[i]);
            var timeReg = /\[.{2}\:.{2}\..{2}?\]/g; ///\[\d*:\d*((\.|\:)\d*)*\]/g;
            var timeRegExpArr = lyric.match(timeReg);
            var clause = lyric.replace(timeReg, '');
            if (!timeRegExpArr) {
                lrcObj[lasttime] = lrcObj[lasttime] ? lrcObj[lasttime] : {};
                lrcObj[lasttime].text = lrcObj[lasttime].text ? lrcObj[lasttime].text :'';
                lrcObj[lasttime].text = lrcObj[lasttime].text + '\n' +  lyric.replace(/\[|\]/g,'');
                continue
            };
            for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
                var t = timeRegExpArr[k];
                var arr = t.replace(/\[|\]/g,'').replace(':','.').split('.')
                var time = parseInt(arr[0])*60+parseInt(arr[1])*1+parseInt(arr[2])*0;
                lrcObj[time] = lrcObj[time]||{}
                lrcObj[time].text = lrcObj[time].text ? lrcObj[time].text :'';
                lrcObj[time].text = lrcObj[time].text + '\n' +  clause;

                lasttime = time;
                // console.log(time,lrcObj[time].text,lrcObj[time].lineNum)
            }
        }
        return lrcObj;
    }

    return new Player();;
}());