<template>
  <div class="tw-switch" :class="checked?'switch-on':'switch-off'" :style="{ backgroundColor: checked?activeColor:inactiveColor }">
    <input id="tw-switch" type="checkbox" :checked="checked" @change="clickEvent($event)">
    <label for="tw-switch" class="switch-wrap"  >
      <div class="switch-btn"></div>
    </label>
  </div>  
</template>

<script>
export default {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    'active-color': {
      type: String,
      default: '#4CD964'
    },
    'inactive-color': {
      type: String,
      default: '#999'
    },
    checked: {
      type: Boolean
    }
  },
  methods: {
    clickEvent (e) {
      this.$emit('change',e.target.checked)
    }
  }
}
</script>

<style lang="scss" scoped>
input{
  display: none
}
.tw-switch{
  width: 100px;
  height: 60px;
  padding:0 5px;
  border-radius: 30px;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
  &.switch-off{
    .switch-btn{
      transform: translate3d(0,0,0)
    }
  }
  &.switch-on{
    .switch-btn{
      transform: translate3d(50px,0,0)
    }
  }
}
.switch-wrap{
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  .switch-btn{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #fff;
    transition: 0.2s;
  }
}
</style>
