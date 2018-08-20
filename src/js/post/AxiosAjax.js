import axios from 'axios'
window.yb_print = console.log

// 创建实例，基本配置
const axiosInstance = axios.create({
	timeout: 5000
})

// 拦截器
axiosInstance.interceptors.request.use((config) => {
	// const token = window.getCookie('session')
	// config.data = JSON.stringify(config.data)
	window.yb_print('================= url ==================')
	window.yb_print(config.url)
	window.yb_print('================= 参数 ==================')
	window.yb_print(config.method === 'get' ? config.params : config.data)
	return config
})

// 拦截器
axiosInstance.interceptors.response.use((res) => {
	window.yb_print('================= responce ==================')
	window.yb_print(res.data)
	return res
})

const YBAjaxConfig = {
	success: (res, resolve, reject) => {
		// 成功回调
		if (res.data.code === 200) {
			resolve(res.data.data)
		} else {
			reject(res)
		}
	},
	error: (err, reject) => {
		// 状态不是200
		reject(err)
	}
}

// 自定义封装git
let GET = function (url, params = {}) {
	return new Promise((resolve, reject) => {
		axiosInstance.get(url, {
			// 请求参数
			params: params
		}).then(res => {
			YBAjaxConfig.success(res, resolve, reject)
		}).catch(err => {
			YBAjaxConfig.error(err, reject)
		})
	})
}

// 自定义封装POST
let POST = function (url, params = {}) {
	return new Promise((resolve, reject) => {
		axiosInstance.post(url, params).then(res => {
			YBAjaxConfig.success(res, resolve, reject)
		}).catch((err) => {
			YBAjaxConfig.error(err, reject)
		})
	})
}

export default {
	GET,
	POST
}
