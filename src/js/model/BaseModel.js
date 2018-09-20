// 必须继承才能使用
class BaseModel {
	constructor () {
	}
	// 设置数据
	setDataWithJson (json) {
		Object.assign(this, json)
	}
	// 只重置参数的json
	setDataWithArgsJson (dataArr, json) {
		for(let i of dataArr) {
			this[i] = json[i]
		}
	}
	// 根据数据设置对象并获取
	static creatModelWithJson (json) {
		const model = new this()
		model.setDataWithJson(json)
		return model
	}
	// 根据json数组获取数组对象
	static getModelsWithArr (dataArr) {
		return dataArr.map((item) => {
			return this.creatModelWithJson(item)
		})
	}
	// 根据传入的数组获取模型
	getJson (keys, json = {}) {
		keys.forEach((key) => {
			if (typeof key === 'string') {
				json[key] = this[key]
			} else {
				json[key[1]] = this[0]
			}
		})
		return json
	}
	// 获取json对象
	static getJson (obj, keys, json = {}) {
		return obj.getJson(keys, json)
	}
}

export default BaseModel
