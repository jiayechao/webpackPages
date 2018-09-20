<template>
  <button :disabled="type==='disabled'" class="tw-button" @touchstart="touchHack" @click="clickEvent" :class="['btn-'+ type]"
    :style="{backgroundColor: bgColor,color: color}">
    <span>{{text}}</span>
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '按钮'
    },
    type: {
      type: String,
      default: 'default'
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
    },
    type: {
      type: String,
      default: '111'
    }
  },
  methods: {
    touchHack () {

    },
    clickEvent () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.tw-button{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  padding: 10px 20px;
  border: 0;
  border-radius: 26px;
  outline: 0;
  &:not(.btn-disabled):active{
    transform: scale(0.9)
  }
  span{
    line-height: 1;
  }
}
</style>
