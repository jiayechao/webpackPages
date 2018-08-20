import '../css/votelogin.scss';
import {toast,get,post} from './voteCommon.js';

function getMore() {
    let url = '/japi/activity/vote/getVotingDetail';
    let param = {
        voteId: '10001'
    };
    get(url, param, res => {
        if(res.code === 200){
            let tpl = getTemplate(res.data.voteItemList);
            $('.list-content').html(tpl);
            $('.startTime').html(res.data.startTime);
            $('.endTime').html(res.data.endTime);
        }
        if(res.code === 500 && /401/.test(res.msg)){
            showLogin();
            return;
        }
    })
}

getMore();

function getTemplate(data) {
    let tpl = '';
    for(let i in data) {
        tpl += getString(data[i], i);
    }
    return tpl;
}

function getString(obj, index) {
    let imgClass = {
        0: 'first',
        1: 'second',
        2: 'third',
    }
    let _str = '<div class="list">' +
                '<div class="list-votes"><span>'+obj.polls+'</span>票</div>' +
                '<div class="list-ranking '+(imgClass[index] || '')+'"></div>' +
                '<div class="list-title">'+obj.votedItemName+'</div>' +
                '<div class="list-user">' +
                    '<img class="list-img" src="'+obj.iconUrl+'" alt="">' +
                    '<span class="list-span">'+obj.author+'</span>' +
                '</div>' +
                '<div class="list-btn">' +
                    '<a href="javascript:;" class="btn-list" data-voteItemId="'+obj.voteItemId+'">投票</a>' +
                '</div>' +
            '</div>';
    return _str;
}

$('.btn-to-tips').on('click.vote', function() {
    showRule();
});

// 登录规则弹窗关闭触发
$('#part-login-close, #part-rule-close').on('click.vote', function () {
    showList();
});

// 显示二维码弹窗关闭触发
$('#part-qrcode-close').on('click.vote', function() {
    showList();
    getMore();
});

function showRule () {
    $('#part-list').addClass('hide');
    $('#part-rule').removeClass('hide');
}

function showList () {
    $('#part-list').removeClass('hide');
    $('#part-rule').addClass('hide');
    $('#part-qrcode').addClass('hide');
    $('#part-login').addClass('hide');
}

function showLogin () {
    $('#part-login').removeClass('hide');
    $('#part-list').addClass('hide');
}

function showQrcode () {
    $('#part-login').addClass('hide');
    $('#part-list').addClass('hide');
    $('#part-rule').addClass('hide');
    $('#part-qrcode').removeClass('hide');
}

let voteItemId = '';
$('body').on('click.vote', '.btn-list', function() {
    voteItemId = $(this).attr('data-voteItemId');
    //如果不存在sid
    if(!localStorage.getItem('sid')){
        showLogin();
        return;
    }

    vote();
});

function vote () {
    let url = '/japi/activity/vote/poll';
    let param = { 
        voteId: '10001',
        voteItemId: voteItemId 
    };
    post(url, param, res => {
        if(res.code === 500 && /401/.test(res.msg)){
            showLogin();
            return;
        }
        toast(res.data.remarks);
        showQrcode();

        // 物理+1操作
        // if(res.data.status) {
        //     let $span = $('[data-voteitemid="'+voteItemId+'"]').parent().siblings('.list-votes').find('span');
        //     let text = $span.text();
        //     $span.text(parseInt(text)+1);
        // }
    })
}

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
    let mobile = $('[name="mobile"]').val();

    if (!mobile) {
        toast('请先输入手机号码');
        return;
    }

    if (sending) {
        return;
    }

    let url = '/api.php/user/send_code';

    let param = {
        mobile: mobile
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
                $this.text(codeText);
            }, 1000)
        }
        toast(res.msg);
    }, true);
};

// 极验
get("/api.php/user/geeTest", {}, res => {
    initGeetest({
        product: 'bind',
        // 以下配置参数来自服务端 SDK
        gt: res.data.gt,
        challenge: res.data.challenge,
        offline: !res.data.success,
        new_captcha: res.data.new_captcha,
        https: true
    }, function (captchaObj) {
        captchaObj.onReady(function(){
            // 这里可以考虑loading
        }).onSuccess(function(){
            let result = captchaObj.getValidate();
            let param  = {
                mobile: $('[name="mobile"]').val(),
                code: $('[name="code"]').val(),
                smsId: $('[name="smsId"]').val(),
                geetest_challenge: result.geetest_challenge,
                geetest_validate: result.geetest_validate,
                geetest_seccode: result.geetest_seccode
            };
            login(param, captchaObj)
        }).onError(function(){
            toast('验证失败，请重新登录');
        })
        $('.btn-login-submit').on('click', function() {
            if(!$('[name="mobile"]').val()){
                toast('请输入手机号');
                return;
            }
            if(!$('[name="code"]').val()){
                toast('请输入验证码');
                return;
            }
            captchaObj.verify();
        });
    })
});

function login (param, captchaObj) {
    let url = '/api.php/user/loginWithoutCheckInfo';
    post(url, param, res => {
        if (res.code === 200) {
            localStorage.setItem('sid', res.data.sid);
            vote();
        } else {
            captchaObj.reset();
        }
    })
};
