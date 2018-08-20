<template>
  <div class="vote-detil">
    <!-- <nav-bar title="投票详情"></nav-bar> -->
    <div class="content">
      <user-cell-header :name="voteModel.userName"
                        :icon="voteModel.userAvatar"
                        :time="voteModel.createTimeStr">
        <span class="right-label" :class="{action: voteModel.voteStatus === 'processing'}">{{ voteModel.voteStatus === 'processing' ? '进行中' : '已结束' }}</span>
      </user-cell-header>
      <p class="title">
        {{voteModel.title}}
      </p>
      <p class="detil">
        {{voteModel.content}}
      </p>
      <vote-com :voteExtra="voteModel.voteExtra"></vote-com>
      <!--<div class="btns-bg text-center">-->
        <!--<button class="btn">分享({{voteModel.shares}})</button>-->
      <!--</div>-->
    </div>
    <comments :posts="voteModel.posts"
              :dataArr="voteModel.commentList"></comments>
    <jomp-app></jomp-app>
  </div>
</template>

<script>
	import NavBar from './NavBar.vue'
	import UserCellHeader from './UserCellHeader.vue'
  import Comments from './Comments.vue'
  import voteCom from './voteCom.vue'
	import {urlParameter} from '../../util/tool.js'
	import VoteModel from '../../js/model/VoteModel.js'
	import JompApp from './JompApp.vue'
	export default {
		name: "voteDetil",
    components: {
	    NavBar,
	    UserCellHeader,
	    Comments,
	    voteCom,
	    JompApp
    },
		provide: function () {
			return {
				bgImage: this.bgImage
			}
		},
    data() {
			return {
				voteModel: new VoteModel()
      }
    },
		methods: {
			bgImage (url) {
				const imageSrc = url || ''
				return {
					backgroundImage: 'url(' + imageSrc + ')'
				}
			}
		},
    mounted() {
	    const parameter = urlParameter(location.search)
	    if (parameter.id) {
		    this.voteModel.getVoteDetil(parameter.id)
	    }
    }
	}
</script>

<style lang="scss" scoped>
  .vote-detil {
    .content {
      padding: 50px 0 0px 0;
      border-bottom: 20px solid #f2f2f2;
      .right-label {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #FFFFFF;
        background: #999999;
        position: absolute;
        right: 0;
        top: 20px;
        padding: 2px 2px 2px 20px;
        border-radius: 20px 0 0 20px;
      }
      .action {
        color: #FFFFFF;
        background: #EF6523;
      }
      .title {
        font-family: PingFangSC-Medium;
        font-size: 32px;
        color: #000000;
        letter-spacing: 0;
        line-height: 50px;
        padding: 22px 30px 26px 30px;
      }
      .detil {
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #474747;
        letter-spacing: 0;
        text-align: justify;
        line-height: 48px;
        padding: 0 30px;
      }
      .btns-bg {
        .btn {
          font-family: PingFangSC-Regular;
          font-size: 28px;
          color: #EF6523;
          letter-spacing: -0.22px;
          border: 1px solid #EF6523;
          border-radius: 200px;
          background-color: #fff;
          padding: 12px 40px;
        }
      }
    }
  }
</style>