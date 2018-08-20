<template>
  <div class="comments">
    <div class="comments-content">
      <p class="title">评论({{posts}})</p>
      <comments-cell v-for="(v, k) in dataArr" :key="k" :comment="v"></comments-cell>
    </div>
    <!--<div class="bottom-bar">-->
      <!--<input class="input" disabled placeholder="畅所欲言"/>-->
      <!--<button class="commit">发布</button>-->
    <!--</div>-->
  </div>
</template>

<script>
  import CommentsCell from './CommentsCell.vue'
	export default {
		name: "Comments",
    components: {
	    CommentsCell
    },
    props: {
	    posts: {
	    	type: Number,
        default: 0
      },
      dataArr: {
	    	type: Array,
        default () {
	    		return []
        }
      }
    }
	}
</script>

<style lang="scss" scoped>
  .comments {
    padding-bottom: 124px;
    .comments-content {
      padding: 40px 0 0 0;
      .title {
        font-family: PingFangSC-Medium;
        font-size: 40px;
        color: #283B5B;
        padding: 0 30px 0 30px;
      }
    }
    .bottom-bar {
      position: fixed;
      width: 100%;
      height: 88px;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      background-color: #fff;
      align-items: center;
      .input {
        background: #F2F2F2;
        border-radius: 12px;
        border: none;
        width: 580px;
        height: 64px;
        padding-left: 22px;
        box-sizing: border-box;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #999999;
      }
      .commit {
        width: 100px;
        height: 64px;
        background-image: linear-gradient(-134deg, #FF9200 0%, #FF6A00 100%);
        border-radius: 12px;
        border: none;
        margin-left: 12px;
        color: #FFFFFF;
      }
    }
  }
</style>