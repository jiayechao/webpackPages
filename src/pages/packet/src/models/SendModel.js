import BaseModel from '@/js/model/BaseModel.js'
import api from '../api'
import { toast } from '@/util/tool';
import fetch from '@/util/fetch';

class SendModel extends BaseModel{
	constructor() {
		super()
		this.newUserRewardOnly = false,
		this.contractAddress = '',
		this.balance = '',
		this.symbol = '',
		this.minBalance= '',
		this.maxCount = '',
    this.maxQuantity = '',
		this.redPackageCount = '',
		this.smsCode = '',
		this.totalQuantity = ''
	}
	// 验证
	validate () {
		if(!this.contractAddress){
			toast('请先选择token');
			return false
		}
		if(this.maxCount === ''){
			toast('获取数据出错，请重新选择token');
			return false
		}
		if( this.balance < this.minBalance){
			toast('账户余额低于最小限制')
			return false
		}
		if( this.totalQuantity > this.balance){
			toast('账户Token不足，请充值或重新输入')
			return false
		}
		if(this.totalQuantity === '0' || this.totalQuantity === ''){
			toast('请先填写正确的token数量')
			return false
		}
		if(!(/^\d+(\.\d{1,4})?$/.test(this.totalQuantity) && !/^00/.test(this.totalQuantity))){
			toast('token数量最多支持4位小数');
			return false
		}
		if(!/^[1-9]\d{0,9}$/.test(this.redPackageCount)){
			toast('红包个数必须是有效的整数')
			return false
		}
		if(new BigNumber(this.totalQuantity).div(new BigNumber(this.redPackageCount)).lt(0.0001)){
			toast('红包每人最少须领0.0001')
			return false
		}
		if(this.totalQuantity > this.maxQuantity){
			toast('token数量超出最大限制')
			return false
		}
		if(this.redPackageCount > this.maxCount){
			toast('红包数量超出最大限制')
			return false
		}
		return true
	}
	// 发送短信
	sendSms() {
		// 验证
		let tag = this.validate()
		console.log(tag)
		return new Promise((resolve, reject) => {
			if(!tag) {
				return reject(new Error('验证出错'))
			}
			fetch.get(api.verify, {params: {type: 1}}).then(res => {
				if(res.code === 200){
					return resolve(res)
				}else {
					toast(res.msg)
					return reject(new Error('发送短信失败'))
				}
			})
		})
	}
}

export default SendModel