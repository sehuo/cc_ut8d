$(function($) {
    var videoListStep = 5;
    var height = '300';
    var width ='100%';
    var playerId = '#player';
    var getVideoListData = function(cfg, callback){
        var url = base_url+"plugin/pl/pl.php"; 

        cfg.vid = vid;
        if(typeof plid != "undefined"){
            cfg.plid = plid;
        }
        if(cfg.urlparam){
            url += "?"+cfg.urlparam
        }

        cfg.size = videoListStep;

        $.ajax({
            url: url,
            data: cfg,
            dataType: 'jsonp',
            success:function(data){
                data.videoSrcs = getVideoListArray(data.playUrls);
                callback(data);
            }
        });
    }
    var getVideoListArray = function(playUrls){
        var urls = playUrls ? playUrls.split("#CK#") : [];
        var arr = [];
        urls.unshift(video_info.addr + '@' + video_info.title);
        for(var i=0;i<urls.length;i++){
            var url = urls[i].split("@");
            // var title = url.length > 1 ? url[1]:(i+1);
            var title = url.length > 1 ? url[1]: '其他';
            arr.push({'title' :title, 'link':url[0]});
        }
        return arr;
    }
    var rendVideoList = function(videoSrcs){
        if(videoSrcs.length){
            var html = [];
            videoSrcs.forEach(function(video){
                html.push('<a href="'+ video.link +'" class="list-group-item">'+ video.title +'<span class="badge">正在播放</span></a>');
            });
            $('#J-videoSrcs').removeClass('hidden').find('.list-group').append(html.join('')).on('click', '.list-group-item', function(e){
                e.preventDefault();
                $(this).parent().find('.active').removeClass('active');
                $(this).addClass('active');
                videoPlay($(this).attr('href'));
            }).find('.list-group-item').eq(0).click();
        }
    }
    var videoPlay = function videoPlay(url){
        if(url.indexOf('tudou.com')>0){
            if(xx=url.match(/\/programs\/view\/([a-zA-Z0-9_\-]*)/)){
                yid=xx[1];
            }
            if(xx=url.match(/\/v\/([a-zA-Z0-9_\-]*)/)){
                yid=xx[1];
            }
            if(!isNaN(yid)){yid=false;}
            if(yid){
                $(playerId).html('<iframe width="'+width+'" height="'+height+'" src="http://www.tudou.com/programs/view/html5embed.action?type=0&code='+yid+'&lcode=&resourceId=0_06_05_99"  frameborder=0 allowtransparency="true" allowfullscreen="true"></iframe>');
            }else{
                $(playerId).html("<embed width='"+width+"' height='"+height+"' src=\""+url+'" allowFullScreen="true"  wmode="Transparent">');
            }
        }else if(url.indexOf('youku.com')>0){
            if(xx=url.match(/id_([a-zA-Z0-9=]*)/)){
                yid=xx[1];
            }
            if(xx=url.match(/VideoIDS=([a-zA-Z0-9=]*)/)){
                yid=xx[1];
            }
            if(xx=url.match(/sid\/([a-zA-Z0-9=]*)/)){
                yid=xx[1];
            }
            if(yid){
                $(playerId).html('<iframe width="'+width+'" height="'+height+'" src="http://player.youku.com/embed/'+yid+'"  frameborder=0 allowfullscreen></iframe>');
            }else{
                $(playerId).html('<embed width="'+width+'" height="'+height+'" src="'+url+'"  allowFullScreen="true"  wmode="Transparent">');
            }
        }else if(url.indexOf('56.com')>0){
            if(xx=url.match(/v_([a-zA-Z0-9]*)/)){
                yid=xx[1];
            }
            if(xx=url.match(/open_([a-zA-Z0-9]*)/)){
                yid=xx[1];
            }
            if(yid){
                $(playerId).html('<iframe width="'+width+'" height="'+height+'" src="http://www.56.com/iframe/'+yid+'"  frameborder=0 allowfullscreen></iframe>');
            }else{
                $(playerId).html('<embed width="'+width+'" height="'+height+'" src="'+url+'" allowFullScreen="true"  wmode="Transparent">');
            }
        }else if(url.indexOf('ku6.com')>0){
            data=url.split('show/');
            $(playerId).html('<embed width="'+width+'" height="'+height+'" src="'+url+'" allowFullScreen="true"  wmode="Transparent">');
        }else if(url.indexOf('sohu.com')>0){
            data=url.split('vw/');
            //$(playerId).html('<embed width="'+width+'" height="'+height+'" type="application/x-shockwave-flash" src="http://share.vrs.sohu.com/my/v.swf&amp;topBar=0&amp;id='+data[1]+'&amp;autoplay=true" quality="high" allowscriptaccess="always" allowfullscreen="true" wmode="Transparent">');
            $(playerId).html('<embed width="'+width+'" height="'+height+'" src="'+url+'" allowFullScreen="true"  wmode="Transparent">');
        }else if(url.indexOf('dhd:')>-1 || url.indexOf('ed2k:')>-1){
            var myDate = new Date();
            $(playerId).html("<iframe id='t-iframe' scrolling='no' frameborder='0' width='"+width+"'  height='"+height+"'  src='/play/baidu.html?url="+url+"&t='+myDate></iframe>")
        }else if(url.indexOf('qq.com')>0){
            data=url.split('/j/c/');
            $(playerId).html('<embed src="http://static.video.qq.com/TPout.swf?auto=1&vid='+data[1]+'" quality="high" width="'+width+'" height="'+height+'" align="middle" allowScriptAccess="sameDomain" allowFullscreen="true" type="application/x-shockwave-flash"></embed>')
        }else if(url.indexOf('.rmvb')>0){
            $(playerId).html("<iframe id='t-iframe' scrolling='no' frameborder='0' width='"+width+"'  height='"+height+"' src='/api/rmvb.php?url="+url+"'></iframe>")
        }else if(url.indexOf('tangdou.com')>0){
            $(playerId).html("<iframe id='t-iframe' scrolling='no' frameborder='0' width='"+width+"'  height='"+height+"' src='/api/tangdou.php?url="+url+"'></iframe>")
        }else if(url.indexOf('.swf')>0){
            $(playerId).html("<embed src='"+url+"' quality='high' width='"+width+"' height='"+height+"' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash'>")
        }else if(url.indexOf('.flv')>0 || url.indexOf('.mp4')>0){
            var s1=new swfplayer();
            s1.ckplayer_url='ckplayernew.swf';
            s1.ckplayer_flv=url;
            s1.ckplayer_loadimg='';
            s1.ckplayer_loadtime=15;
            s1.ckplayer_endstatus=2;
            s1.swfwrite('myvideo');
        }
    }

    getVideoListData({type:"play"}, function(data){
        rendVideoList(data.videoSrcs);
    });

    // 统计视频点击
    setTimeout(function(){
        if(typeof misc_statistic_update == "undefined" || misc_statistic_update != '1') {
            $.getJSON(base_dir + "index.php?r=ajax/count_view/video/" + vid);
        } 
     },3000);
});