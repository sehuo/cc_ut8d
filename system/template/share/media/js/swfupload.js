function Upload(container_id, upload_btn, name, swfsrc, siteid) {
	
	this.name = name;

	this.id = 'UploadBar';
	
	this.btn_id = upload_btn;
	
	this.loadingid = this.id + '_loading';
	this.pbid = this.loadingid + '_pb';	
	this.pb_length = 450;

	this.swfid = this.id + 'swf';

	this.swfobj = null;
	
	this.init = function(container_id, swfsrc, siteid) {

		this.createUploadDiv(container_id);

		this.createSWFDiv(swfsrc, siteid);		
	}

	this.createUploadDiv = function(container_id) {
		var str = '';
		str += '<div id="'+this.id+'" style="width:'+this.pb_length+'px;" class="loading_bar">';
		str += '	<div class="file_name"><input type="button" class="btns" value="'+upload_langs.cancel_upload+'" />'+upload_langs.filename+'<span></span></div>';
		
		str += '	<div id="'+this.pbid+'" class="loading_pb">';
		str += '		<div id="'+this.loadingid+'" style="width:0px;" class="loading"></div>';
		str += '	</div>';
		
		str += '	<div class="loading_msg" style="display:none"></div>';
		
		str += '	<div class="loading_info">';
		str += '		<div class="done">'+upload_langs.upload_done+' <em>0%</em></div>';
		str += '		<div class="speed">'+upload_langs.upload_speed+' <em>0KB/s</em></div>';
		str += '		<div class="time">'+upload_langs.remaining_time+' <em>00:00:00</em></div>';
		str += '	</div>';
		
		str += '</div>';
		
		$('#'+container_id).prepend(str);
		
		var self=this;
		$('#'+this.id+' div[className="file_name"] input').click(function(){
			self.cancelUpload();
		});
	}
	
	this.getSWFObject = function() {
		
		var _t = $('#'+this.swfid);
		
		if(_t.length > 0) {
			return _t[0];
		}
		
		var _t = $('#f'+this.swfid);
		
		if(_t.length > 0) {
			return _t[0];
		}
		
		if (navigator.appName.indexOf("Microsoft") != -1) {
			return window[this.swfid];
		} else {
			return document[this.swfid];
		}
	}

	this.createSWFDiv = function(swfsrc, siteid) {
		
		btn = $('#'+this.btn_id);
		
		btn_xy = btn.offset();
		
		$('<div id="'+this.swfid+'_div"></div>').appendTo('body').css({
			width:btn.outerWidth() + 'px',
			height:btn.outerHeight() + 'px',
			position:'absolute',
			left:btn_xy.left+'px',
			top:btn_xy.top+'px'
		});
		
		var swfobj=new SWFObject(swfsrc, this.swfid, '100%', '100%', '8', '#FFFFFF');
		swfobj.addVariable('callback',this.name);
		swfobj.addVariable('siteid',siteid);
		swfobj.addParam('allowScriptAccess','always');
		swfobj.addParam('wmode','transparent');
		swfobj.write(this.swfid+'_div');

		this.swfobject = this.getSWFObject();
	}
	
	this.onUploadError = function(e){
		//this.showButton('重新上传');
		this.showMsg(e);
	}
	
	this.onUpload = function(name,size,type) {
		//alert("开始上传: 文件名:"+name+"	类型:"+type+"	 大小:"+size);
		
		$('#filename').val(name);
		$('#'+this.id+' div[className="file_name"] span').html(name);		
		
	}
	
	this.cancelUpload = function() {		
		this.callFlash('cancelUpload');
		this.hideUploadProgress();		
	}
	
	this.startUpload = function(code) {
		this.showUploadProgress();
		this.callFlash('startUpload',code);		
	}
	
	this.callFlash = function(funName, param) {
		try {
			if(param) {
				this.swfobject[funName](param);
			} else {
				this.swfobject[funName]();
			}
			
		} catch(e) {
			this.showMsg('flash异常');
		}
	}
	
	this.setUploadProgress = function(per, speed, time) {
		//per 进度百分比 %
		//speed 上传速度 kb/s
		//time 剩余时间
		
		$('#'+this.id+' div[className="loading_msg"]').hide();
		$('#'+this.id+' div[className="loading_info"]').show();
		
		$('#'+this.loadingid).css('width', per+'%');
		
		$('#'+this.id+' div[className="loading_info"] div').each(function(id, el){
			el = $(el);
			if(el.hasClass('done')) {
				el.find('em').html(per+'%');
			}
			if(el.hasClass('speed')) {
				el.find('em').html(speed);
			}
			if(el.hasClass('time')) {
				time = time ? time : '0:0:0';
				el.find('em').html(time);
			}
		});
		
	}
	
	this.hideUploadProgress = function() {
		
		$('#meta_body').show();
		
		btn_xy = $('#'+this.btn_id).offset();
		
		$('#'+this.swfid+'_div').css({
			left:btn_xy.left + 'px',
			top:btn_xy.top + 'px'
		});
		
		$('#upload_body').hide();
	}
	
	this.showUploadProgress = function() {
		
		$('#meta_body').hide();
		
		$('#'+this.swfid+'_div').css({
			left:'0px',
			top:'0px'
		});
		
		$('#upload_body').show();
		
	}
	
	this.showMsg = function(msg) {
		msg = html_entity(msg);
		$('#'+this.id+' div[className="loading_msg"]').html(msg).show();
		$('#'+this.id+' div[className="loading_info"]').hide();
	}
	
	this.onUploadFinish = function(){
		window.setTimeout("upload_finish()",1000);
	}
	
	this.init(container_id, swfsrc, siteid);
}

function html_entity(s){  
	var len=s.length;  
	var rs="";
	for(var i=0;i<len;i++){  
		var k=s.substring(i,i+1);  
		rs+="&#"+s.charCodeAt(i)+";";  
	}
	return rs;  
}  