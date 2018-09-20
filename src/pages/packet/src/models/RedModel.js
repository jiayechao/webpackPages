import BaseModel from '@/js/model/BaseModel.js'
import api from '../api'
import { toast } from '@/util/tool';
import fetch from '@/util/fetch';

class RedModel extends BaseModel{
	constructor() {
		super()
    this.redPackageCount = ''
    this.redPackageImgUrl = ''
    this.remainCount = ''
    this.remainToken = ''
    this.sendTime = ''
    this.totalToken = ''
  }
	static getRedList() {
    return new Promise((resolve, reject) => {
      fetch.post(api.list).then(res => {
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

export default RedModel