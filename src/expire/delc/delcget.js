import '../css/delc.scss';
import {toast,post,topage} from './delccommon.js';


post('/japi/delc/candy/rewardIndex',{},res => {
  // toast(res)
  if(res.code === 200 && res.data.serviceQRCodeUrl){
    var img = new Image();
    img.className = 'qrcode';
    img.onload = function(){
      $('.method-text').after(img)
    }
    img.src = res.data.serviceQRCodeUrl
  }
  
})

// 领取糖果
$('.btn-img-yellow').click(function(){
  let code = $('.inviteCode').val();
  console.log(code)
  if(code){
    let param = {
      "code": $('.inviteCode').val()
    };
    post('/japi/delc/candy/airdrop', param, res => {
      if(res.code === 200){
        //填充数据
        toast('领取成功');
        topage('delcsugar');
      }
    })
  }else{
    toast('请填写领取码！')
  }
})