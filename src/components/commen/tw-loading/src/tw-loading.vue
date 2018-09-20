<template>
  <div v-if="loading" class="tw-loading" :style="styleObj">
    <div class="animate">
      <span class="animate-in-inner"></span>
      <span class="animate-inner"></span>
      <span class="animate-outer"></span>
    </div>
    <p class="text">{{text}}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: '',
      text: '',
      styleObj: {}
    }
  }
}
</script>

<style lang="scss" scoped>
.tw-loading{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  padding: 20px;
  border-radius: 10px;
  max-width: 160px;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  .animate{
    position: relative;
    width: 100px;
    height: 100px;
    margin: 0 auto 20px;
  }
  .animate-outer{
    position: absolute;
    top: 50%;
    left: calc(50% - 20px);
    width: 40px;
    height: 80px;
    border: 1px solid #fff;
    border-radius: 100% 0 0 100%/50%;
    border-right: none;
    transform-origin: right center;
    animation: rotate720deg 1s infinite linear;
  }
  .animate-inner{
    position: absolute;
    top: 50%;
    left: calc(50% + 15px);
    width: 30px;
    height: 60px;
    border: 1px solid #fff;
    border-radius: 0 60px 60px 0;
    border-left: none;
    transform-origin: left center;
    animation: rotate720deg  1s infinite linear reverse;
  }
  .animate-in-inner{
    position: absolute;
    top: 50%;
    left: calc(50% + 10px);
    width: 20px;
    height: 40px;
    border: 1px solid #fff;
    border-radius: 0 40px 40px 0;
    border-left: none;
    transform-origin: left center;
    animation: rotate720deg  1s infinite linear;
  }
  .text{
    color: #fff;
    font-size: 30px;
  }
}
@keyframes rotate720deg {
  from {
    transform: translate3d(-50%, -50%, 0) rotate(0deg)
  }
  to {
    transform: translate3d(-50%, -50%, 0) rotate(360deg)
  }
}
</style>
