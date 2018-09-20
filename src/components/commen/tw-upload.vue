<template>
  <div class="upload-wrap">
    <div @click="openFile">
      <slot></slot>
      <input name="file" :action="action" type="file" :multiple="multiple" ref="uploadFile" :acceptType = "acceptType" :accept="accept" @change="upload">
    </div>
  </div>
</template>

<script>
/*
  三个方法：
    success：上传成功后触发,返回一个对象，data为后端返回的数组，blob为base64数组，可减少一次请求
    lenExceed： 超过文件数量限制
    sizeExceed: 超出文件大小限制
  一个上传的的钩子
    before-upload： 函数，参数为上传的文件数组，需要返回一个boolean
  slot
    触发上传的元素
*/
import { fetch } from '@/util/fetch'

export default {
  props: {
    multiple: { // 是否允许多文件上传
      type: Boolean,
      default: false
    },
    action: { // 上传地址
      type: String,
      default: '/japi/image/upload'
    },
    limit: { // 上传文件数量限制
      type: Number,
      default: 1
    },
    size: { // 上传文件大小M
      type: Number,
      default: 10
    },
    acceptType: { // 上传类型
      type: String,
      default: 'image/jpg, image/x-ms-bmp, image/png, image/jpeg, image/bmp'
    },
    'before-upload': { // 上传前钩子检查
      type: Function
    }
  },
  data () {
    return {
      accept: 'image/*',
      files: '',
      listStr: [],
      proArr: []
    }
  },
  methods: {
    openFile () {
      this.$refs.uploadFile.click()
    },
    validate () {
      return new Promise((resolve, reject) => {
        /* 验证文件数 */
        let len = this.files.length
        if (len > this.limit) {
          this.$emit('lenExceed')
          reject(new Error('超过最大上传数量'))
        }
        /* 检查文件类型 */
        for (let file of this.files) {
          console.log(file.type)
          console.log(this.acceptType.indexOf(file.type))
          if (this.acceptType.indexOf(file.type) === -1) {
            this.$emit('typeError')
            return reject(new Error('图片上传格式只能是' + this.acceptType))
          }
        }
        /* 验证文件大小 */
        for (let file of this.files) {
          if (file.size / 1024 / 1024 > this.size) {
            this.$emit('sizeExceed')
            reject(new Error('文件大小超过限制'))
          }
        }
        /*  自定义检查 */
        if (this.beforeUpload && typeof this.beforeUpload === 'function') {
          if (!this.beforeUpload(this.files)) {
            reject(new Error('自定义检查出错'))
          }
        }
        resolve()
      })
    },
    toBase64 () {
      for (let file of this.files) {
        let reader = new FileReader()
        // 读取文件过程方法
        reader.onloadstart = (e) => {
          console.log('开始读取....')
          // this.startP()
        }
        reader.onprogress = function (e) {
          console.log('正在读取中....')
        }
        reader.onabort = function (e) {
          console.log('中断读取....')
        }
        this.proArr.push(new Promise((resolve, reject) => {
          reader.onerror = function (e) {
            console.log('读取异常....')
            reject(new Error('读取异常....'))
          }
          reader.onload = (e) => {
            console.log('成功读取....')
            this.listStr.push(e.target.result)
            resolve()
          }
        })
        )
        reader.readAsDataURL(file)
      }
    },
    upload () {
      this.files = this.$refs.uploadFile.files
      // 没有选择文件时没动作
      if (!this.files.length) {
        return
      }
      this.validate().then(res => {
        this.toBase64()
        Promise.all(this.proArr).then(res => {
          post({
            url: this.action,
            params: this.listStr
          }).then(res => {
            this.$emit('success', { data: res.data, blob: this.listStr })
          }).catch(err => {
            console.log(err)
            this.toast('上传出错了')
          }).finally(() => {
            // this.endP()
            // 完成上传后清空数组
            this.listStr = []
            this.proArr = []
          })
        })
      }).catch(err => {
        console.log(err)
        this.toast(err.message || '上传文件出错')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-wrap{
  input{
    display: none;
  }
}
</style>
