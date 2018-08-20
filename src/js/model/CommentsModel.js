import BaseModel from './BaseModel.js'
import { commentsList } from '../post/Apis'
import {timeDistanceForat} from '../../util/tool'

class CommentModel extends BaseModel{
	constructor() {
		super()
		// 当前评论ID
		this.id = null
		// 用户ID
		this.uid = null
		// 用户昵称
		this.alias = null
		// 头像
		this.avatar = null
		// 创建时间
		this.createTime = null
		this.createTimeStr = null
		// 评论内容
		this.content = null
		// 点赞数
		this.good = 0
		// 是否能删除 1：可以删除，0：不可以删除
		this.deleteable = 0
		// 是否可以点赞 1：可以，0：不可以
		this.goodable = 0
	}

	setDataWithJson(json) {
		super.setDataWithJson(json)
		this.createTimeStr = timeDistanceForat(this.createTime)
	}

	// 获取帖子详情(传帖子ID)
	static getCommentsList(id, lastId = 0) {
		return new Promise((resolve, reject) => {
			commentsList(id, lastId).then((data) => {
				const dataArr = this.getModelsWithArr(data)
				resolve(dataArr)
			}).catch((err) => {
				reject(err)
			})
		})
	}
}

export default CommentModel