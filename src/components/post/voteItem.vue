<template>
  <div class="vote-item">
    <span :style="{width: progress + '%'}" class="progress"></span>
    <span :class="{action: action}" class="title">
      <!--<i v-if="!haveVoted" class="round"></i>-->
      {{title}}({{num}}票)
    </span>
  </div>
</template>

<script>
	export default {
		name: "voteItem",
    props: {
	    progress: {
		    type: Number,
		    default: 20
	    },
	    action: {
		    type: Boolean,
		    default: true
	    },
	    title: {
		    type: String,
		    default: ""
	    },
	    haveVoted: {
		    type: Boolean,
		    default: false
	    },
	    num: {
		    type: String,
		    default: ''
	    }
    }
	}
</script>

<style lang="scss" scoped>
  .vote-item {
    height: 88px;
    background: #F7F7F7;
    margin-bottom: 4px;
    padding-left: 60px;
    position: relative;
    .title {
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #283B5B;
      position: absolute;
      left: 60px;
      top: 0;
      height: 100%;
      display: flex;
      align-items: center;
      .round {
        border: 1px solid #999999;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
    .progress {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background: #DEEBFF;
    }
    .action {
      color: #EF6523;
    }
  }
</style>