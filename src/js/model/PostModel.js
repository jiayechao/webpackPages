import BaseModel from './BaseModel.js'
import { postDetil } from '../post/Apis'
import {timeDistanceForat} from '../../util/tool'
import CommentsModel from './CommentsModel'

class PostModel extends BaseModel{
	constructor() {
		super()
		// 帖子ID
		this.id = null
		// 用户名称
		this.userName = null
		// 用户头像
		this.userAvatar = null
		// 创建时间
		this.createTime = null
		this.createTimeStr = null
		// 帖子内容
		this.content = null
		// 图片
		this.images = []
		// 点赞数
		this.good = 0
		// 分享数
		this.shares = 0
		// 评论列表
		this.commentList = []
		// 评论个数
		this.posts = 0
	}

	setDataWithJson(json) {
		super.setDataWithJson(json)
		this.createTimeStr = timeDistanceForat(this.createTime)
	}

	// 获取帖子详情
	getPostDetil(id) {
		this.id = id
		return new Promise((resolve, reject) => {
			postDetil(id).then((data) => {
				this.setDataWithJson(data)
				this.getCommentsList()
				resolve(this)
			}).catch((err) => {
				reject(err)
			})
		})
	}
	// 获取评论列表
	getCommentsList() {
		const lastId = this.commentList.length > 0 ? this.commentList[this.commentList.length - 1].id : 0
		// 获取评论列表
		CommentsModel.getCommentsList(this.id, lastId).then((data) => {
			this.commentList = this.commentList.concat(data)
		}).catch(() => {

		})
	}
}

export default PostModel