<template>
  <div class="wrap">
      <div class="space-between toekn-select" @click="tokenSelect">
        <div class="flex-left">
          <img class="flex-left token-icon" :src="coin.icon" alt="">
        </div>
        <div class="flex-right">
          <span class="token-name">{{coin.symbol}}</span>
          <img class="icon-left" src="@/img/packet/tk_community_icon.png" alt="">
        </div>
      </div>
      <div class="space-between count-form">
        <div class="flex-left">
          <span class="left-text">红包个数</span>
        </div>
        <div class="flex-right">
          <input class="count-input" @focus="noteShow=false" @blur="noteShow=true" type="number" v-model.number="sendObj.redPackageCount" :placeholder="sendObj.maxCount?'最多'+sendObj.maxCount+'个':'请输入红包个数'">
        </div>
      </div>
      <div class="space-between count-form">
        <div class="flex-left">
          <span class="left-text">发放Token总数<span v-show="coin.symbol">({{coin.symbol}})</span></span>
        </div>
        <div class="flex-right">
          <input class="count-input" @focus="noteShow=false" @blur="noteShow=true" type="number" v-model.number="sendObj.totalQuantity" :placeholder="sendObj.maxQuantity?'最多'+sendObj.maxQuantity:'请输入Token个数'">
        </div>
      </div>
      <div class="charge-wrap">
        <p v-if="coin.symbol">账户可用  <span class="balance">{{coin.balance}}</span><span class="symbol">{{coin.symbol}}</span>，<span class="symbol">{{coin.symbol}}</span>不足时请先<span class="charge" @click="charge">充值</span></p>
      </div>
      <div class="space-between new-switch">
        <div class="flex-left">
          <span class="left-text">仅限新注册用户领取</span>
        </div>
        <div class="flex-right">
          <tw-switch v-model='sendObj.newUserRewardOnly'></tw-switch>
        </div>
      </div>
      <tw-button class="send" :type="btnDisabled" text="发红包" @click="sendSms"></tw-button>
      <router-link class="redlist" to="list"><img src="@/img/packet/list.png" alt=""></router-link>
      <p class="note" v-show="noteShow"><span v-if="coin.symbol">账户余额{{sendObj.minBalance === 0?'>':'≥'}}{{sendObj.minBalance}}{{coin.symbol}}才能发放红包</span><br>未领取的Token，将于24小时内退回您的资产</p>
      <tw-confirm class="mask-confirm" :maskShow.sync="maskShow" @cancel="code =''" @sure="suresend">
        <p class="title">输入验证码</p>
        <p class="desc">验证码已发送至手机，为保证您的帐户安全，请先验证身份</p>
        <input type="text" v-model="sendObj.smsCode" ref="validate" maxlength="4" class="validate" placeholder="请输入您收到的验证码">
      </tw-confirm>
  </div>
</template>

<script>
import api from '../api'
import fetch from '@/util/fetch';
import SendModel from '../models/SendModel.js'
import twButton from '@/components/commen/tw-button.vue'
import twSwitch from '@/components/commen/tw-switch.vue'
import twConfirm from '@/components/commen/tw-confirm.vue'

export default {
    data() {
      return {
        btnDisabled: 'default',
        maskShow: false,
        noteShow: true,
        symbol: '',
        isApp: false,
        isWeixin: false,
        sendObj: new SendModel()
      }
    },
    components: {
      twButton,
      twSwitch,
      twConfirm
    },
    computed: {
      coin () {
        let coin = this.$store.state.coin
        this.sendObj.setDataWithArgsJson(['contractAddress','balance','symbol'], coin)
        this.symbol = coin.symbol
        return coin
      }
    },
    watch: {
      symbol (newVal, oldVal) {
        if(newVal) {
          fetch.get(api.getRule, {params: {contractAddress: this.sendObj.contractAddress}}).then(res => {
            this.sendObj.setDataWithArgsJson(['maxCount','maxQuantity','minBalance'], res.data)
          })
        }
      },
      'sendObj.redPackageCount': {
        handler(newName, oldName) {
          if (this.sendObj.redPackageCount > this.sendObj.maxCount) {
            this.sendObj.redPackageCount = this.sendObj.maxCount
          }
        }
      },
      'sendObj.totalQuantity': {
        handler(newName, oldName) {
          if (this.sendObj.totalQuantity > this.sendObj.maxQuantity && this.sendObj.maxQuantity < this.sendObj.balance) {
            this.sendObj.totalQuantity = this.sendObj.maxQuantity
          }
          if (this.sendObj.totalQuantity > this.sendObj.balance && this.sendObj.maxQuantity > this.sendObj.balance) {
            this.sendObj.totalQuantity = this.sendObj.balance
          }
        }
      }
    },
    methods: {
      tokenSelect () {
        this.$router.push('token-select')
      },
      sendSms () {
        // 同时调发短信接口
        this.btnDisabled = 'disabled'
        this.sendObj.sendSms().then(res => {
          this.maskShow = true
        }).catch(err => {
          console.log(err.message)
        }).finally(() => {
          this.btnDisabled = 'default'
        })
      },
      // 确认发送红包
      sendPacket() {
        return fetch.post(api.sned, this.sendObj).then(res => {
          if(res.code === 200){
            this.$router.push({path: 'share', query: {shareImgUrl: res.data}})
          }else {
            this.$toast(res.msg)
          }
        })
      },
      suresend () {
        //验证短信码1，4位数字
        if (!/\d{4}/.test(this.sendObj.smsCode)) {
          this.$toast('请输入正确的验证码格式')
          return
        }
        this.sendPacket()
      },
      charge () {
        if (this.isApp) {
          window.location.href = 'aiyuangong://bitcoin/wallet/platformAccount'
        } else {
          window.location.href = '/help/appdown/index.html?pathurl=wallet/platformAccount'
        }
      }
    },
    created () {
      const UA = navigator.userAgent
      this.isApp = UA.indexOf('aygBitcoin') > 0
      this.isWeixin = (/MicroMessenger/ig).test(UA)
    }
  }
</script>

<style lang="scss" scoped>
$text-color: #283B5B;
$left-color: #FF9200;
$right-color: #FF6A00;
.wrap{
  height: 100%;
  padding-top: 20px;
  background: #F2F2F2;
  box-sizing: border-box;
}
.space-between{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  background: #fff;
  &.toekn-select{
    height: 124px;
    margin-bottom: 20px;
    .token-icon{
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .name{
      font-size: 36px;
      color: $text-color;
      margin-right: 46px;
    }
    .icon-left{
      width: 32px;
    }
  }
  &.count-form{
    height: 94px;
    &:nth-of-type(2){
      border-bottom: 1px solid #eee;
    }
    .count-input{
      width: 250px;
      border: 0;
      text-align: right;
      color: $text-color;
      font-size: 36px;
      &::-webkit-input-placeholder{
        color: #999;
        font-size: 32px;
        font-weight: normal;
      }
    }
  }
  &.new-switch{
    height: 94px;
    margin-bottom: 50px;
  }
  .left-text{
    font-size: 32px;
    color: $text-color;
  }
  
}
.charge-wrap{
  height: 70px;
  line-height: 70px;
  padding: 0 30px;
  font-size: 24px;
  color: #999999;
  .balance{
    color: $right-color;
  }
  .charge{
    color: rgb(22, 98, 227);
  }
}
.send{
  display: block;
  width: 690px;
  height: 94px;
  font-size: 32px;
  margin: 0 auto;
  border-radius: 12px;
  background-image: linear-gradient(to right, $left-color, $right-color)
}
.note{
  position: fixed;
  width: 100%;
  text-align: center;
  font-size: 24px;
  color: #999999;
  bottom: 40px;
}
.mask-confirm {
  .title{
    font-size: 34px;
    line-height: 48px;
    margin-bottom: 32px;
  }
  .desc{
    font-size: 28px;
    line-height: 42px;
    margin-bottom: 32px;
  }
  .validate{
    width: 100%;
    height: 94px;
    line-height: 94px;
    font-size: 50px;
    font-weight: bold;
    color: $text-color;
    border: 0;
    background: #f2f2f2;
    text-align: center;
    &::-webkit-input-placeholder{
      color: #999;
      font-size: 32px;
      font-weight: normal;
    }
  }
}
.shake-enter-active {
  animation: shake .5s;
}
.shake-leave-active {
  animation: shake .5s reverse;
}
.redlist{
  position: absolute;
  margin-top: 140px;
  right: 20px;
  animation: shake 5s linear infinite backwards;
  img {
    width: 100px;
  }
}
@keyframes shake{
  5% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -10deg);
  }
  6%, 8%, 10%, 12% {
    transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, 10deg);
  }

  7%, 9%, 11% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -10deg);
  }
  13% {
    transform: scale3d(1, 1, 1);
  }
}
</style>
