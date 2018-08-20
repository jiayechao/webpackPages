import '../../css/guide/index.scss';

const el = document.getElementsByClassName('nav')[0];
const panels = document.getElementsByClassName('panel-wrap');
const initTop = el.offsetTop
let scrollTop;
// 吸顶效果，ios下的fixed不能用，这里判断系统
const ua = navigator.userAgent;
const isIphone = ua.indexOf('iPhone') > -1;
// console.log(isIphone)
if (isIphone) {
  el.style.position = '-webkit-sticky';
  el.style.position = 'sticky';
} else {
  scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  if(scrollTop > initTop){
    el.style.position = 'fixed';
    el.style.paddingLeft = el.style.paddingRight ='4vw';
  }
}

document.onscroll = function(e){
  scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  // 遍历panel，自动跟踪
  for(let i in panels){
    // 当滚动条的滚动长度在元素的offsetTop 和 offsetTop及offsetHeight之和的中间时，就是元素active的时候
    if(scrollTop >= panels[i].offsetTop - 30 && scrollTop <= panels[i].offsetTop + panels[i].offsetHeight-70){
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
      if(scrollTop > initTop) {
        el.style.position = 'fixed';
        el.style.paddingLeft = el.style.paddingRight ='4vw';
      }else {
        el.style.position = 'relative';
        el.style.paddingLeft = el.style.paddingRight ='0';
      }
    }
}

// nav点击,不添加进路由
el.onclick = function(e){
  // console.log(e.target.tagName)
  if(e.target.tagName == "A") {
    e.preventDefault();
    // console.log(e.target.href.substring(e.target.href.indexOf('#')+1))
    let id = e.target.href.substring(e.target.href.indexOf('#')+1)
    document.getElementById(id).scrollIntoView()
  }
}