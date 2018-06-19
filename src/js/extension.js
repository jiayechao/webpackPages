import '../css/extension.scss';
const el = document.getElementsByClassName('nav')[0];
const content = document.getElementsByClassName('content')[0];
const panels = document.getElementsByClassName('panel-wrap');
const initTop = el.offsetTop
const initHeight = el.offsetHeight;
// 吸顶效果，ios下的fixed不能用，这里判断系统
const ua = navigator.userAgent;
const isIphone = ua.indexOf('iPhone') > -1;
if (isIphone) {
  el.style.position = 'sticky'
}


let navTop = 0;
document.onscroll = function(e){
  // 遍历panel，自动跟踪
  for(let i in panels){
    // 当滚动条的滚动长度在元素的offsetTop 和 offsetTop及offsetHeight之和的中间时，就是元素active的时候
    // console.log(document.documentElement.scrollTop,panels[0].offsetTop)
    if(document.documentElement.scrollTop >= panels[i].offsetTop - 30 && document.documentElement.scrollTop <= panels[i].offsetTop + panels[i].offsetHeight-70){
      var id = panels[i].id;
      document.querySelector('a[href="#'+id+'"]').className = 'active';
    } else {
      var id = panels[i].id;
      id?document.querySelector('a[href="#'+id+'"]').className = '':null
    }
  }
  // 安卓的吸顶效果实现
  if (isIphone) {
    return;
  } else {
      if(document.documentElement.scrollTop > initTop) {
        el.style.position = 'fixed';
        el.style.paddingLeft = el.style.paddingRight ='4vw';
      }else {
        el.style.position = 'relative';
        el.style.paddingLeft = el.style.paddingRight ='0';
      }
    }
}