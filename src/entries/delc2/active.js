import '../../css/delc2/common.scss'
import '../../css/delc2/acitve.scss'
import {toast,jumpApp} from '../../util/tool';
import {get} from '../../util/ajax';
get('/japi/activity/promote/getMyInvitation',{},res => {
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
    $('.invite_count').text(data.inviteNum);
    $('.invite_share_url').append(data.inviteUrl);
  }
})

$('.q-img' + Math.ceil(Math.random() * 3)).show();

function getParam (name, url) {
  if (typeof name !== 'string') return false;
  if (!url) url = window.location.href;
  // 当遇到name[xx]时，对方括号做一下转义为 name\[xxx\]，因为下面还需要使用name做正则
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  var results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

let index = getParam('id', location.ref);

$('#invite_' + index).show();


//复制
var clipboard1 = new ClipboardJS('.copy_invite', {
  text: function(trigger) {
    return $('.invite_share_url').text().trim()
  }
});

var clipboard2 = new ClipboardJS('.copy_phone', {
  text: function(trigger) {
    return 'https://t.me/DELINK_2018'
  }
});

clipboard1.on('success', function(e) {
    toast('复制成功！')
});
clipboard2.on('success', function(e) {
  toast('复制成功！')
});
//下载
$('.download').click(function(){
  location.href = "https://appdown.aiyuangong.com/index.html"
})