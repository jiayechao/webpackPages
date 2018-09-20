import BaseModel from '@/js/model/BaseModel.js'
import api from '../api'
import { toast } from '@/util/tool';
import fetch from '@/util/fetch';

class TokenModel extends BaseModel{
	constructor() {
		super()
		this.icon = ''
		this.symbol = ''
		this.balance = ''
		this.contractAddress = ''
	}
	static getCoinList() {
		return new Promise((resolve, reject) => {
			fetch.post(api.getMyAccounts).then(res => {
				if(res.code === 200){
					resolve(this.getModelsWithArr(res.data))
				}else {
					toast(res.msg || '获取数据出错')
				}
			}).catch(err => {
				console.log(err)
			})
		})
	}
}

export default TokenModel