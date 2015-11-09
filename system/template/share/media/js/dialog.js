/* Utility functions */

function bindEventHandler(element, eventName, handler) {
	if (element.addEventListener) {
		// The standard way
		element.addEventListener(eventName, handler, false);
	} else if (element.attachEvent) {
		// The Microsoft way
		element.attachEvent('on' + eventName, handler);
	}
}

/**
 * The modal dialog class
 * @constructor
 */
function Dialog(options) {
	this.options = {
		width: 400,
		top: 120,
		overlay: false,
		openOnCreate: true,
		destroyOnClose: true,
		escHandler: this.close,
		buttons: {'OK': this.close},
		autoClose: 0,
		objName: null
	};
	// Overwrite the default options
	for (var option in options) {
		this.options[option] = options[option];
	}
	
	// Create dialog dom
	this._makeNodes();
	if (this.options.openOnCreate) {
		this.open();
	}
}

Dialog.prototype = {
	/* handles to the dom nodes */
	container: null,
	header: null,
	title: null,
	body: null,
	content: null,
	actions: null,
	_visible: false, // 是否可见
	_overlay: null,
	_wrapper: null,
	_zIndex: 0,
	_escHandler: null,
	_autoTimeId: null,
	
	/**
	 * Shows the dialog
	 */
	open: function() {
		
		this._makeTop();
		
		if (this.options.overlay) {
			this._overlay.style.display = 'block';
		}
		this._wrapper.style.display = 'block';
		this._wrapper.focus();

		if (this.options.focus) {
			var input = document.getElementById(this.options.focus);
			if (input) {
				input.focus();
			}
		}
		
		if(this.options.autoClose) this.setAutoClose();
		
		this._visible = true;
	},
	
	/**
	 * Closes the dialog
	 */
	close: function() {
		
		if(!this._visible) return;
		
		if (this.options.destroyOnClose) {
			this._destroy();
		} else {
			if (this.options.overlay) {
				this._overlay.style.display = 'none';
			}
			this._wrapper.style.display = 'none';
		}
		
		if(this._autoTimeId) this.stopAutoClose();
		
		this._visible = false;

	},
	
	isVisible: function() {
        return this._visible;    
    },

	/**
	 * Add buttons to the dialog actions panel after creation
	 * @param {object} buttons Object with property name as button text and value as click handler
	 * @param {boolean} prepend If true, buttons will be prepended to the panel instead of being appended
	 */
	addButtons: function(buttons, prepend) {
		var actions = this.actions;
		var buttonArray = this._makeButtons(buttons);
		var first = null;
		if (prepend && (first = actions.firstChild) != null) {
			for (var i in buttonArray) {
				actions.insertBefore(buttonArray[i], first);
			}
		} else {
			for (var i in buttonArray) {
				actions.appendChild(buttonArray[i]);
			}
		}
	},
	
	center: function() {
        var ws = this._wrapper.style;
		
		ws.left = parseInt((document.body.clientWidth - this.options.width) / 2) + 'px';		
		scrolltop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
		ws.top = parseInt(this.options.top + scrolltop) + 'px';
        //return this;
    },
	
	// Move this dialog to some position, funnily enough
    moveTo: function(x, y) {
        this._moveToX(x)._moveToY(y);
        //return this;
    },
    
    // Move this dialog (x-coord only)
    _moveToX: function(x) {
        if (typeof x == 'number') $(this._wrapper).css({left: x});
        return this;
    },
    
    // Move this dialog (y-coord only)
    _moveToY: function(y) {
        if (typeof y == 'number') $(this._wrapper).css({top: y});
        return this;
    },
	
	setAutoClose: function() {
		if(!this.options.autoClose || typeof this.options.autoClose != 'number') {
			return;
		}
		var self = this;
		
		this.startAutoClose();
		$(this._wrapper).bind('mouseover', function(event){
			
			if(!$(event.target).hasClass('dialog')) {
				self.stopAutoClose();
			}
			return false;
		}).bind('mouseout', function(event){
			if($(event.target).hasClass('dialog')) {
				self.startAutoClose();
			}
			return false;
		});
	},
	
	startAutoClose: function() {
		if(!this._autoTimeId) {
			this._autoTimeId = window.setTimeout(this.options.objName + '.close()', this.options.autoClose * 1000);
		}
	},
	
	stopAutoClose: function() {
		if(!this._autoTimeId) return;
		
		window.clearTimeout(this._autoTimeId);
		this._autoTimeId = null;
	},

	/**
	 * Change (or set) title after creation
	 * @param {string} title The dialog title
	 */
	setTitle: function(title) {
		if (!this.header) {
			var header = this._makeHeader();
			this.container.insertBefore(header, this.body);
			this.header = header;
		}
		if(title) 
			this.title.innerHTML = title;
	},
	
	setClass: function(className) {
		this._wrapper.className = className;
	},
	
	/**
	 * set content 
	 * @param {string} The dialog content
	 */
	setContent: function(content) {
		if(!this.content) {
			var _content = document.createElement('div');
			_content.className = 'dialog-content';
			this.content = _content;
		}
		
		if(typeof content == 'object') {
			if(content instanceof jQuery == false) {
				content = $(content);
			}
			content = content instanceof jQuery? content :$(content);
			$(this.content).html('').append(content);
		} else if(typeof content == 'string' || typeof content == 'number') {
			$(this.content).html(content);
		} else {
			alert('set content Error: Unsupported data type: '+typeof content);
			return false;
		}
	},

	_makeHeader: function() {
		var header = document.createElement('div');
		header.className = 'dialog-header';
		
		var title = document.createElement('span');
		title.className = 'dialog-title';
		
		var close = document.createElement('span');
		close.className = 'dialog-close';
		close.innerHTML = 'X';
		var self = this;
		close.onclick = function(e) {
			Dialog.prototype.close.call(self, e);
		}
		header.appendChild(close);
		header.appendChild(title);
		
		this.title = title;
		return header;
	},

	/**
	 * Makes the dom tree for the dialog
	 */
	_makeNodes: function() {
		if (this._overlay || this._wrapper) {
			return; // Avoid duplicate invocation
		}
		// Make overlay
		if(this.options.overlay) {
			this._overlay = document.createElement('div');
			this._overlay.className = 'dialog-overlay';
			document.body.appendChild(this._overlay);
		}

		if (typeof this.options.title == 'string' && this.options.title != '') {
			var header = this._makeHeader();
			this.title.innerHTML = this.options.title;
			this.header = header;
		}

		// {begin dialog body
		if(!this.options.content) {
			this.options.content = 'undefine';
		}
		this.setContent(this.options.content);
		
		//   {begin actions panel
		var actions = document.createElement('div');
		actions.className = 'dialog-actions';
		var buttons = this._makeButtons(this.options.buttons);
		if (buttons.length > 0) {
			for (var i in buttons) {
				actions.appendChild(buttons[i]);
			}
		}
		this.actions = actions;
		//   }end actions panel

		var body = document.createElement('div');
		body.className = 'dialog-body';
		body.appendChild(this.content);
		body.appendChild(actions);
		this.body = body;
		// }end dialog body

		var container = document.createElement('div');
		container.className = 'dialog';
		if (this.header) {
			container.appendChild(header);
		}
		container.appendChild(body);
		this.container = container;

		var wrapper = document.createElement('div');
		wrapper.className = 'dialog-wrapper';
		var ws = wrapper.style;
		ws.position = 'absolute';
		ws.width = this.options.width + 'px';
		//ws.height = this.options.height + 'px';
		ws.display = 'none';
		ws.outline = 'none';
		wrapper.appendChild(container);
		// register keydown event
		if (this.options.escHandler) {
			wrapper.tabIndex = -1;
			this._onKeydown = this._makeHandler(function(e) {
				if (!e) {
					e = window.event;
				}
				if (e.keyCode && e.keyCode == 27) {
					this.options.escHandler.apply(this);
				}
			}, this);
			bindEventHandler(wrapper, 'keydown', this._onKeydown);
		}
		this._wrapper = document.body.appendChild(wrapper);
		this.center();

		if (Dialog.needIEFix) {
			this._fixIE();
		}
	},

	/**
	 * Removes the nodes from document
	 * @param {object} buttons Object with property name as button text and value as click handler
	 * @return {Array} Array of buttons as dom nodes
	 */
	_makeButtons: function(buttons) {
		var buttonArray = new Array();
		for (var buttonText in buttons) {
			var button = document.createElement('button');
			button.className = 'dialog-button';
			button.innerHTML = buttonText;

			bindEventHandler(button, 'click', this._makeHandler(buttons[buttonText], this));

			buttonArray.push(button);
		}
		return buttonArray;
	},

	/** A helper function used by makeButtons */
	_makeHandler: function(method, obj) {
		return function(e) {
			method.call(obj, e);
		}
	},

	/** A helper function used by open */
	_makeTop: function() {
		if (this._zIndex < Dialog.Manager.currentZIndex) {
			if(this.options.overlay) {
				this._overlay.style.zIndex = Dialog.Manager.newZIndex();
			}
			this._zIndex = this._wrapper.style.zIndex = Dialog.Manager.newZIndex();
		}
	},

	_fixIE: function() {
		var width = document.documentElement["scrollWidth"] + 'px';
		var height = document.documentElement["scrollHeight"] + 'px';
		
		if (this.options.overlay) {
			var os = this._overlay.style;
			os.position = 'absolute';
			os.width = width;
			os.height = height;
		}

		var iframe = document.createElement('iframe');
		iframe.className = 'iefix';
		iframe.style.width = width;
		iframe.style.height = height;
		this._wrapper.appendChild(iframe);
	},

	/**
	 * Removes the nodes from document
	 */
	_destroy: function() {
		document.body.removeChild(this._wrapper);
		if (this.options.overlay) {
			document.body.removeChild(this._overlay);
			this._overlay = null;
		}
		this.container = null;
		this.header = null;
		this.title = null;
		this.body = null;
		this.content = null;
		this.actions = null;
		this._wrapper = null;
	}
};

Dialog.needIEFix = (function () {
	var userAgent = navigator.userAgent.toLowerCase();
	return /msie/.test(userAgent) && !/opera/.test(userAgent) && !window.XMLHttpRequest;
})();

/** This simple object manages the z indices */
Dialog.Manager = {
	currentZIndex: 3000,
	newZIndex: function() {
		return ++this.currentZIndex;
	}
};

// 以上是一个类库

// 定义一些常用的显示效果
(function($){
	$.dialog = {
		alertDialog:null,
		confirmDialog:null,
		menuDialog:null,
		ajaxpostHandle:null,
		ajaxdebug:true,
		
		alert:function(content,title) {
			if (!this.alertDialog) {
				// this dialog won't be destroyed when clicking "OK"
				this.alertDialog = new Dialog({
					openOnCreate: false,
					destroyOnClose: false
				});
			}
			if(!title) title = '提示';
			this.alertDialog.setTitle(title);
			this.alertDialog.setContent(content);
			//this.alertDialog.moveTo(110,200);
			this.alertDialog.open();
		},
		
		confirm: function(content, title, callback) {
			if (!this.confirmDialog) {
				// this dialog won't be destroyed when clicking "OK"
				this.confirmDialog = new Dialog({
					openOnCreate: false,
					destroyOnClose: false,
					
					buttons: {
						'OK': function() {
							if($.isFunction(callback)) callback();
							this.close();
						},
						'Cancel': Dialog.prototype.close
					}
				});
			}
			
			if(!title) title = '确认';
			this.confirmDialog.setTitle(title);
			this.confirmDialog.setContent(content);
			this.confirmDialog.open();
		},
		
		popmenu: function(content, currEl, autoClose) {
			if (!this.menuDialog) {
				this.menuDialog = new Dialog({
					width: 'auto',
					overlay: false,
					openOnCreate: false,
					destroyOnClose: false,
					buttons: {},
					autoClose: autoClose ? autoClose : 0,
					objName: autoClose ? '$.dialog.menuDialog' : ''
				});
			}
			
			// 弹出的内容
			if(typeof content == 'object') {
				content = content instanceof jQuery ? content : $(content);
			} else if(typeof content == 'string') {
				content = $('#'+content);
			} else {
				alert('pop menu Error: Unsupported content type: '+typeof content);
				return;
			}
			
			this.setPosition(this.menuDialog, currEl);
			this.menuDialog.setContent(content);
			this.menuDialog.open();
		},
		
		hidemenu: function() {
			if (!this.menuDialog || !this.menuDialog.isVisible()) return;
			this.menuDialog.close();
		},
		
		ajaxinit: function(width) {
			
			if (!this.floatDialog) {
				this.floatDialog = new Dialog({
					width: width ? width : 500,
					top: 100,
					overlay: false,
					openOnCreate: false,
					destroyOnClose: false,
					buttons: {},
					return_tip: true
				});
				
				if(!$('#append_parent').get(0)) {
					$(document.body).append('<div id="append_parent" style="display:none"></div>');
				}
			}
		},
		
		ajaxload: function(url, title, width, currEl, options) {
			if(typeof url == "undefined" || !url) return;
			
			this.ajaxinit(width);
	    
	        options = options || {};
	       
			this.setPosition(this.floatDialog, currEl);
			
			if(title)
				this.floatDialog.setTitle(title);
			
			this.showloading(null);
			this.floatDialog.open();
			
			// ajax 请求
			var self = this;
			
	        var ajax = {
	            url: this.changeAJAXUrl(url), 
				type: 'GET', 
				dataType: 'xml', 
				cache: true, 
				success: function(xml) {
	                
					if(xml.lastChild) {
						xml = xml.lastChild.firstChild.nodeValue;
					} else {
						if(this.ajaxdebug) {
							var error = mb_cutstr(xml.replace(/\r?\n/g, '\\n').replace(/"/g, '\\\"'), 200);
							xml = '<root>ajaxerror<script type="text/javascript" reload="1">alert(\'Ajax Error: \\n' + error + '\');</script></root>';
						}
					}
	                //if (options.filter) html = jQuery(options.filter, html);
					self.floatDialog.setContent(xml);
	            }
	        };
	        
	        $.each(['type', 'cache'], function() {
	            if (this in options) {
	                ajax[this] = options[this];
	                delete options[this];
	            }
	        });
			
	        $.ajax(ajax);
			return false;
	    },
		
		ajaxpost: function(formid, showid, waitid, showidclass, submitbtn) {
			
			this.ajaxinit();
			
			if(typeof showid == 'undefined' || showid === null){
				alert('showid is empty');
				return false;
			}
			
			var waitid = typeof waitid == 'undefined' || waitid === null ? showid : (waitid !== '' ? waitid : '');
			var showidclass = !showidclass ? '' : showidclass;
			//this.showloading(showid);
		
			if(this.ajaxpostHandle != null) {
				return false;
			}
			
			// 设置ajaxframe框
			var ajaxframeid = 'ajaxframe';
			var ajaxframe = $('#'+ajaxframeid).get(0);
			if(ajaxframe == null) {
				if ($.browser.msie && !$.browser.opera) {
					ajaxframe = document.createElement("<iframe name='" + ajaxframeid + "' id='" + ajaxframeid + "'></iframe>");
				} else {
					ajaxframe = document.createElement("iframe");
					ajaxframe.name = ajaxframeid;
					ajaxframe.id = ajaxframeid;
				}
				ajaxframe.style.display = 'none';
				$('#append_parent').append(ajaxframe);
		
			}
			var self = this;
			$(ajaxframe).unbind('load').bind('load', function(){
				$.dialog.ajaxpost_load.call(self);
			})
			
			// 设置提交的表单
			theform = $('#'+formid).get(0);
			theform.target = ajaxframeid;
			theform.action = this.changeAJAXUrl(theform.action);
			
			// 禁用submit按钮
			if(submitbtn) {
				$('#'+submitbtn).attr('disabled', true);
			}
			
			this.ajaxpostHandle = {
				'ajaxframeid':ajaxframeid, 
				'formid':formid,
				'target':ajaxframeid,
				'showid':showid,
				'waitid':waitid,
				'showidclass':showidclass,
				'submitbtn':submitbtn
			};
			
			theform.submit();
			
			//$(theform).trigger('submit');
			
			return false;
		},
		
		ajaxpost_load: function() {
			
			var s = '';
			var theiframe = $('#'+this.ajaxpostHandle.ajaxframeid).get(0);
			
			try {
				if($.browser.msie) {
					s = theiframe.contentWindow.document.XMLDocument.text;
				} else {
					s = theiframe.contentWindow.document.documentElement.firstChild.nodeValue;
				}
			} catch(e) {
				if(this.ajaxdebug) {
					var error = mb_cutstr(theiframe.contentWindow.document.body.innerText.replace(/\r?\n/g, '\\n').replace(/"/g, '\\\"'), 200);
					s = '<root>ajaxerror<script type="text/javascript" reload="1">alert(\'Ajax Error: \\n' + error + '\');</script></root>';
				}
			}
			
			//console.log(s);
			//设置显示内容的容器样式
			if(this.ajaxpostHandle.showidclass) {
				$('#'+this.ajaxpostHandle.showid).addClass(this.ajaxpostHandle.showidclass);
			}
			
			// 启用submit按钮
			if(this.ajaxpostHandle.submitbtn) {
				$('#'+this.ajaxpostHandle.submitbtn).attr('disabled', false);
			}
			
			evaled = false;
			
			// 如果包含ajaxerror字符则执行script代码
			if(s != '' && s.indexOf('ajaxerror') != -1) {
				evalscript(s);
				evaled = true;
			}
			
			// 正常逻辑
			if(!evaled && (typeof ajaxerror == 'undefined' || !ajaxerror)) {
				if(this.ajaxpostHandle.showid != null) {
					$('#'+this.ajaxpostHandle.showid).html(s);
				} else {
					this.floatDialog.setContent(s);
				}
				if(!evaled)evalscript(s);
				
				//setTimeout("$.dialog.hidemenu()", 3000);
			}
			ajaxerror = null;
			if($('#'+this.ajaxpostHandle.formid)) {
				$('#'+this.ajaxpostHandle.formid).get(0).target = this.ajaxpostHandle.target;
			}
			this.ajaxpostHandle = null;
		},
		
		hidefloat: function() {
			if (!this.floatDialog || !this.floatDialog.isVisible()) return;
			this.floatDialog.close();
		},
		
		showloading: function(showid, waiting, display) {
			var display = display ? display : 'block';
			var waiting = waiting ? waiting : '页面加载中...';
			if(showid != null) {
				$('#'+showid).html(waiting).css('display', display);
			} else {
				this.floatDialog.setContent(waiting);
			}
		},
		
		changeAJAXUrl: function(url){
			if(url.indexOf('in_ajax=1') != -1) {
				return url;
			}
			
			if(url.indexOf('?') != -1) {
				return url + '&in_ajax=1';
			} else {
				return url + '?in_ajax=1';
			}
		},
		
		setPosition: function(dialog, currEl) {
			
			if(typeof currEl != 'object') {
				currEl = $('#'+currEl).get(0);
			}
			
			var center = !currEl ? true : false;
			if(!center) {
				var x_y = this.getAbsoluteXY(currEl);
				var x = x_y.x;
				var y = x_y.y + this.getAbsoluteHeight(currEl);
				dialog.moveTo(x, y);
			} else {
				dialog.center();
			}
		},
		
		//元素绝对高度
		getAbsoluteHeight: function(ob) {return ob.offsetHeight;},

		//元素绝对宽度
		getAbsoluteWidth: function(ob) {return ob.offsetWidth;},

		//元素左上角坐标
		getAbsoluteXY: function(ob) {
			var x = y = 0;
			el = ob;
			while(el){
				x += el.offsetLeft;
				y += el.offsetTop;
				el = el.offsetParent;
			}; 
			return {'x':x,'y':y};
		}

		
	}
})(jQuery);

var evalscripts = new Array();

function evalscript(s) {
	if(s.indexOf('<script') == -1) return s;
	var p = /<script[^\>]*?>([^\x00]*?)<\/script>/ig;
	var arr = new Array();
	while(arr = p.exec(s)) {
		var p1 = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/i;
		var arr1 = new Array();
		arr1 = p1.exec(arr[0]);
		if(arr1) {
			appendscript(arr1[1], '', arr1[2], arr1[3]);
		} else {
			p1 = /<script(.*?)>([^\x00]+?)<\/script>/i;
			arr1 = p1.exec(arr[0]);
			appendscript('', arr1[2], arr1[1].indexOf('reload=') != -1);
		}
	}
	return s;
}

function appendscript(src, text, reload, charset) {
	var id = hash(src + text);
	if(!reload && in_array(id, evalscripts)) return;
	if(reload && $('#id')) {
		$('#id').remove();
	}

	evalscripts.push(id);
	var scriptNode = document.createElement("script");
	scriptNode.type = "text/javascript";
	scriptNode.id = id;
	scriptNode.charset = charset ? charset : ($.browser.mozilla ? document.characterSet : document.charset);
	try {
		if(src) {
			scriptNode.src = src;
		} else if(text){
			scriptNode.text = text;
		}
		$('#append_parent').append(scriptNode);
	} catch(e) {}
}

function stripscript(s) {
	return s.replace(/<script.*?>.*?<\/script>/ig, '');
}

function hash(string, length) {
	var length = length ? length : 32;
	var start = 0;
	var i = 0;
	var result = '';
	filllen = length - string.length % length;
	for(i = 0; i < filllen; i++){
		string += "0";
	}
	while(start < string.length) {
		result = stringxor(result, string.substr(start, length));
		start += length;
	}
	return result;
}

function stringxor(s1, s2) {
	var s = '';
	var hash = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var max = Math.max(s1.length, s2.length);
	for(var i=0; i<max; i++) {
		var k = s1.charCodeAt(i) ^ s2.charCodeAt(i);
		s += hash.charAt(k % 52);
	}
	return s;
}

function mb_cutstr(str, maxlen, dot) {
	var len = 0;
	var ret = '';
	var dot = !dot ? '...' : '';
	maxlen = maxlen - dot.length;
	for(var i = 0; i < str.length; i++) {
		len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? (charset == 'utf-8' ? 3 : 2) : 1;
		if(len > maxlen) {
			ret += dot;
			break;
		}
		ret += str.substr(i, 1);
	}
	return ret;
}

function in_array(needle, haystack) {
	if(typeof needle == 'string' || typeof needle == 'number') {
		for(var i in haystack) {
			if(haystack[i] == needle) {
					return true;
			}
		}
	}
	return false;
}
//console.log