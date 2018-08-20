<template>
  <div class="active-wrap">
    <img class="logo" src="../img/delc2/logo.png"/>
	<div class="clear"></div>
	

	<div id="invite_1" v-if="$route.query.invite == 1">
		<img class="title_img" src="../img/delc2/title_invite.png" style="width:50vw"/>
		<div class="box_border">
		<div class="box_content">
			<div class="invite_name">邀请人数</div>
			<div class="invite_count">2343</div>
			<div class="sep_line"></div>
			<div class="share_url">
			https://www.tokenworld.pro/help/delclogin.html
			</div>
		</div>
		</div>
		<a class="btn big_btn long_btn" href="javascript:;">点击复制链接</a>
	</div>

	<div id="invite_2" v-if="$route.query.invite == 2">
		<img class="title_img" src="../img/delc2/title_wxgfq.png" style="width:80vw"/>
		<div class="sub_title">扫码进群，第一时间获得官方最新消息</div>
		<div class="box_border" style="width:50vw;margin-top:18vh ">
		<div class="box_content">
			<img class="qc_code" src=""/>
		</div>
		</div>
	</div>

	<div id="invite_3" v-if="$route.query.invite == 3">
		<img class="title_img" src="../img/delc2/title_pub.png" style="width:80vw"/>
		<div class="sub_title">扫码关注公众号，第一时间获得官方最新消息</div>
		<div class="box_border" style="width:50vw;margin-top:18vh ">
		<div class="box_content">
			<img class="qc_code" src=""/>
		</div>
		</div>
	</div>

	<div id="invite_4" v-if="$route.query.invite == 4">
	<img class="title_img" src="../img/delc2/title_telegram.png" style="width:50vw"/>
	<div class="box_border">
		<div class="box_content">
			<div class="tele_content">
				进电报群</br>
				第一时间获得官方最新消息
			</div>
			<div class="sep_line"></div>
			<div class="share_url">
			链接
			</div>
		</div>
		</div>
		<a class="btn big_btn long_btn" href="javascript:;">点击复制电报群链接</a>
	</div>


	<div id="invite_5" v-if="$route.query.invite == 5">
	<img class="title_img" src="../img/delc2/title_tw.png" style="width:40vw"/>
	<div class="box_border">
		<div class="box_content">
				拓根世界是一个聚焦于价值传递的区块链社交平台，是DELINK官方唯一指定的社交应用。在这里你可以获得糖果奖励，还能使用投票、签到、聊天、钱包、转账等功能。
			
		</div>
		</div>
		<a class="btn big_btn long_btn" href="javascript:;">点击下载拓根世界</a>
	</div>


	<div id="invite_0" v-if="$route.query.invite == 0">
	<img class="title_img" src="../img/delc2/title_login.png" style="width:80vw"/>
	<div class="box_border">
		<div class="box_content">
<p class="intro_head">什么是DELC?</p>
DELC是DELINK人脉分享生态链的权益分配凭证（token），跟随人脉资产的转移而流通。支付DELC获得一份人脉信息的查阅、更新权。人脉信息被查阅时，该条人脉的共有者共享收益。
<p class="intro_head">DELC的用途</p>
<p>1、在交易市场上进行交易流通；</p>
<p>2、在DELINK的DAPP中可以自由交易分享人脉信息。	</p>
		</div>
		</div>
	</div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {
    console.log(this.$route.query.invite)
  }
}
</script>

<style lang="scss" scoped>
.invite_name{
	font-size: 6vw;
	font-weight: 400;
	width: 100%;
	text-align: center;
	margin-top:2vh; 
}
.invite_count{
	font-size: 8vw;
	font-weight: 400;
	margin: 4vh 0;
	text-align: center;
	color: #00ffff;
}
.sep_line{
	width:90%;
	height:1px;
	background-color: #fff;
	margin: 2vh auto;
}
.share_url{
	width:90%;
	margin: 0vw auto 2vh auto;
	word-wrap: break-word;
	text-align: center;
}
.sub_title{
	font-size: 4vw;
	margin-top: -2vh; 
}
.qc_code{
	width: 40vw;
	height:40vw;
}
.tele_content{
	text-align: center;
	font-size: 4vw;
	font-weight: 200;
	margin-top: 2vh; 
}
.intro_head{
	font-size: 4vw;
	text-align: center;
	margin: 2vh auto;
}

#invite_0,#invite_1,#invite_2,#invite_3,#invite_4,#invite_5{
	display: block;
}

#invite_0{
	display: block;
}
</style>
