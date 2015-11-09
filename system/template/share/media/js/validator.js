/**
 * 支持类型 
 * string test属性支持正则 test="^.{1,8}$" 
 * int test属性支持限定范围 test='*,8' or '8,*' or '1,9' 
 * float test属性支持限定范围 test='*,8' or '8,*' or '1,9' 
 * date 不支持test属性 
 * email 不支持test属性 
 * mobile 不支持test属性 
 * post_code 不支持test属性 
 * tel_num 不支持test属性 
 * id_card 不支持test属性 
 * region 不支持test属性 
 * url 不支持test属性
 */


// dateType
dt_string = function() {
	this.check = function(val) {
		return true
	};
	this.test = function(val, testStr) {
		return new RegExp(testStr).test(val)
	};
};
dt_int = function() {
	this.check = function(val) {
		return parseInt(val) == val;
	};
	this.test = function(val, testStr) {
		var arr = testStr.split(',');
		val = parseInt(val);
		var test = arr[0].trim();
		if (test != '*' && val < parseInt(test))
			return false;
		if (arr.length > 1) {
			test = arr[1].trim();
			if (test != '*' && val > parseInt(test))
				return false;
		}
		return true;
	};
	this.errorMsg = function() {
			return "不是一个整数！"
	};
};
dt_float = function() {
	this.check = function(val) {
		return parseFloat(val) == val;
	};
	this.test = function(val, testStr) {
		var arr = testStr.split(',');
		val = parseFloat(val);
		var test = arr[0].trim();
		if (test != '*' && val < parseFloat(test))
			return false;
		if (arr.length > 1) {
			test = arr[1].trim();
			if (test != '*' && val > parseFloat(test))
				return false;
		}
		return true;
	};
	this.errorMsg = function() {
			return "不是一个数字！"
	};
};
dt_date = function() {
	var self = this;
	this.preProcess = function(input) {
		try{ 
			$(input).datepicker({
				showOn: 'button',
				buttonImage: 'calendar.gif',
				buttonImageOnly: true
			 }).bind('change', input, function(event){
				 // 传递的input参数通过event.data获取
				 $(event.data).trigger('blur');
			 }); 
		} catch(e){
			alert('this is not support $().datepicker!');
		};
	};
	this.check = function(val) {
		return val.isDate();
	};
	this.errorMsg = function() {
			return "不是一个日期"
	};
};

dt_email = function() {
	this.check = function(val) {
		return val.isEmail();
	};
	this.test = function() {
		return true
	};
	this.errorMsg = function() {
		return "不是一个邮箱格式"
	};
};
dt_tel_num = function() {
	this.check = function(val) {
		return /^[\d|\+|\_|\-]+$/.test(val);
	};
	this.errorMsg = function() {
		return "不是一个电话号码"
	};
};
dt_mobile = function() {
	this.check = function(val) {
		return /^[\d|-|\+]{3,20}$/.test(val);
	};
	this.errorMsg = function() {
			return "不是一个手机号"
	};
};
dt_id_card = function() {
	this.check = function(val) {
		return true
	};
	this.errorMsg = function() {
			return "this value is not IDCard Number!"
		}
};
dt_post_code = function() {
	this.check = function(val) {
		return /^[\d]+$/.test(val);
	};
	this.errorMsg = function() {
			return "this value is not postCode!"
	};
};
dt_url = function() {
	this.check = function(val) {
		return val.isURL();
	};
	this.errorMsg = function() {
		return "不是一个合法url格式！"
	};
};
dt_url_relative = function() {
	this.check = function(val) {
		return val.isURL_relative();
	};
	this.errorMsg = function() {
		return "不是一个合法url格式！"
	};
};
dt_file = function() {
	this.check = function(val) {
		return true
	};
	this.test = function(val, testStr) {
		return true
	};
};

var Validator = {
	types : {
		"string" :new dt_string(),
		"int" :new dt_int(),
		"date" :new dt_date(),
		"email" :new dt_email,
		"tel_num" :new dt_tel_num(),
		"mobile" :new dt_mobile(),
		"id_card" :new dt_id_card(),
		"post_code" :new dt_post_code(),
		"url" :new dt_url(),
		"url_relative" :new dt_url_relative(),
		"region" :new dt_string(),
		"file" :new dt_file(),
		"float" :new dt_float()
	},
	lang : {
		'requiredNote' :'&nbsp;必填项',
		'required' :'&nbsp;必填项',
		'invaild' :'验证失败',
		'formSubmit' :' %s 项验证失败!',
		'gtNote' :'  ',
		'ltNote' :' - ',
		'theValue' :'取值范围:'
	},
	
	// debug开关，调式时可以打开
	debug : false,
	inputs : [],
	selects : [],
	textAreas : [],
	
	// 选项参数 以名称为索引
	options : [],
	
	preSubmit : null,
	bindSubmit : null,
	
	// 添加类型
	addType : function(typeName, typeObj) {
		if (this.types[type_name]) {
			if (this.debug)
				alert("The dataType '" + typeName + "' already exist!");
			return;
		}
		this.types[typeName] = typeObj;
	},
	
	// 添加input元素
	addInput : function(theInput) {
		var name = theInput.getAttribute('name');
		
		// 获取input数据类型
		var dataType = this.getOption(name, 'dataType');
		if (!dataType)
			return false;
		if (!this.types[dataType]) {
			if (this.debug)
				alert("The dataType '" + dataType + "' is not exist!");
			return false;
		}
		theInput['dataType'] = dataType;
		
		// 获取input是否必要项
		var required = this.getOption(name, 'required');
		if (typeof (required) == 'string' && (required.toUpperCase() == 'TRUE' || required.toUpperCase() == 'REQUIRED'))
			theInput['required'] = true;
		else
			theInput['required'] = false;
			
		// 获取input是否可以为空
		var isempty = this.getOption(name, 'isempty');
		if (typeof (isempty) == 'string' && (isempty.toUpperCase() == 'TRUE' || isempty.toUpperCase() == 'ISEMPTY'))
			theInput['isempty'] = true;
		else
			theInput['isempty'] = false;
			
		// 获取input是否只检测一次
		var isvaliditied = this.getOption(name, 'isvaliditied');
		if (typeof (isvaliditied) == 'string' && isvaliditied.toUpperCase() == 'TRUE')
			theInput['isvaliditied'] = true;
		else
			theInput['isvaliditied'] = false;
		
		// 获取input的测试函数
		var testStr = this.getOption(name, 'testStr');
		if (testStr) {
			if (typeof (this.types[theInput.dataType].test) == 'function') {
				theInput.testStr = testStr;
			} else {
				if (this.debug)
					alert("the dataType'" + theInput.dataType
							+ "' is not support method of test!");
			}
		}
		
		// 获取input的执行函数
		var inputFun = this.getOption(name, 'fun');
		if (inputFun) {
			eval('result= typeof(' + inputFun + ') == "function"');
			if (result == true) {
				theInput.fun = eval(inputFun);
				theInput.funParam = this.getOption(name, 'funParam');
			} else {
				if (this.debug)
					alert("The function '" + inputFun + "' is not exist!");
			}
		}
		
		// 获取input的备注
		var Tips = this.getTips(theInput);
		if (Tips.length > 0)
			theInput.tip = Tips[0];
		
		// 获取input的消息提示
		var Msgs = this.getMsgs(theInput);
		theInput.msg = Msgs[0];
		if (theInput.msg)
			$(theInput.msg).hide();
		this.inputs.push(theInput);
	},
	addSelect : function(theSelect) {
		var name = theSelect.getAttribute('name');
		
		var dataType = this.getOption(name, 'dataType');
		if (!dataType)
			return false;
		theSelect['dataType'] = dataType;
		
		var required = this.getOption(name, 'required');
		if (typeof (required) == 'string' && (required.toUpperCase() == 'TRUE' || required.toUpperCase() == 'REQUIRED'))
			theSelect['required'] = true;
		else
			theSelect['required'] = false;
		
		var Tips = this.getTips(theSelect);
		if (Tips.length > 0)
			theSelect.tip = Tips[0];
		
		var Msgs = this.getMsgs(theSelect);
		theSelect.msg = Msgs[0];
		if (theSelect.msg)
			$(theSelect.msg).hide();
			
		// 获取select是否可以为空
		var isempty = this.getOption(name, 'isempty');
		if (typeof (isempty) == 'string' && (isempty.toUpperCase() == 'TRUE' || isempty.toUpperCase() == 'ISEMPTY'))
			theSelect['isempty'] = true;
		else
			theSelect['isempty'] = false;
			
		// 获取input是否只检测一次
		var isvaliditied = this.getOption(name, 'isvaliditied');
		if (typeof (isvaliditied) == 'string' && isvaliditied.toUpperCase() == 'TRUE')
			theSelect['isvaliditied'] = true;
		else
			theSelect['isvaliditied'] = false;
		
		var selectFun = this.getOption(name, 'fun');
		if (selectFun) {
			eval('result= typeof(' + selectFun + ') == "function"');
			if (result == true) {
				theSelect.fun = eval(selectFun);
				theSelect.funParam = this.getOption(name, 'funParam');
			} else {
				if (this.debug)
					alert("The function '" + selectFun + "' is not exist!");
			}
		}
		this.selects.push(theSelect);
	},
	addTextArea : function(theTextArea) {
		var name = theTextArea.getAttribute('name');
		
		var dataType = this.getOption(name, 'dataType');
		if (!dataType)
			return false;
		theTextArea['dataType'] = dataType;
		
		var required = this.getOption(name, 'required');
		if (typeof (required) == 'string' && (required.toUpperCase() == 'TRUE' || required.toUpperCase() == 'REQUIRED'))
			theTextArea['required'] = true;
		else
			theTextArea['required'] = false;
		
		var Tips = this.getTips(theTextArea);
		if (Tips.length > 0) {
			theTextArea.tip = Tips[0];
			theTextArea.tip.style.cssFloat = "left";
			theTextArea.tip.style.styleFloat = "left";
		}
		
		var Msgs = this.getMsgs(theTextArea);
		theTextArea.msg = Msgs[0];
		theTextArea.msg.style.cssFloat = "left";
		theTextArea.msg.style.styleFloat = "left";

		if (theTextArea.msg)
			$(theTextArea.msg).hide();
		
		// 获取text是否可以为空
		var isempty = this.getOption(name, 'isempty');
		if (typeof (isempty) == 'string' && (isempty.toUpperCase() == 'TRUE' || isempty.toUpperCase() == 'ISEMPTY'))
			theTextArea['isempty'] = true;
		else
			theTextArea['isempty'] = false;
			
		// 获取input是否只检测一次
		var isvaliditied = this.getOption(name, 'isvaliditied');
		if (typeof (isvaliditied) == 'string' && isvaliditied.toUpperCase() == 'TRUE')
			theTextArea['isvaliditied'] = true;
		else
			theTextArea['isvaliditied'] = false;
		
		var textAreaFun = this.getOption(name, 'fun');
		if (textAreaFun) {
			eval('result= typeof(' + textAreaFun + ') == "function"');
			if (result == true) {
				theTextArea.fun = eval(textAreaFun);
				theTextArea.funParam = this.getOption(name, 'funParam');
			} else {
				if (this.debug)
					alert("The function '" + textAreaFun + "' is not exist!");
			}
		}

		theTextArea.style.cssFloat = "left";
		theTextArea.style.styleFloat = "left";
		this.textAreas.push(theTextArea);
	},
	getTips : function(theElement) {
		var Tips = $('#' + theElement.getAttribute('name') + '_note').get();
		if(Tips.length == 0) {
			var Tips = $(theElement).siblings('.v_note').get();
		}
		if(Tips.length == 0 && theElement.required) {
			var tip = $('<span class="v_note"></span>').get(0);
			if (theElement.tagName == 'INPUT' && ((theElement.dataType == 'int' || theElement.dataType == 'float') && theElement.testStr)) {
				var rang_note = '';
				var arr = theElement.testStr.split(',');
				if (arr[0] != '*') {
					rang_note += this.lang.gtNote;
					rang_note += arr[0];
				}
				if (arr.length > 1) {
					if (arr[1] != '*') {
						rang_note += this.lang.ltNote;
						rang_note += arr[1];
					}
				}
				tip.innerHTML = this.lang.theValue;
				tip.innerHTML += rang_note;
			} else
				tip.innerHTML = this.lang.requiredNote;
				
			$(theElement).after(tip);
			Tips.push(tip);
		}
		return Tips;
	},
	getMsgs : function(theElement) {
		var Msgs = $('#' + theElement.getAttribute('name') + '_msg').get();
		if(Msgs.length == 0) {
			var Msgs = $(theElement).siblings('.v_msg').get();
		}
		if(Msgs.length == 0) {
			var msg = $('<span class="v_msg"></span>').get(0);
			$(theElement).after(msg);
			Msgs.push(msg);
		}
		return Msgs;
	},
	addForm : function(formName) {
		if (!document.forms[formName]) {
			if (this.debug)
				alert("The Form '" + formName + "' is not exist");
			return false;
		}
		var frm = document.forms[formName];
		var self = this;
		
		for ( var i = 0; i < frm.elements.length; i++) {
			if (frm.elements[i].tagName == 'INPUT')
				this.addInput(frm.elements[i]);
			else if (frm.elements[i].tagName == 'SELECT') {
				this.addSelect(frm.elements[i]);
			} else if (frm.elements[i].tagName == 'TEXTAREA') {
				this.addTextArea(frm.elements[i]);
			}
		}
		
		if(typeof frm.onsubmit == 'function') {
			this.bindSubmit = frm.onsubmit;
		}
		
		frm.onsubmit = function(e) {
			
			var evt = (typeof e == "undefined") ? window.event : e; 
			evt.cancelBublle = false;
			if (typeof (self.preSubmit) == 'function') {
				if (!self.preSubmit())
					return false;
			}
			
			if(!self.checkAll(this.name)) {
				return false;
			}
			
			if (typeof (self.bindSubmit) == 'function') {
				if (!self.bindSubmit.call(this))
					return false;
			}
			
			return true;
		}
		
	},
	run : function(formName, options) {
		this.options = options;
		if(options['debug']) this.debug = options.debug;
		var self = this;

		if (formName)
			this.addForm(formName);
		for ( var key in this.inputs) {
			if (typeof (this.inputs[key]) != 'object')
				continue;
			var dataType = this.inputs[key].dataType;
			if (typeof (this.types[dataType]['preProcess']) == "function")
				this.types[dataType].preProcess(this.inputs[key]);

			$(this.inputs[key]).bind('focus', this.inputs[key], function(event){
				return self.activeTip(event.data);
			}).bind('blur', this.inputs[key], function(event) {
				return self.checkFormVal(event.data);
 			});
		}
		
		for ( var key in this.selects) {
			if (typeof (this.selects[key]) != 'object')
				continue;

			$(this.selects[key]).bind('focus', this.selects[key], function(event){
				return self.activeTip(event.data);
			}).bind('blur', this.selects[key], function(event) {
				return self.checkSelectVal(event.data);
			});
		}
		
		for ( var key in this.textAreas) {
			if (typeof (this.textAreas[key]) != 'object')
				continue;
			$(this.textAreas[key]).bind('focus', this.textAreas[key], function(event){
				return self.activeTip(event.data);
			}).bind('blur', this.textAreas[key], function(event) {
				return self.checkFormVal(event.data);
			});
		}
	},
	checkFormVal : function(theInput) {
		if (theInput.disabled) {
			return true;
		}
		theInput.validity = false;
		this.hideFormTip(theInput);

		theInput.msg.innerHTML = "Checking....";
		if (theInput.tagName.toUpperCase() == 'TEXTAREA') {
			$(theInput.msg).css('display','block');
		} else {
			$(theInput.msg).css('display','inline');
		}
		
		// 必填项内容为空
		if (theInput.required && theInput.value.isEmpty()) {
			theInput.msg.innerHTML = this.lang.required;
			this.showError(theInput);
			return false;
		}
		
		// 执行函数调用		
		if (theInput.fun) {
			var result = theInput.fun(theInput, theInput.funParam);
			if (result !== true) {
				theInput.msg.innerHTML = result;
				this.showError(theInput);
				return false;
			}
		}
		
		if (theInput.isempty && theInput.value.isEmpty()) {
			theInput.validity = true;
			this.showOk(theInput);
			return true
		}
		
		if (!this.types[theInput.dataType].check(theInput.value)) {
			theInput.msg.innerHTML = this.types[theInput.dataType].errorMsg();
			this.showError(theInput);
			return false;
		}
		
		if (theInput.testStr && (!this.types[theInput.dataType].test(theInput.value, theInput.testStr))) {
			theInput.msg.innerHTML = this.lang.invaild;
			this.showError(theInput);
			return false;
		}

		theInput.validity = true;
		this.showOk(theInput);
	},
	checkSelectVal : function(theSelect) {
		if (theSelect.disabled) {
			return true;
		}
		theSelect.validity = false;
		this.hideFormTip(theSelect);
		theSelect.msg.innerHTML = "Checking....";
		
		$(theSelect.msg).css('display', 'inline');
		if (theSelect.required && (theSelect.value == "" || theSelect.value == "0")) {
			theSelect.msg.innerHTML = this.lang.required;
			this.showError(theSelect);
			return false;
		}

		if (theSelect.fun) {
			var result = theSelect.fun(theSelect, theSelect.funParam);
			if (result !== true) {
				theSelect.msg.innerHTML = result;
				this.showError(theSelect);
				return false;
			}
		}

		theSelect.validity = true;
		this.showOk(theSelect);
	},
	checkAll : function(formName) {
		var count = 0;
		var is_first = true;
		for ( var i in this.inputs) {
			if (typeof (this.inputs[i]) == 'function')
				continue;
			if (this.inputs[i].form && this.inputs[i].form.name == formName) {
				if (!this.inputs[i].isvaliditied || this.inputs[i].validity == undefined)
					this.checkFormVal(this.inputs[i]);
				if (!this.inputs[i].validity && !this.inputs[i].disabled) {
					if (is_first) {
						try {
							this.inputs[i].focus();
						} catch (e) {
						}
						is_first = false;
					}
					if (this.debug)
						alert(this.inputs[i].name);
					count++;
				}
			}
		}

		for ( var i in this.selects) {
			if (typeof (this.selects[i]) == 'function')
				continue;
			if (this.selects[i].form && this.selects[i].form.name == formName) {
				if (!this.selects[i].isvaliditied || this.selects[i].validity == undefined)
					this.checkSelectVal(this.selects[i]);
				if (!this.selects[i].validity && !this.selects[i].disabled) {
					if (this.debug)
						alert(this.selects[i].name);
					count++;
				}
			}
		}

		for ( var i in this.textAreas) {
			if (typeof (this.textAreas[i]) == 'function')
				continue;
			if (this.textAreas[i].form && this.textAreas[i].form.name == formName) {
				if (!this.textAreas[i].isvaliditied || this.textAreas[i].validity == undefined)
					this.checkFormVal(this.textAreas[i]);
				if (!this.textAreas[i].validity && !this.textAreas[i].disabled) {
					if (this.debug)
						alert(this.textAreas[i].name);
					count++;
				}
			}
		}

		if (count > 0) {
			var formSubmit = this.lang.formSubmit;
			if(this.debug) 
				alert(formSubmit.replace(/%s/, count));
			return false;
		} else {
			return true;
		}
	},
	activeTip : function(theInput) {
		if (theInput.disabled) {
			return true;
		};
		theInput.validity = null;
		if (theInput.msg)
			$(theInput.msg).hide();
		if (!theInput.tip)
			return;
		$(theInput.tip).addClass('v_active');
		if (theInput.tagName.toUpperCase() == 'TEXTAREA') {
			$(theInput.tip).css('display','block');
		} else {
			if (theInput.is_block) {
				$(theInput.tip).css('display','block');
			} else {
				$(theInput.tip).css('display','inline');
			}
		}
	},
	hideFormTip : function(theInput) {
		if (!theInput.tip)
			return;
		if (theInput.style.display == 'block') {
			theInput.is_block = true;
		}
		$(theInput.tip).hide();
	},
	showError : function(theInput) {
		//theInput.msg.innerHTML = '&nbsp;';
		$(theInput.msg).removeClass('v_right').addClass('v_error');
		if (theInput.tagName.toUpperCase() == 'TEXTAREA') {
			$(theInput.msg).css('display','block');
		} else {
			$(theInput.msg).css('display','inline');
		}
	},
	showOk : function(theInput) {
		theInput.msg.innerHTML = '&nbsp;';
		$(theInput.msg).removeClass('v_error').addClass('v_right');
		if (theInput.tagName.toUpperCase() == 'TEXTAREA') {
			$(theInput.msg).css('display','block');
		} else {
			$(theInput.msg).css('display','inline');
		}
	},
	getOption : function(name, key) {
		var value = null;
		if(typeof(this.options[name]) == 'undefined') {
			return value;
		} else {
			var theOption = this.options[name];
		}
		
		if(typeof(theOption[key]) == 'undefined') {
			return value;
		} 
		value = theOption[key];
		return value;
	}
};
