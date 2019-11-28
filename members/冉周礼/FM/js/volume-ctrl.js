function Volume($ct) {
    this.$ct = $ct;
    this.init();
    this.bind();
}


Volume.prototype.init = function() {
    this.$audio = $('#music');
    this.audio = $('#music')[0];
    this.$FM = $('#fm');
    this.$volume = this.$ct;
    this.$volumeButton = this.$ct.find('.volume-button');
    this.$volumeBar = this.$ct.find('.volume-bar');
    this.$volumeLine = this.$ct.find('.volume-line');
    this.$volumePathway = this.$ct.find('.volume-pathway');
    this.$volumeHandle = this.$ct.find('.volume-handle');
    this.volumeOn = true;
    this.audioVolume;
    this.dragVolume = this.$volumeHandle.draggabilly({
        axis: 'x',
        containment: true
    });
}
Volume.prototype.bind = function() {
    this.volumeChange();
    this.mute();
    this.dragMove();
    this.volumeBarClick();
}

// 音量改变事件
Volume.prototype.volumeChange = function() {
    var _this = this;
    this.$audio.on('volumechange', function() {
        var audioChanged = _this.audio.volume * 100;
        var width = audioChanged + 'px';
        _this.$volumeLine.css('width', width);
        if (audioChanged === 0) {
            _this.volumeOn = false;
            _this.$volumeButton.removeClass('icon-volume-on').addClass('icon-volume-off');
        } else {
            if (_this.$volumeButton.hasClass('icon-volume-off')) {
                _this.volumeOn = true;
                _this.$volumeButton.removeClass('icon-volume-off').addClass('icon-volume-on');
            }
        }
    })
}



// 点击静音/取消静音效果

Volume.prototype.mute = function() { // mute 静音键
    var _this = this;
    this.$volumeButton.on('click', function() {
        if (_this.volumeOn) {
            _this.audioVolume = _this.audio.volume;
            _this.audio.volume = 0;
            _this.$volumeHandle.css('left', '-100px')
        } else {
            _this.audio.volume = _this.audioVolume;
            var left = _this.audioVolume * 100 - 100 + 'px';
            _this.$volumeHandle.css('left', left)
        }
    })
}


// 拖动

Volume.prototype.dragMove = function() {
    var _this = this;
    this.dragVolume.on('dragMove', function() {
        var draggie = $(this).data('draggabilly');
        var width = 100 + draggie.position.x;
        if (width > 0) {
            _this.audio.volume = width / 100;
        } else {
            _this.audio.volume = 0;
        }

    })

}



// 点击控制音量
Volume.prototype.volumeBarClick = function() {
    var _this = this;
    this.$volumeBar.on('click', function(e) {
        var clickX = e.clientX;
        var barLeft = _this.toLength(_this.$volumeBar.css('left')) + _this.toLength(_this.$volume.css('left')) + _this.toLength(_this.$FM.css('left'));
        var clickVolume = clickX - barLeft;
        if (clickVolume <= 100) {
            var left = clickVolume - 100 + 'px';
            _this.audio.volume = clickVolume / 100;
            _this.$volumeHandle.css('left', left);
        } else {
            _this.audio.volume = 1;
            _this.$volumeHandle.css('left', '0px');
        }
    })
}

Volume.prototype.toLength = function(str) {
    var num = parseInt(str.replace('px', ''));
    return num;
}
