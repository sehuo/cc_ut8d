/*cike CC视频插件：QQ3512794*/
$(function() {

    var cike_config = {
        playListStep:5,     // 每行5个
        //广告配置
        A:{    
            isOpen:true, // 是否起用广告  false:关，true:开    
            swfWidth:530,//播放器宽
            swfHeight:470,//播放器高            
            width:336,//广告宽
            height:280,//广告宽
            t:17000,//广告时间
            showTime:1, //是否显示倒计时,1显示，0关闭
            bgcolor:"#333" //播放器与广告间背景色
        }
    }

    var cike_event = {
        get:function(cfg){

            cfg.vid = vid;

            if(typeof plid != "undefined"){
                cfg.plid = plid;
            }

            var url = base_url+"plugin/pl/pl.php"; 
            if(cfg.urlparam){
                url += "?"+cfg.urlparam
            }

            cfg.size = cike_config.playListStep;

            $.getJSON(url,cfg,function(data) {                
                for(var i in data){
                    if(data[i]) cike_render[i](data[i]);
                }
            });
        },
        playlist:function(){

        },
        init:function(){
            this.get({type:"play"});
            cike_render['playA']();    
        }
    }
    


    var cike_render = {
        playList:function(data){
            var playlistDOM = $("#cike_plug_playlist");
            var step = cike_config.playListStep; 
            if(playlistDOM[0] && data.list.length){
                var str = [];
                var playing = "";
                var indexof = -1;
                var vlink;
                var lens = data.list.length;
                var pageAllNum = Math.ceil(lens/step);
                var pageCur = 0;
                for(var j=0,k=lens;j<k;j++){
                    if(data.list[j]["vid"] == vid){
                        playing = ' class="playing"';
                        indexof = j;
                    }else{
                        playing = '';
                    }
                    if(typeof series != "undefined" && series){
                        vlink = site_url+'video/index/'+data.list[j]["vid"]+'/series/1/plid/'+plid+'#swfplayer';
                    }else{
                        vlink = site_url+'video/index/'+data.list[j]["vid"]+'#swfplayer';
                    }
                    str.push('<li'+playing+'><a href="'+vlink+'">'+ data.list[j]["title"] +'</a></li>');
                }
                //html.push('<ul class="rc fix">'+ str.join("") +'</ul>');
                //playlistDOM.show().html(html.join('<div class="plug_otherPlays">本视频也在下面专辑中</div>'));
                playlistDOM.show().html('<ul class="rc fix">'+ str.join("") +'</ul><div class="cike_page"><div class="cike_pagemain">'+data.page+'</div></div>');
            }


            if(!playlistDOM.data("hasEvent")){
                playlistDOM.bind("click",function(e){
                    var target = $(e.target);
                    if(target.hasClass("J_pagea")){
                        e.preventDefault();
                        var url = target.attr("data-url");
                        cike_event.get({"urlparam":url,"type":"playList"})
                    }
                });
                playlistDOM.data("hasEvent",1);
            }
        },
        playUrls:function(data){
            var urls = data.split("#CK#");
            var ele = $("#cike_plug_urls");
            var len = urls.length;
            var html = [];
            var self = this;
            if(urls.length && ele[0]){
                for(var i=0;i<len;i++){
                    var url = urls[i].split("@");
                    var title = url.length > 1 ? url[1]:(i+1);
                    html.push('<a href="#swfplayer" data-url="'+url[0]+'">'+title+'</a>');
                }
                $('<div id="cike_plug_urlsList" class="fix">'+ html.join("")+'</div>').appendTo(ele).bind('click',function(e){
                    //e.preventDefault();
                    var target = e.target;
                    if(target.tagName == "A"){
                        var url = $(target).attr("data-url");
                        if(url) self.videoplayer(url);
                    }
                    
                });
                ele.show();
            }
        },
        videoplayer:function(url){
            var so = new SWFObject(url, "SwfObject", "530","468", "8", "#FFFFFF");
            so.addParam("allowScriptAccess", "always");
            so.addParam("allowFullScreen", "true");
            so.addParam("allownetworking", "internal");
            so.addParam("flashvars", url+"&winType=interior&flag=1&autoPlay=true");
            so.addParam("flashvars", url+"&winType=interior&isAutoPlay=true&autoPlay=true");
            so.addParam("flashvars", "&pv=0");
            so.addParam("movie", url);
            so.addParam("quality", "high");
            so.addParam("wmode", "transparent");
            so.write("swfplay");
            this.playA();
        },
        playA:function(){
            var self = this;
            var cfg = cike_config.A;

            if(!cfg.isOpen) return;

            if(!self.A){
                var parums = [];
                for(var i in cfg){
                    parums.push(i+'='+cfg[i]);
                }
                self.A =  $('<iframe style="position: absolute;z-index:999" width="'+cfg.swfWidth+'" height="'+cfg.swfHeight+'" src="'+base_url+'plugin/pl/a.html?'+ parums.join("&") +'" scrolling="no" frameborder="0" allowtransparency="true" marginheight="0" marginwidth="0"></iframe>').insertBefore("#swfplay");
            }else{
                self.A.show();
            }
            
            setTimeout(function(){
                self.A.hide();
            },cike_config.A.t);
            
        },
        A:null
    }

    cike_event.init();
    
})