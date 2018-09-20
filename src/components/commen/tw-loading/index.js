import Loading from './src/index';
import './src/directive'

const loading = {
  install(Vue) {
    Vue.prototype.$loading = Loading;
  }
}

export {loading, Loading}
