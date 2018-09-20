<template>
  <div class="wrap">
    <template v-if="redList.length">
      <router-link class="red-item" v-for="(item,index) in redList" :to="{path: 'share', query: {shareImgUrl: item.redPackageImgUrl}}" :key="index">
        <div class="space-between time">
            <p class="time">{{item.sendTime}}</p>
            <tw-button class="share" text="再次分享" />
        </div>
        <div class="space-between">
            <p>红包总Token</p>
            <p>{{item.totalToken}}</p>
        </div>
        <div class="space-between">
            <p>剩余Token</p>
            <p>{{item.remainToken}}</p>
        </div>
        <div class="space-between">
            <p>剩余发放人数</p>
            <p>{{item.remainCount}}</p>
        </div>
      </router-link>
      <p class="note">未过期未领完的红包，可重复分享</p>
    </template>
    <div class="nolist" v-else>
      <img src="@/img/packet/nolist.png" alt="">
      <p>暂无红包</p>
    </div>
  </div>
</template>

<script>
import RedModel from '../models/RedModel.js'
import twButton from '@/components/commen/tw-button.vue'

export default {
  data() {
    return {
        redList: []
    }
  },
  components: {
    twButton
  },
  methods: {
    selected(val) {
      this.$store.commit('updateCoin',val)
      this.$router.push('setting')
    }
  },
  created () {
    RedModel.getRedList().then(res => {
      this.redList = res
    })
  }
}
</script>

<style lang="scss" scoped>
$left-color: #FF9200;
$right-color: #FF6A00;

.wrap{
  padding: 30px;
}
.nolist{
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 32px;
  transform: translate3d(-50%, -50%, 0);
  text-align: center;
  color: #999;
  img{
    width: 128px;
    margin-bottom: 60px;
  }
}
.red-item{
  display: block;
  font-size: 24px;
  color: #474747;
  padding: 18px 30px;
  margin-bottom: 30px;
  border: 1px solid #EBEDF8;
  border-radius: 10px;
}
.space-between{
  display: flex; 
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
  .time{
    color: #999;
  }
  .share{
    width: 178px;
    height: 68px;
    font-size: 24px;
    border-radius: 68px;
    background-image: linear-gradient(to right, $left-color, $right-color)
  }
  p:nth-child(2){
    color: $right-color
  }
}
.note{
  font-size: 24px;
  color: #999999;
  bottom: 40px;
  text-align: center;
}
</style>