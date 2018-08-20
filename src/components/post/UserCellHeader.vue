<template>
  <div class="user-cell-teader">
    <i class="icon bg-image-cover" :style="bgImage(icon)"></i>
    <span class="title">{{name}}</span>
    <span class="time">{{time}}</span>
    <slot></slot>
  </div>
</template>

<script>
	export default {
		name: "UserCellHeader",
		inject: ['bgImage'],
    props: {
			icon: {
				type: String,
        default: ''
      },
	    name: {
		    type: String,
		    default: ''
	    },
	    time: {
		    type: String,
		    default: ''
	    }
    }
	}
</script>

<style lang="scss" scoped>
  .user-cell-teader {
    padding: 0 30px 0 118px;
    height: 68px;
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .icon {
      width: 68px;
      height: 68px;
      display: inline-block;
      border-radius: 50%;
      position: absolute;
      left: 30px;
      top: 0;
    }
    .title {
      font-family: PingFangSC-Medium;
      font-size: 32px;
      line-height: 32px;
      color: #000000;
    }
    .time {
      font-family: PingFangSC-Regular;
      font-size: 24px;
      line-height: 24px;
      color: #999999;
    }
  }
</style>