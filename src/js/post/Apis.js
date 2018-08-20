import Ajax from './AxiosAjax'
/// 获取帖子详情
export function postDetil(id) {
	return Ajax.GET('/api.php/Topic/one', {
		id
	})
}

/// 获取评论列表
export function commentsList(topicId,lastId = 0) {
	return Ajax.GET('/api.php/Post/page', {
		topicId,
		lastId
	})
}

/// 获取投票详情
export function voteDetil(id) {
	return Ajax.GET('/api.php/Topic/one', {
		id
	})
}