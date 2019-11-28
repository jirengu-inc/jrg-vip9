function Progress($ct) {

    this.$ct = $ct;

    this.init();
    this.bind();
}




Progress.prototype.init = function() {
    this.$audio = $('#music');
    this.audio = $('#music')[0];
    this.$FM = $('#fm');
    this.$progress = this.$ct;
    this.$progressBar = this.$ct.find('.progress-bar');
    this.$progressLine = this.$ct.find('.progress-line');
    this.$progressPathway = this.$ct.find('.progress-pathway');
    this.$progressHandle = this.$ct.find('.progress-handle');
    this.$currentTime = this.$ct.find('.current-time');
    this.$fullTime = this.$ct.find('.full-time');
    this.clock1;

    // 拖拽可控制播放进度
    this.drag = this.$progressHandle.draggabilly({
        axis: 'x',
        containment: true
    })
}





Progress.prototype.bind = function() {
    this.dragMove();
    this.clickCtrl();
    this.timeText();
    // this.pauseClearInterval();
}


Progress.prototype.dragMove = function() {
    var _this = this;
    this.drag.on('dragMove', function() {
        var draggie = $(this).data('draggabilly');
        var width = draggie.position.x + 'px';
        _this.$progressLine.css('width', width);
    })
    this.drag.on('dragStart', function() {
        _this.audio.pause();
    })
    this.drag.on('dragEnd', function() {
        _this.audio.play();
        var draggie = $(this).data('draggabilly');
        _this.audio.currentTime = draggie.position.x / 200 * _this.audio.duration;
    })
}



// 点击控制进度
Progress.prototype.clickCtrl = function() {
    var _this = this;
    this.$progressBar.on('click', function(e) {
        var clickX = e.clientX;
        var barLeft = _this.toLength(_this.$progressBar.css('left'))
                + _this.toLength(_this.$progress.css('left'))
                + _this.toLength(_this.$FM.css('left'));
        var left = clickX - barLeft - 4;
        _this.$progressLine.width(left);
        _this.$progressHandle.css('left', left);
        _this.audio.currentTime = left / 200 * _this.audio.duration;
    })
}

Progress.prototype.toLength = function(str) {
    var num = parseInt(str.replace('px', ''));
    return num
}

// 显示播放时长及进度

Progress.prototype.timeText = function() {
    var _this = this;
    this.$audio.on('play', function() {
        var fullTime = _this.audio.duration;
        _this.clock1 = setInterval(function() {
            var currentTime = _this.audio.currentTime;
            console.log(currentTime)
            var currentWidth = parseInt(currentTime / fullTime * 200) + 'px';
            _this.$currentTime.text(_this.timeFormat(currentTime));
            _this.$progressLine.width(currentWidth);
            _this.$progressHandle.css('left', currentWidth)
        }, 1000)
        _this.$fullTime.text(_this.timeFormat(fullTime));
    });
    this.$audio.on('pause', function() {
        clearInterval(_this.clock1);
    })
}

// Progress.prototype.pauseClearInterval = function() {
//     var _this = this;
//     this.$audio.on('pause', function() {
//         console.log(1);
//         clearInterval(0);
//     })
// }

Progress.prototype.timeFormat = function(num) {
    var fullSec = parseInt(num);
    var min = parseInt(fullSec / 60) + '';
    var sec = (fullSec % 60);
    if (sec < 10) {
        sec = '0' + sec;
    } else {
        sec = sec + '';
    }
    var timeStr = min + ':' + sec;
    return timeStr;
}
