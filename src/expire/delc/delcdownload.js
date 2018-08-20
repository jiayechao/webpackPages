import '../css/delc.scss';
import {get,toast} from './delccommon.js';

let timer = null,
isWeixin = (/MicroMessenger/ig).test(navigator.userAgent),
t = 0,
iframe = document.createElement('iframe');

let url = {
  open: 'aiyuangong://bitcoin/',
  down: 'https://appdown.aiyuangong.com/index.html'
}

get('/japi/delc/interest/interestInfo', {}, res => {
  let data = res.data;
  $('.beginTime').text(data.beginTime);
  $('.rate').text(data.rate);
  $('.balence').text(data.accountBalance);
  $('.endTime').text(data.endTime);
  $('.count').text(data.previousInCome);
})

$('.download').click(function(){
  // 微信下不能调起APP，QQ可以
  if (isWeixin) {
    toast('请在浏览器打开该页面');
    return;
  }
  t = Date.now();
  window.location.href = url.open; //跳转App 
  timer = setTimeout(function() {
    // 这两个防止跳转的操作好像没什么用
    if (Date.now() - t > 1100) {
        clearTimeout(timer);
        return false;
    }
    if (document.webkitHidden || document.hidden) {
        return false;
    }
    window.location.href = url.down; //下载页面
  }, 1000);
})