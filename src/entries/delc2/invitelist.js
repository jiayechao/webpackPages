import '../../css/delc2/common.scss'
import '../../css/delc2/invitelist.scss'
import {toast,getParam,dateFormat,compileTpl} from '../../util/tool';
import {post} from '../../util/ajax';
// get('/japi/activity/promote/getMyInvitation',{},res => {
//   console.log(res)
//   //填充数据
//   if(res.code === 200){
//     let data = res.data;
//     /*
//       balance (number, optional): DELC余额 ,
//       inviteCount (integer, optional): 邀请人数 ,
//       inviteUrl (string, optional): 邀请链接 ,
//       isActive (integer, optional): 是否开启，0为未开启，1为开启
//     */
//     $('.invite_count').text(data.inviteNum);
//     $('.invite_share_url').text(data.inviteUrl);
//   }
// })

let pageNum = 1;
let pageSize = 20;
let type = getParam('type', location.href);
$('.title_index'+ type).show();
let tpl = `
  <% for(let i=0; i < data.length; i++) {%>
  <div class="list-item">
      <p class="time"><%= getParam('type', location.href) == 1?dateFormat(new Date(data[i].inviteTime* 1000),'yyyy-MM-dd hh:mm'):data[i].inviter %></p>
      <p class="type">邀请</p>
      <p class="name"><%= data[i].invitee %></p>
      <p class="mobile"><%= data[i].mobile %></p>
  </div>
  <% } %>
`;
function loadmore() {
    let param = {
        "inviteType": type,
        "pageNo": pageNum,
        "pageSize": pageSize,
    }
    post('/japi/activity/promote/listMyInviteUsers', param, res => {
        if(res.code === 200){
            res.data.inviteRecordPage.inviteType = res.data.inviteType;
          let data = res.data;
          let length = data.inviteRecordPage.data.length;
          if (length) {
              let html = compileTpl(tpl,data.inviteRecordPage.data)
              $('.list-wrap').append(html);
              pageNum++;
          } else {
              $('.loadmore').text('没有更多了').data('lock',true);
          }
        }
    })
}
loadmore();
$('.loadmore').click(function(){
  if(!$(this).data('lock')){
    loadmore()
  }
})
