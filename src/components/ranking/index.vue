<template>
  <div class="ranking">
    <div class="my-data">
      <p class="title">- 我的数据 -</p>
      <a href="javascript:;" v-if="detail.accountId" class="toApp" @click="toApp">领取记录</a>
      <div class="data-wrap">
        <template v-if="detail.accountId">
          <img class="coin-icon" :src="detail.categoryIcon || ''" alt="">
          <p class="commu-name">{{ detail.categoryName | empty}}</p>
        </template>
        <p v-if="detail.accountId == ''" style="color: #999">尚未加入活动社区</p>
        <div class="data-detail">
          <div class="data-token">
            <p class="explain-text">我的Token</p>
            <p class="data-count">{{ detail.balance | empty}}<span>{{ detail.coinSymbol }}</span></p>
          </div>
          <div class="data-sign">
            <p class="explain-text">签到天数</p>
            <p class="data-count">{{ detail.signInCount | empty}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="commu-ranking">
      <p class="title white" style="padding-bottom:0;">- 活动排行 -</p>
      <div class="ranking-data">
        <div class="commu-data" :class="{first:index === 1}" v-if="item" v-for="(item,index) in detail.statsticsList" :key="index">
          <img class="coin-icon coin-icon-mini" :src="item.coinIcon || ''" alt="">
          <p class="commu-name">{{item.categoryName}}</p>
          <p class="explain-text">签到：{{item.totalSignInCount}}</p>
        </div>
      </div>
    </div>
    <div class="rule">
      <p class="title white">- 活动规则 -</p>
      <div class="rule-data">
        <p class="para"><span class="para-title">活动时间：<br></span>2018/8/6 下午2点-2018/8/20 下午2点</p>
        <p class="para"><span class="para-title">活动奖励：</span>10000份 ETH</p>
        <div class="para">
          <p class="para-title">规则：</p>
          <p class="para">1、用户加入活动社区，通过有效挖矿获得社区币，累计的社区币用于活动结束后瓜分ETH。</p>

          <p class="para">2、有效挖矿：用户首次加入活动社区，并在社区内邀请注册、签到、领红包。在其他社区做上述操作不参与ETH瓜分。</p>

          <p class="para">3、活动结束后，根据各个社群群内签到人次占比瓜分资金池。社区瓜分后的奖励，按社群各成员邀请人数、持币数量五个工作日内进行比例派发。</p>

          <p class="para">4、严禁虚假邀请骗取糖果行为，一旦发现取消所有糖果奖励，并列入黑名单。</p>

          <p class="para">5、活动期间，接受用户报名创建自己的活动社区，报名请联系“拓根世界官方社区”管理员“拓根牛牛”。</p>
          <p class="para">6、最终解释权归拓根世界所有。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {toast} from '../../util/tool';
import fetch from '../../util/fetch';
import axios from 'axios'
export default {
  data() {
    return {
      detail: {}
    }
  },
  methods: {
    toApp() {
      let data = {
        canWithDraw: this.detail.canWithDraw,
        icon: this.detail.categoryIcon,
        symbol: this.detail.coinSymbol,
        id: this.detail.accountId,
        contractAddress: this.detail.contractAddress,
      }
      let config = {
          js:'wallet/platformTxHistory.js',
          data:JSON.stringify(data)
       }
      jsInvoker.startNewPage(JSON.stringify(config))
    },
  },
  filters: {
    empty(val) {
      return val?val:'-'
    }
  },
  created() {
    let seft = this;
    let sid = JSON.parse(jsInvoker.getUserInfo()).sid;
    fetch.get('/japi/activity/tencoin/index',
      {
        headers: {sid: sid}
      }).then(res => {
        if(res.code === 200){
          let foo = res.data.statsticsList[0];
          res.data.statsticsList[0] = res.data.statsticsList[1];
          res.data.statsticsList[1] = foo;
          seft.detail = res.data
        }
      }).catch (err => {
        toast('出错了：'+err)
      })
  }
}
</script>

<style lang="scss" scoped>
  .ranking{
    min-height:100%; 
    padding: 50px;
    background-image: url('../../img/ranking/bg.png');
    background-size: cover;
    background-position: center;
    .title{
      padding: 20px 0;
      font-size: 32px;
      color: #33425D;
      text-align: center;
    }
    .toApp{
      position: absolute;
      top: 24px;
      right: 20px;
      font-size: 24px;
      color: #EF6523;
      line-height: 32px;
    }
    .my-data{
      position: relative;
      padding: 0 10px;
      background-color: #fff;
      border-radius: 12px;
      margin-bottom: 40px;
    }
    .data-wrap{
      padding: 20px 0;
      text-align: center;
      border-top: 1px solid #eee;
    }
    .coin-icon{
      width: 88px;
      height: 88px;
      border-radius: 50%;
      &.coin-icon-mini{
        width: 70px;
        height: 70px;
      }
    }
    .commu-name{
      font-size: 28px;
      color: #000000;
      margin-top: 20px;
    }
    .data-detail{
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 42px;
    }
    .data-sign,.data-token{
      width: 50%;
      text-align: center;
    }
    .data-token{
      border-right: 1px solid #e7e7e7;
    }
    .explain-text{
      font-size: 24px;
      color: #999999;
      line-height: 28px;
    }
    .data-count{
      font-size: 40px;
      color: #EF6523;
      line-height: 40px;
      margin-top: 10px;
      span{
        font-size: 22px;
        line-height: 22px;
        margin-left: 10px;
      }
    }
    .ranking-data{
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 0 36px 50px;
      font-size: 0;
      height: 311px;
      margin: 10px -20px 0;
      background-image: url('../../img/ranking/ranking.png');
      background-size: 100%;
      box-sizing: border-box;
      margin-bottom: 40px;
    }
    .commu-data{
      width: 33%;
      text-align: center;
      &.first{
        padding-bottom: 25px;
      }
    }
    .rule-data{
      padding: 20px 26px;
      margin-top: 10px;
      background: #fff;
      border-radius: 12px;
    }
    .para{
      color: #EF6523;
      font-size: 26px;
      line-height: 42px;
      margin-bottom: 42px;
      &:last-child{
        margin-top: 0;
      }
      .para-title{
        font-weight: bold;
      }
      
    }
  }
</style>
