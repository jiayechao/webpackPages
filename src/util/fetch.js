import axios from 'axios';
import {Toast} from '@/components/commen/tw-toast'

// 创建axios实例
const fetch = axios.create({
  timeout: 5000 // 请求超时时间
})

// request拦截器
fetch.interceptors.request.use(config => {
  if(!config.headers.sid){
    let sid = localStorage.getItem('sid') || '';
    config.headers['sid'] = sid // 让每个请求携带sid
  }
  return config
}, error => {
  console.log(error) // debug
  Promise.reject(error)
})

// respone拦截器
fetch.interceptors.response.use(
  response => {
    console.log(response)
    const res = response.data
    if (res.code !== 200) {
      Toast(res.msg)
      console.log(response.data)
      // 401判断;
      if (res.code === 401) {
        // sid失效跳到登陆页
        localStorage.removeItem('sid')
        location.reload()
      }
      // return Promise.reject('error')
      return response.data
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Toast(error.message);
    return Promise.reject(error)
  }
)

export default fetch
