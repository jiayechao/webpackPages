
function jumpApp(){
	let timer = null,
	isWeixin = (/MicroMessenger/ig).test(navigator.userAgent),
	t = 0,
	url = {
		open: 'aiyuangong://bitcoin/',
		down: 'https://appdown.aiyuangong.com/index.html'
	};
	// 微信下不能调起APP，QQ可以
	if (isWeixin) {
		toast('请在浏览器打开该页面');
		return;
	}
	t = Date.now();
	window.location.href = url.open; //跳转App
	timer = setTimeout(function() {
		// 这两个防止跳转的操作好像没什么用
		if (Date.now() - t > 1100) {
			clearTimeout(timer);
			return false;
		}
		if (document.webkitHidden || document.hidden) {
			return false;
		}
		window.location.href = url.down; //下载页面
	}, 1000);
}

// toast
function toast(msg) {
	let timer;
	let body = document.getElementsByTagName('body')[0];
	let toast = document.getElementsByClassName('toast')[0];
	clearInterval(timer);
	var el = document.createElement('div');
	el.className = 'toast';
	el.innerHTML = msg;
	if(toast){
		body.removeChild(toast)
	}
	body.appendChild(el);
	timer = setTimeout(function(){
		let toast = document.getElementsByClassName('toast')[0];
		if(toast){
			body.removeChild(document.getElementsByClassName('toast')[0])
		}
	},2000)
	
}

// 跳转页面,这个跳转页面支持最后一级pathname的跳转和添加一级search
function topage(name, key, val){
	let str = location.pathname.substring(location.pathname.indexOf('\/'),location.pathname.lastIndexOf('\/')) + '/' + name + '.html';
	let search = '';
	console.log(str)
	if(key){
		search = '?' + key + '=' + val;
	} 
	location.href = location.origin + str + search;
}

// url参数解析
function urlParameter (url) {
	const parameter = {}
	// 获取参数信息
	const urlArr = url.split('?')
	// 如果没有参数直接返回空
	if (urlArr.length < 2) {
		return parameter
	}
	// 处理掉 /# 前端路由
	let urlArr1 = urlArr[1].split('/#')
	urlArr1 = urlArr[1].split('#/')
	const parameterStr = urlArr1[0]
	// 通过 & 分割数据
	const parameterStrArr = parameterStr.split('&')
	parameterStrArr.forEach((v) => {
		const pArr = v.split('=')
		parameter[pArr[0]] = pArr[1]
	})
	return parameter
}

// 格式化时间
function timeDistanceForat(dateNum) {
	const secomd = Number(dateNum)
	if (!secomd) {
		return '0秒前'
	}
	//sTime=源时间，cTime=当前时间，dTime=时间差
	const sTime = secomd
	const cTime = (new Date().getTime()) / 1000
	const dTime = parseInt(cTime - sTime)
	// 秒
	if (dTime < 60) {
		return `${dTime}秒前`
	}
	const minutes = parseInt(dTime / 60)
	if (minutes < 60) {
		return `${minutes}分钟前`
	}
	const hours = parseInt(minutes / 60)
	if (hours < 24) {
		return `${hours}小时前`
	}
	const days = parseInt(hours / 24)
	if (days < 4) {
		return `${days}天前`
	}
	const date = new Date(parseInt(secomd * 1000))
	return dateFormat(date, 'yyyy-MM-dd hh:mm')
}

function dateFormat (date, format = 'yyyy-MM-dd hh:mm:ss') {
	const o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds(),
		'q+': Math.floor((date.getMonth() + 3) / 3),
		'S': date.getMilliseconds()
	}
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	for (var k in o) {
		if (new RegExp('(' + k + ')').test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
		}
	}
	return format
}

// 获取search，N-feng专用
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


function compile(tpl){
	// js代码正则
	const evalExpr = /<%=(.+?)%>/g;
	// js表达式正则
	const expr = /<%([\s\S]+?)%>/g;

	tpl = tpl
	.replace(evalExpr,'`); \n echo( $1 ); \n echo(`')
	.replace(expr,'`); \n $1 \n echo(`');
	tpl = 'echo(`' + tpl + '`);';
	let script = 
	`(function parse(data){
		let output = "";

		function echo(html) {
			output += html;
		}

		${tpl}

		return output
	})`;
	return script;
}

// 字符串模板
function compileTpl(template,data){
	return eval(compile(template))(data)
}
export {jumpApp,toast,topage,urlParameter,dateFormat,timeDistanceForat, getParam,compile,compileTpl}