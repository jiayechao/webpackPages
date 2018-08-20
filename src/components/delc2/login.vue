<template>
  <div class="login-wrap">
    <img class="logo" src="../img/delc2/logo.png"/>
	<div class="clear"></div>
	<img class="title_login" src="../img/delc2/title_login.png"/>

	<div class="phone">
		<input class="input" type="text" name="" placeholder="请输入手机号"/>
	</div>
	<div class="code">
		<input class="input code_input" type="text" name="" placeholder="请输入验证码"/>
		<a class="btn big_btn code_btn" href="javascript:;">获取验证码</a>
	</div>

	<a class="btn big_btn long_btn" href="javascript:;">立即登录</a>

	<div class="about">关于DELINK</div>

	<div class="box_border">
		<div class="box_content">
		DELINK是全球首家去中心化人脉分享生态；通过区块链技术，DELINK将中心化互联网平台的人脉资产所有制进行改革，通过token激励机制重塑人才流通领域的利益分配模型，以人脉即挖矿激励社区五亿用户分享人脉，将人脉资产的所有权与创造的价值回归用户。
		</div>
	</div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.title_login{
	width: 75vw;
	margin: 6vh auto 0 auto;
}
.phone{
	width: 80vw;
	height: 11vw;
	border:0.5vw solid #00fcff;
	border-radius: 6vw;
  	margin:4vh auto 0 auto;
}
.code{
	width: 80vw;
	height: 10.5vw;
	line-height: 10.5vw;
	border:0.5vw solid #00fcff;
	border-radius: 6vw;
  	margin:2vh auto 0 auto;
}
.code_input{
	width: 30vw;
}
.code_btn{
	padding:0 6vw;
	margin:-0.2vw -0.2vw 0 0;
	float: right;
}

.input{
	font-size: 4vw;
	border: 0;
	background-color: transparent;
	float:left;
	height: 10vw;
	line-height: 10vw;
	margin-left:4vw;
	color: #00fcff;
}
::-webkit-input-placeholder { /* WebKit browsers */
    color:    #00fcff;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #00fcff;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #00fcff;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
    color:    #00fcff;
}

.about{
	letter-spacing:0.8vw;
	font-size: 6vw;
	color: #00fcff;
	font-style:italic;
	margin:4vh auto 2vh auto; 
}

</style>
