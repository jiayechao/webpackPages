import '../../css/delc2/common.scss'
import '../../css/delc2/login.scss'
import {toast, topage, getParam} from '../../util/tool';
import {get,post} from '../../util/ajax';
let invitorId = getParam('invitorId', location.href);
localStorage.setItem('invitorId', invitorId);
//如果存在sid，则跳转到糖果页面
if(localStorage.getItem('sid')){
    topage('index')
}
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
                trace: 'delc2',
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
            return false;
        });
    })
});

function login (param, captchaObj) {
    let url = '/api.php/user/loginWithoutCheckInfo';
    post(url, param, res => {
        console.log(res)
        if (res.code === 200) {
            localStorage.setItem('sid', res.data.sid);
            topage('index')
        } else {
            captchaObj.reset();
        }
    })
};

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
