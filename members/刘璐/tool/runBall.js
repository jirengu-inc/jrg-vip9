/**
 * Created by dell on 2016/12/7.
 */








    function spotMove(top,left){
        var clock = true,
            widthMin=40,
            width=260,
            height =425,
            heightMin=40;
        var musicFm = $('#music-fm')[0];//运动的小球
        var fm = $('#fm')[0];//运动的小球

    musicFm.setAttribute('style','position:fixed;width:'+width+'px;'+'height:'+height+'px;top:'+top+'px;left:'+left+'px;');


        fm.addEventListener('mousedown',function(){
            clock = false;
        });

        window.addEventListener('mousemove',function move(e){
            var X = e.clientX;
            var Y = e.clientY;

            if(Y<=0&&!clock&&e.button===0){
                musicFm.style.top=0;
                musicFm.style.left=(X-widthMin/2)+'px';
            }
            else if(Y>=(window.innerHeight)&&!clock&&e.button===0){
                musicFm.style.top=window.innerHeight-widthMin+'px';
                musicFm.style.left=(X-widthMin/2)+'px';
            }
            else if(X<=0&&!clock&&e.button===0){
                musicFm.style.top=(Y-heightMin/2)+'px';
                musicFm.style.left=0;
            }
            else if(X>=(window.innerWidth)&&!clock&&e.button===0){
                musicFm.style.top=(Y-heightMin/2)+'px';
                musicFm.style.left=window.innerWidth-widthMin+'px';
            }
            else if(!clock&&e.button===0){
                musicFm.style.top=(Y-heightMin/2)+'px';
                musicFm.style.left=(X-widthMin/2)+'px';
            }
        });
        window.addEventListener('mouseup',function(){
            clock = true;
        });
    }


    spotMove(30,160);//调用运动的小球

