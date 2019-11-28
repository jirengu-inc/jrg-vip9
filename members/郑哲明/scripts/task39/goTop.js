//define(function() {
    function GoTop(ct,target) {
            this.ct = ct
            this.target = target
            this.createNode()
            this.bindEvent()
        }
        
    GoTop.prototype.bindEvent = function () {
            var _this = this
            function goTop() {
                if(document.documentElement.scrollTop > 300 || document.body.scrollTop > 300) {
                    _this.target.style.display = 'block'
                } else {
                    _this.target.style.display = 'none'
                }
            }
            goTop()
            
            this.target.addEventListener('click',function() {
                window.scroll(0,0)
            })
            
            window.addEventListener('scroll',function() {
                goTop()
            })
        }
    GoTop.prototype.createNode = function () {
        this.target.classList.add('gotop')
        this.target.style.cssText = 'position:fixed;right:50px;bottom:50px;cursor:pointer;width:40px;height:40px;display:none;z-index:2;'
        this.ct.appendChild(this.target)
    }
//    return GoTop
//})

        
        