import '../css/delc.scss';
import {post} from './delccommon.js';

let pageNum = 1;
let pageSize = 20;
function getMore() {
    let param = {
        "pageNum": pageNum,
        "pageSize": pageSize,
    }
    post('/japi/delc/candy/rewardDetail', param, res => {
        let length = res.data.data.length;
        if (length) {
            let tpl = getTemplate(res.data.data);
            $('#detail-ul').append(tpl);
            pageNum++;
        } else {
            $('#getMore').text('没有更多了').data('lock', true);
        }
        $('.count').text(res.data.balance.toFixed(4));
    })
}

function getTemplate(data) {
    let tpl = '';
    for(let i in data) {
        tpl += getString(data[i]);
    }
    return tpl;
}

function getString(obj) {
    let _str = '<li class="detail-list">';
    let _left = '<div class="detail-left"><p class="detail-title">'+obj.rewardSource+'</p><p class="detail-time">'+obj.dateTime+'</p></div>';
    let _right = '<div class="detail-right"><p class="detail-text">'+obj.changeAmount+'</p></div>';
    _str += _left + _right + '</li>';
    return _str;
}

getMore();

$('#getMore').on('click', function() {
    let $this = $(this);
    let lock = $this.data('lock')

    if(!lock) {
        getMore();
    }
})