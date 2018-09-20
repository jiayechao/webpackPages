import Toast from './src/index';

const toast = {
  install(Vue) {
    Vue.prototype.$toast = Toast;
  }
}

export {toast, Toast}
