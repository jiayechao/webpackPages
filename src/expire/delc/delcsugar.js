import '../css/delc.scss';
import {toast,post,topage} from './delccommon.js';
post('/japi/delc/candy/rewardIndex',{},res => {
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
    $('.coinBalance').text(data.balance)
    $('.invitationUrl').val(data.inviteUrl);
    if(data.isActive){
      $('.isactive').show();
      $('.inviteCount').text(data.inviteCount);
    } else {
      $('.peopleCount').html('暂未开放');
      $('.airdrop').addClass('disabled').text('暂未开放');
    }
  }
})


// 跳转领取页
$('.airdrop').click(function(){
  if($(this).hasClass('disabled')){
    return;
  }
  topage('delcget')
});

//复制
var clipboard = new ClipboardJS('.copy', {
  text: function(trigger) {
    return $('.invitation').val() + $('.invitationUrl').val();
  }
});

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