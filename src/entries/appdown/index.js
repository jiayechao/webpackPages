
import '@/css/appdown/index.scss'
import { urlParameter } from '@/util/tool.js'
const url = {
  open: 'aiyuangong://bitcoin/',
  down: 'https://appdown.aiyuangong.com/index.html'
};
let UA = navigator.userAgent
let isWeixin = (/MicroMessenger/ig).test(UA)
if (!isWeixin) {
  window.location.href = url.open + urlParameter(location.href).pathurl
  setTimeout(() => {
    window.location.href = url.down;
  },1000)
}




