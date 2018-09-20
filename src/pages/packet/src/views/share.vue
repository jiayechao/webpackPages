<template>
  <div class="wrap" ref="wrap">
    <!-- <img class="share-img" :src="$route.query.shareImgUrl" alt=""> -->
    <div class="foo" ref="foo"></div>
    <p v-if="!isApp" class="isNotApp">红包已经包好啦，长按保存图片分享给小伙伴吧！</p>
    <p v-if="isApp">红包已包好，分享给小伙伴们</p>
    <tw-button class="share" v-if="isApp" text="分享图片即可发红包" @click="share"></tw-button>
  </div>
</template>

<script>
import twButton from '@/components/commen/tw-button.vue'

export default {
  data() {
    return {
      isApp: ''
    }
  },
  methods: {
    share () {
      jsInvoker.shareImage(this.$route.query.shareImgUrl)
    }
  },
  components: {
    twButton
  },
  mounted () {
    this.$loading()
    const UA = navigator.userAgent
    this.isApp = UA.indexOf('aygBitcoin') > 0
    if (!this.$route.query.shareImgUrl) {
      this.$toast('没有这个红包')
      this.$loading(false)
      this.$router.push('setting')
    } else {
      let img = new Image()
      img.className = 'share-img'
      img.onload = () => {
        this.$refs.wrap.insertBefore(img, this.$refs.foo)
        this.$loading(false)
      }
      img.src = this.$route.query.shareImgUrl
    }
  }
}
</script>

<style>
.share-img{
  width: 472px;
  border: 4px solid #fff;
}
</style>

<style lang="scss" scoped>
  .wrap{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    background-image: url('../../../../img/packet/share.png');
    background-size: cover;
    // .share-img{
    //   width: 472px;
    //   border: 4px solid #fff;
    // }
    p{
      font-size: 34px;
      color: #FFFFFF;
      line-height: 48px;
      text-align: center;
      &.isNotApp{
        width: 480px;
      }
    }
    .share{
      width: 650px;
      height: 100px;
      font-size: 40px;
      background-image: linear-gradient(0deg, #FF9D00, #FFB300);
      border-radius: 50px;
    }
  }
</style>