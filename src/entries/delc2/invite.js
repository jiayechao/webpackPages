import '../../css/delc2/common.scss'
import '../../css/delc2/invite.scss'
import {toast,jumpApp} from '../../util/tool';
import {get} from '../../util/ajax';
get('/japi/activity/promote/getMyInvitation',{},res => {
  console.log(res)
  //填充数据
  if(res.code === 200){
    let data = res.data;
    $('.count1').text(data.inviteLevel1Num);
    $('.count2').text(data.inviteLevel2Num);
    $('.invite_share_url:eq(1)').text(data.inviteUrl)
  }
})

//复制
var clipboard1 = new ClipboardJS('.copy_invite', {
  text: function(trigger) {
    return $('.invite_share_url:eq(0)').text() + $('.invite_share_url:eq(1)').text()
  }
});

clipboard1.on('success', function(e) {
    toast('复制成功！')
});