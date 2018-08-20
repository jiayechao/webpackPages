<template>
  <div class="w-content post-detil">
    <!-- <nav-bar title="帖子详情"></nav-bar> -->
    <div class="content">
      <user-cell-header :name="postModel.userName"
                        :icon="postModel.userAvatar"
                        :time="postModel.createTimeStr">
        <!-- <span class="header-other">...</span> -->
      </user-cell-header>
      <p class="text">{{postModel.content}}</p>
      <scratchable-latex-images :images="postModel.images"></scratchable-latex-images>
      <div class="bottom">
        <span class="btn zhan flex-center">赞({{postModel.good}})</span>
        <!--<span class="btn share flex-center">分享({{postModel.shares}})</span>-->
      </div>
    </div>
    <comments :posts="postModel.posts"
              :dataArr="postModel.commentList"></comments>
    <jomp-app></jomp-app>
  </div>
</template>

<script>
  import NavBar from './NavBar.vue'
  import UserCellHeader from './UserCellHeader.vue'
  import ScratchableLatexImages from './ScratchableLatexImages.vue'
  import Comments from './Comments.vue'
  import {urlParameter} from '../../util/tool.js'
  import PostModel from '../../js/model/PostModel.js'
  import JompApp from './JompApp.vue'
	export default {
		name: "postDetil",
    components: {
	    NavBar,
	    UserCellHeader,
	    ScratchableLatexImages,
	    Comments,
	    JompApp
    },
    data() {
			return {
				postModel: new PostModel()
      }
    },
		provide: function () {
			return {
				bgImage: this.bgImage
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
	      this.postModel.getPostDetil(parameter.id)
      }
    }
	}
</script>

<style lang="scss" scoped>

  .post-detil {
    .content {
      padding-top: 50px;
      border-bottom: 20px solid #f2f2f2;
      .header-other {
        position: absolute;
        right: 0px;
        padding: 0 32px;
        top: 0px;
        color: #999999;
        font-size: 48px;
      }
      .text {
        padding: 30px;
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #474747;
        letter-spacing: 0;
        text-align: justify;
        line-height: 48px;
      }
      .bottom {
        padding: 30px 0 48px 0;
        display: flex;
        justify-content: center;
        .btn {
          padding: 0 30px;
          height: 64px;
          border: 1px solid #999999;
          border-radius: 200px;
          font-family: PingFangSC-Regular;
          font-size: 28px;
          color: #999999;
        }
        .share {
          margin-left: 30px;
          border: 1px solid #EF6523;
          color: #EF6523;
        }
      }

    }
  }

</style>