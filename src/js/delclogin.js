import '../css/delc.scss';
import {toast,post,topage} from './delccommon.js';
//如果存在sid，则跳转到糖果页面
if(localStorage.getItem('sid')){
    topage('delcsugar')
}

function login () {
    if(!$('[name="mobile"]').val()){
        toast('请输入手机号');
        return;
    }
    if(!$('[name="code"]').val()){
        toast('请输入验证码');
        return;
    }
    let url = '/api.php/user/loginWithoutCheckInfo';
    let param = {
        mobile: $('[name="mobile"]').val(),
        code: $('[name="code"]').val(),
        smsId: $('[name="smsId"]').val()
    };
    post(url, param, res => {
        // toast(res)
        console.log(res)

        if (res.code === 200) {
            localStorage.setItem('sid', res.data.sid);
            inviteReward();
        }
    })
};

//注册
$('.btn-login-submit').on('click', function() {
    login();
});

// 获取验证码
$('#getCode').on('click', function(event) {
    event.preventDefault();
    let $this = $(this);
    getCode($this);
})

let codeText = '获取验证码';
let sending = false;
let timer = null;
let TIME_COUNT = 60;
function getCode($this) {
    if (sending) {
        return;
    }

    let url = '/api.php/user/send_code';

    let param = {
        mobile: $('[name="mobile"]').val()
    };

    post(url, param, res => {
        // 开始倒计时
        if (res.code === 200 && !timer) {
            let count = TIME_COUNT;
            sending = true;
            $('[name="smsId"]').val(res.data.smsId);
            console.log(sending)
            timer = setInterval(() => {
                if (count > 0 && count <= TIME_COUNT) {
                    count--;
                    codeText = count + '秒';
                } else {
                    sending = false;
                    clearInterval(timer);
                    timer = null;
                    codeText = '获取验证码';
                }
                console.log($this)
                $this.text(codeText);
            }, 1000)
        }
        toast(res.msg);
    }, true);
};

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

function inviteReward () {
    let invitorId = getParam('invitorId', location.href);

    let url = '/japi/delc/candy/inviteReward';
    let param = {
        invitorId: invitorId,
    };

    post(url, param, res => {
        if(res.code === 200){
            topage('delcsugar')
        } else {
            toast(res.msg)
        }
    })
}

