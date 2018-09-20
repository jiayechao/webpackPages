<template>
  <transition name="fade">
    <div v-if="isShow" class="tw-toast">{{text}}</div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      text: '',
      isShow: false
    }
  }
}
</script>

<style lang="scss" scoped>
.tw-toast{
  position: fixed;
  top: 50%;
  left: 50%;
  padding:20px;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  color: #000;
  font-size: 26px;
}
.fade-enter-active, .fade-leave-active {
  transition: all .3s ease;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
</style>
