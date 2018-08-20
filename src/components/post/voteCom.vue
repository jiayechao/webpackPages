<template>
  <div class="vote-com">
    <div class="content">
      <vote-item v-for="(v, k) in voteExtra.voteItems"
                 :key="k"
                 :progress="v.percent"
                 :action="v.isSelected"
                 :title="v.label"
                 :num="v.selected"
                 :haveVoted="voteExtra.isSelected"></vote-item>
    </div>
    <p class="bottom-show">已有{{voteExtra.voteItemsTotal}}人参与</p>
    <!--<div class="bottom-btns text-center clearfix">-->
      <!--<div v-if="!voteExtra.isSelected" class="btn-bg">-->
        <!--<span class="btn">确认投票</span>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import voteItem from './voteItem.vue'
	export default {
		name: "voteCom",
    components: {
	    voteItem
    },
    props: {
	    voteExtra: {
	    	type: Object,
        default() {
	    		return {}
        }
      }
    }
	}
</script>

<style lang="scss" scoped>
  .vote-com {
    padding: 40px 30px;
    .content {

    }
    .bottom-show {
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #999999;
      padding-top: 20px;
      text-align: center;
    }
    .bottom-btns {
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;
      .btn-bg {
        padding: 20px;
        .btn {
          margin-top: 20px;
          background-image: linear-gradient(-134deg, #FF9200 0%, #FF6A00 100%);
          border-radius: 12px;
          font-family: PingFangSC-Regular;
          font-size: 28px;
          color: #FFFFFF;
          padding: 12px 44px;
        }
      }
    }
  }
</style>