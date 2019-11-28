function PanelCtrl($ct) {

    this.$ct = $ct;
    this.init();
    this.bind();
}
PanelCtrl.prototype.init = function() {
    this.audio = this.$ct.find('#music')[0];
    this.$audio = this.$ct.find('#music');
    this.$panelMin = this.$ct.find('.panel-min');
    this.$panel = this.$ct.find('.panel');
    this.$panelHandle = this.$ct.find('.panel-handle');
    this.$close = this.$ct.find('.close');
    this.isMoving = true;
    this.$drag = this.$ct.draggabilly({
        handle: '.panel-handle'
    });
}

PanelCtrl.prototype.bind = function() {
    this.open();
    this.close();
    this.colorChange();
}


PanelCtrl.prototype.colorChange = function() {
    var _this = this;
    this.$audio.on('play', function() {
        _this.$panelMin.addClass('colorful-min');
    })
    this.$audio.on('pause', function() {
        _this.$panelMin.removeClass('colorful-min');
    })
}

PanelCtrl.prototype.open = function() {
    var _this = this;
    this.$panelMin.click(function() {
        if (!_this.isMoving) {
            _this.$panelMin.fadeToggle(300);
            _this.$panel.fadeToggle(300);
            _this.isMoving = true;
        }
    });
    this.$drag.on('dragEnd', function() {
        _this.isMoving = true;

    });
    this.$drag.on('pointerDown', function() {
        _this.isMoving = false;

    });
}
PanelCtrl.prototype.close = function() {
    var _this = this;
    this.$close.click(function() {

        _this.$panelMin.fadeToggle(300);
        _this.$panel.fadeToggle(300);

    });
}
