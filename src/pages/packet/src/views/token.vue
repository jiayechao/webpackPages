<template>
  <div class="wrap">
    <div class="coin-item" v-for="(coin,index) in coinList" @click="selected(coin)" :key="index">
      <div class="coin-item">
          <img class="coin-img" :src="coin.icon">
          <p class="coin-type">{{coin.symbol}}</p>
          <div class="coin-total">
              <p class="coin-total-text">{{coin.balance}}{{coin.symbol}}</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import TokenModel from '../models/TokenModel.js'
export default {
  data() {
    return {
        coinList: []
    }
  },
  methods: {
    selected(val) {
      this.$store.commit('updateCoin',val)
      this.$router.go(-1)
      // this.$router.replace('setting')
    }
  },
  created () {
    TokenModel.getCoinList().then(res => {
      this.coinList = res
    })
  }
}
</script>

<style lang="scss" scoped>
  .coin-item{
    display: flex;
    width: 690px;
    height: 120px;
    line-height: 120px;
    margin-left: 30px;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: #F6F6F6;
  }
  .coin-item-active{
    background-color: #f2f2f2;
  }
  .coin-img{
    width: 70px;
    height: 70px;
    margin-right: 10px;
    margin-top: 25px;
    border-radius: 100%;
    border-radius: 70px;
  }
  .coin-type{
    width: 180px;
    line-height: 120px;
    font-size: 32px;
    color: #283B5B;
    font-weight: bold;
  }
  .coin-total{
    flex: 1;
    font-size: 28px;
  }
  .coin-total-text{
    line-height: 120px;
    color: #EF6523;
    text-align: right;
  }
</style>