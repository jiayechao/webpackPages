<template>
  <div class="index-wrap">
    <img class="logo" src="../img/delc2/logo.png"/>
	<div class="clear"></div>
	<img class="title_index" src="../img/delc2/title_login.png"/>

	<div class="box_border">
		<div class="box_content">
			<div class="token_name">DELC代币数</div>
			<div class="token_count">23432.0921</div>
			<a href="javascript:;" class="btn small_btn token_btn">什么是DELC？</a>
			<div class="clear"></div>
		</div>
	</div>

	<div class="content_title">DELINK社区中心</div>

	<table class="icon_table">
		<tr>
			<td><a href="#"><img src="../img/delc2/icon1.png"></a></td>
			<td><a href="#"><img src="../img/delc2/icon2.png"></a></td>
			<td><a href="#"><img src="../img/delc2/icon3.png"></a></td>
		</tr>
		<tr>
			<td>邀请好友</td>
			<td>加官方微信群</td>
			<td>关注公众号</td>
		</tr>
	</table>
	<table class="icon_table">
		<tr>
			<td><a href="#"><img src="../img/delc2/icon4.png"></a></td>
			<td><a href="#"><img src="../img/delc2/icon5.png"></a></td>
			<td><a href="#"><img src="../img/delc2/icon6.png"></a></td>
		</tr>
		<tr>
			<td>加官方电报群</td>
			<td>签到提现</td>
			<td>了解DELINK</td>
		</tr>
	</table>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>

.title_index{
	width: 65vw;
	margin: 5vh auto 2vh auto;
}
.token_name{
	font-size: 6vw;
	font-weight: 400;
	width: 100%;
	text-align: center;
	margin-top:1vh; 
}
.token_btn{
	padding: 0 2vw;
	float: right;
	margin-bottom: 1vw;
}
.token_count{
	font-size: 8vw;
	font-weight: 400;
	margin: 2vh 0;
	text-align: center;
	color: #00ffff;
}
.content_title{
	letter-spacing:0.8vw;
	font-size: 5vw;
	margin:3vh auto 2vh auto; 
	width: 80vw;
	font-weight: 400;
	text-align: left;
}
.icon_table{
	width: 85vw;
	margin: 0 auto 1vh auto;
	font-weight: 100;
	font-size: 3.5vw;
}
.icon_table img{
	width: 90%;
}

</style>
