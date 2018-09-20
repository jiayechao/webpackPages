import Vue from 'vue'
const store = {
  debug: true,
  state: {
    coin: {}
  },
  mutations: {
    updateCoin (state, obj) {
      if (this.debug) {
        console.log('修改数据', obj)
      } 
      state.coin = obj
    }
  }
}
Vue.prototype.$store = store
Vue.prototype.$store.commit = (fn, value) => {
  store.mutations[fn](store.state, value)
}
export default store