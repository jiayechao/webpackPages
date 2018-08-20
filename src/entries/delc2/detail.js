import '../../css/delc2/common.scss'
import '../../css/delc2/detail.scss'
import {compileTpl} from '../../util/tool';
import {post} from '../../util/ajax';
let accountId = localStorage.getItem('accountId');
let pageNum = 1;
let pageSize = 20;
let tpl = `
  <% for(let i=0; i < data.length; i++) {%>
    <div class="item">
      <div class="award-name">
        <span class="name"><%= data[i].type.substring(0,20) %></span>
        <span class="time"><%= data[i].successTime %></span>
      </div>
      <span class="award-count"><%= data[i].changeAmount %> DELC</span>
    </div>
  <% } %>
`;
function loadmore() {
    let param = {
        "accountId": accountId,
        "pageNum": pageNum,
        "pageSize": pageSize,
    }
    post('/japi/user/account/getAccountHistory', param, res => {
        if(res.code === 200){
          let data = res.data;
          let length = data.historyList.length;
          $('.detail_count').text(data.balance);
          if (length) {
              let html = compileTpl(tpl,data.historyList)
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