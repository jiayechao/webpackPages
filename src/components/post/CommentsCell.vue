<template>
  <div class="comments-cell">
    <user-cell-header :name="comment.alias"
                      :icon="comment.avatar"
                      :time="comment.createTimeStr">
      <div class="zhan-bg flex-center">
        <img class="zhan" v-if="comment.goodable" src="../../img/post/zhan-no.png" alt="">
        <img class="zhan" v-else src="../../img/post/zhan-yes.png" alt="">
      </div>
    </user-cell-header>
    <p class="text">
      {{comment.content}}
    </p>
  </div>
</template>

<script>
  import UserCellHeader from './UserCellHeader.vue'
	export default {
		name: "CommentsCell",
    components: {
	    UserCellHeader
    },
    props: {
	    comment: {
	    	type: Object,
        default () {
	    		return {}
        }
      }
    }
	}
</script>

<style lang="scss" scoped>
  .comments-cell {
    padding: 30px 0;
    border-bottom: 1px solid #F2F2F2;
    .zhan-bg {
      height: 100%;
      padding: 0 40px;
      position: absolute;
      right: 0;
      top: 0;
      .zhan {
        width: 42px;
        height: 36px;
      }
    }
    .text {
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #474747;
      letter-spacing: 0;
      text-align: justify;
      line-height: 48px;
      padding: 30px 30px 0px 120px;
    }
  }
</style>