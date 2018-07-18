import '../css/delc.scss';
import {toast,post,topage} from './delccommon.js';
post('/japi/delc/candy/rewardIndex',{},res => {
  // toast(res)
  console.log(res)
  //填充数据
  let data = res.data;
  /*
    balance (number, optional): DELC余额 ,
    inviteCount (integer, optional): 邀请人数 ,
    inviteUrl (string, optional): 邀请链接 ,
    isActive (integer, optional): 是否开启，0为未开启，1为开启
  */
  $('.coinBalance').text(data.balance)
  $('#invitation').val(data.inviteUrl);

  if(data.isActive){
    $('.isactive').show();
    $('.inviteCount').text(data.inviteCount);
  } else {
    $('.peopleCount').html('即将开放');
  }
})


// 跳转领取页
$('.airdrop').click(function(){
  topage('delcget')
});
// $('.mask-close').click(function(){
//   $('#mask').hide();
// })

//复制
var clipboard = new ClipboardJS('.copy');

clipboard.on('success', function(e) {
    e.clearSelection();
    toast('复制成功！')
});


//跳转详情页
$('.btn-detail').click(function(){
  topage('delcdetail')
})
//跳转下载页
$('.btn-download').click(function(){
  topage('delcdownload')
})