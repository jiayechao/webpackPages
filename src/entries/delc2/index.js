import '../../css/delc2/common.scss'
import '../../css/delc2/index.scss'
import {get} from '../../util/ajax';
import {topage} from '../../util/tool';
let hasSubmit;
get('/japi/activity/promote/getTokenAmount',{},res => {
  console.log(res)
  //填充数据
  if(res.code === 200){
    let data = res.data;
    /*
      balance (number, optional): DELC余额 ,
      inviteCount (integer, optional): 邀请人数 ,
      inviteUrl (string, optional): 邀请链接 ,
      isActive (integer, optional): 是否开启，0为未开启，1为开启
    */
    $('.token_count').text(data.tokenAmount);
    localStorage.setItem('accountId', data.accountId);
  }
})

// 获取我的个人信息
get('/japi/activity/promote/getPersonalInfo', {}, res => {
  if(res.code === 200){
    let data = res.data;
    hasSubmit = data.hasSubmit;
  }
})

// 邀请好友
$('.active1').click(function(){
  // 是否已经完善资料
  if(hasSubmit === false){
    $('.prop').show();
  } else if(hasSubmit === true){
    topage('invite')
  }
});
// 加群
$('.active2').click(function(){
  topage('info')
});
// 关注
$('.active3').click(function(){
  topage('active','id', 3)
});
// 电报
$('.active4').click(function(){
  topage('active','id', 4)
});
// 签到
$('.active5').click(function(){
  topage('active','id', 5)
});
// 什么是
$('.active0').click(function(){
  topage('active','id', 0)
});

// 关闭弹窗
$('.prop .close').click(function(){
  $('.prop').hide();
})