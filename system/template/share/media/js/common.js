function select_templates(url){
   window.open(url, "template_list", "scrollbars=yes,resizable=yes,statebar=no,width=600,height=400");
}

function check_all(check_all_input) {
	$(check_all_input)
		.parents('form')
		.find('input:enabled[type="checkbox"]')
		.attr("checked", $(check_all_input).attr('checked'));
}

function photo_switch(type) {
	if(type == 'url') {
		$('#photo_url').show();
		$('#photo_upload').hide();
	} else {
		$('#photo_url').hide();
		$('#photo_upload').show();
	}			
}

function show_tips(o, tips) {
	o.blur();
	alert(tips);
	return false;
}

//验证email格式是否合法
function check_email(email) {
	var email_reg=/^[_\.0-9a-z-]+@([0-9a-z][0-9a-z-]+\.)+[a-z]{2,5}/;
    if (!(email.match(email_reg) && email != "")) {
		return false;
    } else {
		return true;
	}
}

//验证单选框是否至少选择了一个
function check_radio(form_name, radio_name){
	return $('[name="'+form_name+'"]').find('input[name="'+radio_name+'"][checked]').length >= 1;
}

//验证多选框是否至少选择了一个
function check_checkbox(form_name, checkbox_name){
	return $('[name="'+form_name+'"]').find('input[name="'+checkbox_name+'"][checked]').length >= 1;
}

function get_event_coordinate(e) {
	if(typeof(e) != 'object') {
		return false
	}	
	
	var offSetLeft, offSetTop;
	
	if (window.pageXOffset) {
        offSetLeft = window.pageXOffset;
        offSetTop = window.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {
        offSetLeft = document.documentElement.scrollLeft;
        offSetTop = document.documentElement.scrollTop;
    } else if (document.body) {
        offSetLeft = document.body.scrollLeft;
        offSetTop = document.body.scrollTop;
    }
	
	offSetLeft = typeof(offSetLeft) == 'number' ? offSetLeft : 0;
	offSetTop = typeof(offSetTop) == 'number' ? offSetTop : 0;
	
	var x_y = new Object;
	x_y.x = (e.x ? e.x + offSetLeft : e.pageX);
	x_y.y = (e.y ? e.y + offSetTop : e.pageY);
	return x_y;
}

function copy_url(txt_value, msg) {
	if(!txt_value) {
		return false;
	}
	if(window.clipboardData) {
		window.clipboardData.clearData();
		window.clipboardData.setData("Text", txt_value);
	} else {
		var flashcopier = 'flashcopier';
		if(!document.getElementById(flashcopier)) {
			$('<div id="' + flashcopier + '"></div>').insertAfter($(document.body));
		}
		$("#flashcopier").html(
			'<embed src="' + base_url + 'system/template/share/media/swf/clipboard.swf" FlashVars="clipboard='+escape(txt_value)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>'
		);
	}
	
	if (typeof msg != 'undefined' && msg) {
		alert(msg);
	}
}

function change_search(type) {
	if(type == 'more') {
		$('#normalsearch').hide();
		$('#moresearch').show();
	} else {
		$('#normalsearch').show();
		$('#moresearch').hide();
	}
}

// 扩展String对象几个属性
String.prototype.trim = function() { return this.replace(/^\s*(.*?)\s*$/, '$1'); };
String.prototype.escape = function() { return this.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');};
String.prototype.isEmpty = function() { return (this.trim() == ''); };
String.prototype.isEmail = function() { var reg = /^([a-z0-9+_]|\-|\.|\-)+@([\w|\-]+\.)+[a-z]{2,4}$/i; return reg.test(this); };
String.prototype.isDate = function() { var reg = /^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[1-2]\d|3[0-1])$/; return reg.test(this); };
String.prototype.isTime = function() { var reg = /^([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$/; return reg.test(this); };
String.prototype.isURL = function() {var reg = /^(https?|ftp):\/\//i; return reg.test(this)};
String.prototype.isURL_relative = function() { return true; };

function get_radio_value(name) {
	var value = null;
	$('input[name='+name+']').each(function(){
		if(this.checked) {
			value = this.value;
		}
	});
	return value;
}

function change_tab(target_tab) {
	var target_tab = $(target_tab);
	//var contents=tabArea.childNodes;
	
	// 显示当前的选择的内容
	$("#" + target_tab.attr('id') + "_content").show();
	$("#" + target_tab.attr('id') + "_content").siblings("ul").hide();
	$("#" + target_tab.attr('id') + "_content").siblings("ol").hide();

	// main变换
	target_tab.siblings().removeClass("tab_highlight").addClass("tab_normal");
	target_tab.removeClass("tab_normal").addClass('tab_highlight');
}


/** pocle增强消息提示框
 * @param string 消息内容
 * @param 点击后的事件信息
 */
var msgw,msgh;
msgw = 300; // 提示窗口的宽度
msgh = 100; // 提示窗口的高度
function poc_alert(msg, e){
	//alert(e);return false;
	e = e ? e : window.event;
	
	var offSetLeft, offSetTop;
	if (window.pageXOffset) {
        offSetLeft = window.pageXOffset;
        offSetTop = window.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {
        offSetLeft = document.documentElement.scrollLeft;
        offSetTop = document.documentElement.scrollTop;
    } else if (document.body) {
        offSetLeft = document.body.scrollLeft;
        offSetTop = document.body.scrollTop;
    }
	offSetLeft = typeof(offSetLeft) == 'number' ? offSetLeft : 0;
	offSetTop = typeof(offSetTop) == 'number' ? offSetTop : 0;
	
	// 获取鼠标点击时的坐标
	try {
		var x = e.clientX;
		var y = e.clientY;
		
		if(offSetLeft != 0 || offSetTop != 0) {
			x += offSetLeft;
			y += offSetTop;			
		}	
		if(x + msgw > document.body.clientWidth) {
			x = document.body.clientWidth - msgw; 
		}	
		
	} catch(e) {
		var x = offSetLeft + Math.round((document.documentElement.clientWidth - msgw) / 2);
		var y = offSetTop + Math.round((document.documentElement.clientHeight - msgh) / 2);
	}
			
	if(typeof($('#ajaxMsgDiv')[0]) == 'undefined') {		
		
		// 创建消息div
		$('<div></div>')
			.attr('id', 'ajaxMsgDiv')
			.css({
				left : x + 'px',
				top : y + 'px',
				width : msgw + 'px',
				height : msgh + 'px'
			})
			.appendTo($(document.body));
			
		// 创建消息标题
		$('<h4></h4>').attr('id', 'msgTitle').html('X').click(function(){
				$('#ajaxMsgDiv').hide();
			})
			.appendTo($('#ajaxMsgDiv'));
			
		// 创建消息内容
		$('<p></p>')
			.attr('id', 'ajaxMsgTxt')
			.css({
				margin : '1em 0'
			})
			.html(msg)
			.appendTo($('#ajaxMsgDiv'));
			
	} else {
		
		// 确定坐标和修改消息内容
		$('#ajaxMsgDiv')
			.css({
				left : x + 'px',
				top : y + 'px'
			})
			.show()
			.find('#ajaxMsgTxt')
			.html(msg);
	}
	
}


/** 提示框2：
 * t:提示框停留时间，单位毫秒,默认1000毫秒
 */
function poc_pop(msg, e){

	var msgw = 262; // 提示窗口的宽度
	var msgh = 40; // 提示窗口的高度
	//alert(e);return false;
	e = e ? e : window.event;
	
	var offSetLeft, offSetTop;
	if (window.pageXOffset) {
        offSetLeft = window.pageXOffset;
        offSetTop = window.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {
        offSetLeft = document.documentElement.scrollLeft;
        offSetTop = document.documentElement.scrollTop;
    } else if (document.body) {
        offSetLeft = document.body.scrollLeft;
        offSetTop = document.body.scrollTop;
    }
	offSetLeft = typeof(offSetLeft) == 'number' ? offSetLeft : 0;
	offSetTop = typeof(offSetTop) == 'number' ? offSetTop : 0;
	
	// 获取鼠标点击时的坐标
	try {
		var x = e.clientX;
		var y = e.clientY;
		
		if(offSetLeft != 0 || offSetTop != 0) {
			x += offSetLeft;
			y += offSetTop;			
		}	
		if(x + msgw > document.body.clientWidth) {
			x = document.body.clientWidth - msgw; 
		}	
		
	} catch(e) {
		var x = offSetLeft + Math.round((document.documentElement.clientWidth - msgw) / 2);
		var y = offSetTop + Math.round((document.documentElement.clientHeight - msgh) / 2);
	}
			
	if(typeof($('#MsgPop')[0]) == 'undefined') {		
		
		// 创建消息div
		$('<div></div>')
			.attr('id', 'MsgPop')
			.css({
				left : x + 'px',
				top : y + 'px'
			}).html(msg)
			.appendTo($(document.body)).fadeIn();
			
	} else {
		// 确定坐标和修改消息内容
		$('#MsgPop')
			.css({
				left : x + 'px',
				top : y + 'px'
			})
			.fadeIn()
			.html(msg);
	}
	//定时消失
	setTimeout(function(){
		$("#MsgPop").fadeOut("fast",function(){
			//$("#MsgPop").remove();
		});
	},1500); 
}

