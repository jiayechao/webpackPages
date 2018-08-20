import {topage,toast} from './tool.js'
// ajax组件  by N-feng
function post(url, param, callback,pagename="login") {
    ajaxAction('POST', url, param, callback,pagename);
}

function get(url, param, callback, pagename="login") {
    ajaxAction('GET', url, param, callback, pagename)
}

function ajax(type = 'GET', url, param = {},callback) {

    type = type.toUpperCase()

    let userToken = localStorage.getItem('sid') || '';

    let options = {
        method: type,
        url: url,
        type: 'json',
        timeout: 30000,
        error: function(err){
            toast('网络错误，请刷新页面');
        },
        headers: {
            'sid': userToken
        }
    }

    if(type === 'GET') {
        let _url = url
        let dataStr = ''
        Object.keys(param).forEach(key => {
            dataStr += key + '=' + param[key] + '&'
        })
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
        
        let timeStamp = parseInt(Math.random() * 100000)
        
        if(dataStr) _url += `?${dataStr}&t=${timeStamp}`
        else _url += `?t=${timeStamp}`

        options.url = _url;
    } else if(type === 'POST') {
        options.data = JSON.stringify(param)
        options.headers['Content-Type'] = 'application/json'
    }

    $.ajax(options).then(function (response) {
        callback(response)
    })

}

function ajaxAction(type, url, param, callback,pagename) {
    ajax(type, url, param, res => {
        let _data = res
        if(_data.code === 200) {
            callback(_data)
        }else if(_data.code === 500 && /401/.test(_data.msg)){// sid失效
            toast('sid失效，请重新登录');
            localStorage.removeItem('sid');
            if(pagename === false){
                callback(_data);
                return;
            }
            topage(pagename)
        }
         else {
            toast(_data.msg);
            callback(_data)
        }
    })
};


export {post,get}