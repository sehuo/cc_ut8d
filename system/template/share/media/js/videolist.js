function addvideo(info, order) {
	
	for (var i in window.opener.vids) {
		if (info[0] == window.opener.vids[i]) {
			return false;
		}
	}
	
	var k = 0;
	var video_hidden = window.opener.document.getElementById('video_hidden');
	var video_new = video_hidden.cloneNode(true);
	video_new.id = 'video_' + info[0];
	video_new.style.display = '';
	for(var i = 0; i < video_new.childNodes.length; i++) {
		// 保证有正常的元素节点
		if (video_new.childNodes[i].nodeName != 'TD') {
			continue;
		}
		
		if (k == 0) {
			var td = video_new.childNodes[i];
			for (var j = 0; j < td.childNodes.length; j++) {
				var node = td.childNodes[j];
				if(node.nodeName == 'A') {
					node.href = info[3];
					for (var curr_index = 0; node.childNodes.length; curr_index++) {
						if (node.childNodes[curr_index].nodeName == 'IMG') {
							node.childNodes[curr_index].src = info[1];
							break;
						}
					}
					break;
				}
			}
		} else if (k == 1) {
			video_new.childNodes[i].innerHTML = '<a target="_blank" href="' + info[3] + '">' + info[2] + '</a>';
		} else if (k == 2) {
			video_new.childNodes[i].innerHTML = info[4];
		} else if (k == 3) {
			video_new.childNodes[i].innerHTML = info[5] + ' ' + info[6];
		} else if (k == 4) {
			video_new.childNodes[i].innerHTML = info[0];
		} else if (k == 5) {
			var td = video_new.childNodes[i];
			for (var j = 0; j < td.childNodes.length; j++) {
				var node = td.childNodes[j];
				if(node.name == 'del') {
					//node.onclick = function() {window.opener.remove_video(info[0])}
				} else if(node.name == 'move') {
					//$(node).bind('mousedown', window.opener.mouse_down);
				} else if(node.name == 'vid[]') {
					node.value = info[0];
				}
			}
		}
		k++;
	}
	if (typeof order != 'undefined' && order == 'before') {
		video_hidden.parentNode.insertBefore(video_new, video_hidden.parentNode.firstChild);
	} else {
		video_hidden.parentNode.appendChild(video_new);
	}
	window.opener.$('#video_' + info[0] + ' input[name="del"]')[0].onclick = function () {window.opener.remove_video(info[0])};
	window.opener.$('#video_' + info[0] + ' input[name="move"]').bind('mousedown', window.opener.mouse_down);
	window.opener.$('#video_' + info[0]).bind('mousemove', window.opener.mouse_move).bind('mouseup', window.opener.mouse_release);
	window.opener.vids.push(info[0]);
	removeadd(info[0]);
}

function addvideos(order) {
	if (order == 'before') {
		var ids = [];
		$.each($('input[type="checkbox"][name="vids"]'), function(cur_index, cur_element){
			if (cur_element.checked) {
				ids.push(cur_element.value);
			}
		});
		for (var i = ids.length - 1; i >= 0; i--) {
			document.getElementById('video_' + ids[i] + '_' + order).onclick();
		}
	} else {
		$.each($('input[type="checkbox"][name="vids"]'), function(cur_index, cur_element){
			if (cur_element.checked) {
				document.getElementById('video_' + cur_element.value + '_' + order).onclick();
			}
		});
	}
}

function resetadd(id) {
	var order = ['before', 'after'];
	for (var i = 0; i < order.length; i++) {
		var element = document.getElementById('video_' + id + '_' + order[i]);
		if (element) {
			element.innerHTML = order[i] == 'before' ? '向前添加' : '向后添加';
			element.style.cursor = 'pointer';
			element.style.color = '#0000FF';
		}
	}
}

function removeadd(id) {
	var order = ['before', 'after'];
	for (var i = 0; i < order.length; i++) {
		var element = document.getElementById('video_' + id + '_' + order[i]);
		if (element) {
			element.innerHTML = order[i] == 'before' ? '已添加' : '';
			element.style.cursor = '';
			element.style.color = '';
		}
	}
}

function initvideos() {
	for (var i in window.opener.vids) {
		removeadd(window.opener.vids[i]);
	}
}

$().ready(initvideos);
