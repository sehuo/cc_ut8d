
// 记录鼠标是否点击
var mouseDown = false;
// 记录容器是否已经建立
var drag_container_created = false;

// 容器ID
var drag_id;
// 记录当前触发事件的容器
var current_select_container = null;
// 绑定视频容器的一些事件和页面的鼠标事件
function video_container_binding(id){
	
	drag_id=id;
	
	create_drag_container();
	//绑定鼠标按下事件
	$('input[name="move"]').bind('mousedown', function (e) {
		mouseDown = true;
		set_start_posi(e);
		return false;
	});
	
	//页面绑定鼠标移动和释放事件
	$('#'+drag_id).find('tr').bind('mousemove', mouse_move).bind('mouseup', mouse_release);
	$(document).bind('mousemove', mouse_move).bind('mouseup', mouse_release);
}

// 鼠标移动事件
function mouse_move(e) {
	if(mouseDown) {
		move_drag_container(e);
		return false;
	}
}

// 鼠标释放事件
function mouse_release(e) {
	
	if(!mouseDown) return;
	
	mouseDown = false;
	
	var area = get_container_area($('#drag_container').get(0));
	
	hide_drag_container();
	
	// 在新区域设置视频容器
	set_new_container(area);
	
	return false;
}

// 移动容器
function move_drag_container(e) {
	show_drag_container();
	set_drag_container_left_top(e);
}

// 设置开始的位置
function set_start_posi(e) {
	
	//current_select_container = e.currentTarget;
	
	current_select_container = get_select_container(e);
	
	set_drag_container_content(current_select_container);
	
	set_drag_container_left_top(e);
	
	show_drag_container();
}

// 获得当前触发事件的容器
function get_select_container(e) {
	var curr_el = e.target;
	
	while(curr_el.nodeName.toLowerCase() != 'tr') {
		curr_el = curr_el.parentNode;
	}
	return curr_el;
}

// 新创建一个容器用来做拖拽
function create_drag_container(){
	
	if(drag_container_created) return;
	
	var drag_area = get_container_area($('#'+drag_id).get(0));
	
	var newdiv = $('<table id="drag_container"></table>')
	.css({
		'width' : (drag_area.right-drag_area.left) + 'px',
		'height' : '40px',
		'position' : 'absolute',
		'left' : drag_area.left + 'px',
		'top' : drag_area.top + 'px',
		'display' : 'none'
	}).bind('mousedown',function(){return false;});
	
	$(document.body).append(newdiv);
	
	drag_container_created = true;
}

// 设置容器的内容
function set_drag_container_content(content) {
	$('#drag_container').empty().append($(content).clone());
}

// 显示这个拖拽容器
function show_drag_container() {
	if(drag_container_created) {
		$('#drag_container').show();
	}
}

// 隐藏这个拖拽容器
function hide_drag_container() {
	if(drag_container_created) {
		$('#drag_container').hide();
	}
}

// 设置drag_container的左上角
function set_drag_container_left_top(e){
	var drag_container = $('#drag_container');
	
    var y = check_move_Y(e.pageY - 20);
	
	drag_container.css({
		'top': y + 'px'
	});
}

// 判断拖拽容器是否超出所要移动的范围
function check_move_Y(y) {
	var drag_area = get_container_area($('#'+drag_id).get(0));
	
	if(y < drag_area.top) {
		y = drag_area.top; 
	} else if (y > drag_area.bottom) {
		y = drag_area.bottom; 
	}
	
	return y;
}

// 获得所能移动的范围
function get_container_area(el) {
	
	var x_y = getAbsoluteXY(el);
	
	return {
		'left' : x_y.x,
		'top' : x_y.y,
		'right' : x_y.x + el.offsetWidth,
		'bottom' : x_y.y + el.offsetHeight
	};
}

// 插入容器位置
function set_new_container(area) {
	
	//console.log(current_select_container);
	var current_select_container_area = get_container_area(current_select_container);
	// 位置没有发生变化，则不进行任何操作
	
	//console.log(current_select_container_area);
	//console.log(area);
	if(current_select_container_area.top == area.top) return;
	
	var drag_area = get_container_area($('#'+drag_id).get(0));
	//console.log(drag_area);
	
	// 插入最前面
	if(drag_area.top == area.top) {
		$('#'+drag_id).prepend(current_select_container);
		//console.log('插入最前面');
	
	// 插入最后面
	} else if(drag_area.bottom == area.top) {
		$('#'+drag_id).append(current_select_container);
		//console.log('插入最后面');
		
	// 找到要插入位置的前一个容器元素,并且在其后面插入
	} else {
		var before_container = find_before_container(area);
		if(before_container != null) {
			$(before_container).after(current_select_container);
			//console.log('选择一个插入');
		}
	}
	
}

// 找到要插入位置的前一个容器元素
function find_before_container(area) {
	
	var before_container = null;
	
	$('#'+drag_id).find('tr').each(function(i, o){
		var _area = get_container_area(o);
		if((_area.top <= area.top) && (_area.bottom >= area.top)) {
			before_container = o;
			return false;
		}
	});
	
	//console.log(before_container);
	
	return before_container;
}

function getAbsoluteXY(ob) {
	var x = y = 0;
	
	el = ob;

	while(el){
		x += el.offsetLeft;
		y += el.offsetTop;
		el = el.offsetParent;
	}; 
	return {'x':x,'y':y};
}
