<template>
  <transition name="maskAnimate">
  <div class="tw-confirm" v-show="maskVisible" @click.self="maskClick">
    <div class="confirm-wrap">
      <div class="confirm-content">
        <slot>
          
        </slot>
      </div>
      <div class="confirm-btn">
        <span class="cancel" @click="maskCancel">取消</span>
        <span class="sure" @click="maskSure">确定</span>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  props: {
    maskShow: {
      type: Boolean,
      default: false
    },
    maskTap: {
      type: Boolean,
      default: false
    },
    bgColor: {
      type: String,
      default: '#999'
    },
    color: {
      type: String,
      default: '#fff'
    },
    borderRidus: {
      type: String,
      default: '#fff'
    }
  },
  data () {
    return {
      code: '',
      tag: false
    }
  },
  computed: {
    maskVisible () {
      return this.maskShow
    }
  },
  methods: {
    maskClick () {
      if (this.maskTap) {
        this.$emit('update:maskShow',false)
      }
    },
    maskCancel () {
      this.$emit('update:maskShow',false)
      this.$emit('cancel')
    },
    maskSure () {
      if(!this.tag) {
        this.$emit('sure')
        this.tag = true
      }
      setTimeout(() => {
        this.tag = false
      }, 5000)
    }
  }
}
</script>

<style lang="scss" scoped>
$text-color: #283B5B;
$left-color1: #FF9200;
$right-color1: #FF6A00;
$left-color2: #33486F;
$right-color2: #223551;
.tw-confirm{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  -webkit-tap-highlight-color: transparent;
  .confirm-wrap{
    width: 600px;
    margin: 20% auto 0;
    background: #fff;
    border-radius: 24px;
    overflow: hidden;
  }
  .confirm-content{
    padding: 30px 40px;
    text-align: center;
    color: $text-color;
  }
  .confirm-btn{
    overflow: hidden;
    span{
      float: left;
      width: 50%;
      height: 100px;
      line-height: 100px;
      text-align: center;
      font-size: 34px;
      color: #FFFFFF;
      &.sure{
        background-image: linear-gradient(to right, $left-color1, $right-color1)
      }
      &.cancel{
        background-image: linear-gradient(to right, $left-color2, $right-color2)
      }
    }
  }
}
.maskAnimate-enter-active, .maskAnimate-leave-active {
  transition: 0.3s;
  .confirm-wrap{
    transition: 0.3s;
  }
}
.maskAnimate-enter, .maskAnimate-leave-to{
  background: rgba(0, 0, 0, 0);
  .confirm-wrap{
    transform: translateY(20px);
    opacity: 0;
  }
}
</style>
