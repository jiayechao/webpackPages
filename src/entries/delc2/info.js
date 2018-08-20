import '../../css/delc2/common.scss'
import '../../css/delc2/info.scss'
import {toast, topage} from '../../util/tool';
import {get,post} from '../../util/ajax';

// function inviteReward () {
//   let invitorId = localStorage.getItem('invitorId');

//   let url = '/japi/activity/promote/inviteReward';
//   let param = {
//       invitorId: invitorId,
//   };

//   post(url, param, res => {
//       if(res.code === 200){
//           return;
//       } else {
//           toast(res.msg)
//       }
//   })
// }


// 根据参数判断是否已经完善
// 获取我的个人信息
get('/japi/activity/promote/getPersonalInfo', {}, res => {
  if(res.code === 200){
    let data = res.data;
    let hasSubmit = data.hasSubmit;
    $('.hasSubmit-'+hasSubmit).show();
    if(!hasSubmit) {
      $('.submit-info').css('display','block')
    } else {
      for(let i in data){
        console.log(i,data[i])
        $('.'+i).text(data[i])
      }
    }
  }
})

// 提交信息
$('.submit-info').click(function(){
  let data = {
    "age": $('[name="age"]').val(),
    "city": $('[name="city"]').val(),
    "company": $('[name="company"]').val(),
    "name": $('[name="name"]').val(),
    "position": $('[name="position"]').val(),
    "sex": $('[name="sex"]:checked').val(),
    "invitorId": localStorage.getItem('invitorId')
  }
  
  let tag = true;
  for(let i in data){
    if(!data[i] && i !== 'invitorId'){
      toast('请填写'+ $('[name="'+i+'"]').data('text'));
      tag = false;
      break;
    }
  }
  if( tag && !$('[type="checkbox"]').is(":checked")) {
    toast('请确认信息的真实有效');
    tag = false;
  }
  if(tag){
    post('/japi/activity/promote/submitPersonalInfo', data, res => {
      if(res.code === 200){
        $('.prop').show();
      }
    })
  }
  
})


//跳转页面
$('.prop .source-btn').click(function(){
  topage('index');
  // if(getParam('source', location.href) == 1){
  //   topage('invite')
  // } else {
  //   topage('index');
  // }
})
// 关闭弹窗
$('.prop .close').click(function(){
  $('.prop').hide();
  location.reload();
})
