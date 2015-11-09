if(current_act == 'playlist/add' || current_act == 'playlist/edit') {
	$().ready(function() {
		$('#pic_type_url').click(function(){
			$('#pic_upload').hide();
			$('#pic_url').show();
		});
		$('#pic_type_upload').click(function(){
			$('#pic_url').hide();
			$('#pic_upload').show();
		});
	});
} else if(current_act == 'playlist/modify_list') {
	$().ready(video_container_binding);
	$(window).bind('unload', closewindow);
} else if(current_act == 'playlist/view') {
	$().ready(function() {
		// 统计专辑点击
		if (typeof misc_statistic_update == "undefined" || misc_statistic_update != '1') {
			$.getJSON(base_dir + "index.php?r=ajax/count_view/playlist/" + plid, function(result){});
		}
		// 收藏专辑绑定
		$('#collect_playlist').click(function () {
			$.getJSON(base_dir + "index.php?r=ajax/collect_playlist/" + plid, function(result){
				poc_alert(result.msg);
			});
		})
	});
}

// 记录鼠标是否点击
var mouseDown = false;
// 记录容器是否已经建立
var drag_container_created = false;
// 记录当前触发事件的容器
var current_select_container = null;

// 绑定视频容器的一些事件和页面的鼠标事件
function video_container_binding(){
	
	create_drag_container();
	
	//绑定鼠标按下事件
	$('input[name="move"]').bind('mousedown', mouse_down);
	
	//页面绑定鼠标移动和释放事件
	$('#playlist').find('tr').bind('mousemove', mouse_move).bind('mouseup', mouse_release);
	$(document).bind('mousemove', mouse_move).bind('mouseup', mouse_release);
	
	$('#playlist').bind('keydown', function (event) {
		if (event.target.name == 'order' && event.keyCode==13) {
			event.preventDefault();
			order_change(event);
		}
	});
}


// 鼠标按下事件

function mouse_down(e) {
	mouseDown = true;
	set_start_posi(e);
	return false;
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
	
	var drag_area = get_container_area($('#playlist').get(0));
	
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
	var drag_area = get_container_area($('#playlist').get(0));
	
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
	
	var drag_area = get_container_area($('#playlist').get(0));
	//console.log(drag_area);
	
	// 插入最前面
	if(drag_area.top == area.top) {
		$('#playlist').prepend(current_select_container);
		//console.log('插入最前面');
	
	// 插入最后面
	} else if(drag_area.bottom == area.top) {
		$('#playlist').append(current_select_container);
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
	
	$('#playlist').find('tr').each(function(i, o){
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

function remove_video(vid) {
	var element = document.getElementById('video_' + vid);
	if (element) {
		element.parentNode.removeChild(element);
	}
	
	for (var i in vids) {
		if (vids[i] == vid) {
			delete vids[i];
			if (window_opener && !window_opener.closed) {
				window_opener.resetadd(vid);
			}
			break;
		}
	}
}

function remove_videolist() {
	for (var i in vids) {
		$('#video_' + vids[i]).remove();
	}
	if (window_opener && !window_opener.closed) {
		for (var i in vids) {
			window_opener.resetadd(vids[i]);
		}
	}
	vids = [];
}

function closewindow() {
	if (window_opener != null && !window_opener.closed) {
		window_opener.close();
	}
}

function openwindow(url) {
	if (window_opener && !window_opener.closed) {
		window_opener.focus();
	} else {
		window_opener = window.open(url, '_blank','width=600,height=520,scrollbars=yes,top=50,left=100');
	}
}

function order_change(event) {
	var src_input = event.target ? event.target : event.srcElement;
	var src_element = src_input.parentNode.parentNode;
	var dst_element = document.getElementById('video_' + src_input.value);
	
	if (dst_element) {
		src_input.value = '';
		if (dst_element != src_element) {
			src_element.parentNode.insertBefore(src_element, dst_element);
		}
	}
}
