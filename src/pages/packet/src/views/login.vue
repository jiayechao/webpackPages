<template>

    <div class="main-container">
        <div class="title" v-if="redPackageCode">手气最佳还没出现，快！</div>

        <div class="total-container" v-if="redPackageCode">
            <div class="symbol" :style="symbolFontSize">{{symbol}}</div>
            <div class="total">×{{total}}</div>
        </div>

        <div class="sub-title" v-if="redPackageCode">登录领取</div>

        <input type="text" class="phone-input" placeholder="请输入您的手机号" v-model="mobile">

        <div class="submit-btn" @click="initLogin">{{redPackageCode ? '抢红包' : '登录'}}</div>
        <div class="tips" v-if="redPackageCode && !packType">仅限拓根世界新注册用户领取</div>
    </div>

</template>

<script>
    import _ from 'lodash'

    import fetch from '../../../../util/fetch'

    export default {
		created() {
			let urlParam = this.$route.query
            let redirect = this.$route.query.redirect
            if(!redirect && !urlParam.code) redirect = 'setting'
            this.redirect = redirect

            if(redirect) {

            }else {
	            this.symbol = urlParam.symbol
	            this.total = urlParam.total
	            this.redPackageCode = urlParam.code
	            this.packType = urlParam.allow === '1'

	            let sid = localStorage.getItem('sid')
	            if(sid) {
		            this.loginBySid()
	            }
            }

        },
        data() {
			return {
				mobile: '',
				redPackageCode: '',
				packType: true,
                // loginData: {},
				symbol: '',
                total: '',
				redirect: ''
            }
        },
        mounted() {

        },
        computed: {
		    symbolFontSize() {
		    	let symbol = this.$route.query.symbol
                if(!symbol) return 0
                let fontSize = parseInt(192 / symbol.length)
		    	return {
		    		'font-size': `${fontSize > 48 ? 48 : fontSize}px`
                }
            }
        },
        methods: {
            initLogin() {
            	// 缺验证手机号格式
            	let verifyStatus = true

	            window.wfai.ready(() => {
		            window.wfai.senceLogin.byPhone(this.mobile, (code, msg) => {
			            console.log(msg + ':' + code)
			            if (code === 1002 || code === 2002) {
				            verifyStatus = false
			            }
		            }, res => {
			            this.login(res)
                    })
	            })
            },
            login(token) {
            	let options = {
		            mobile: this.mobile,
		            token: token
                }
                let url = '/japi/share/redpackage/login'
                if(!this.redirect && this.redPackageCode) options.redPackageCode = this.redPackageCode
                fetch.post(url, options)
                    .then(result => {
                    	if(result.code === 200) {
		                    window.localStorage.setItem('sid', result.data.sid)

		                    if(this.redirect) this.$router.replace(this.redirect)
		                    else this.toDetail(result.data)
                        }else {
                    		this.$toast(result.msg || `请求忙`)
                        }
                        // this.loginData = result.data

                    })
            },
            loginBySid() {
	            fetch.post('/japi/share/redpackage/take-rp', {
		            redPackageCode: this.redPackageCode,
	            }).then(result => {
		            this.toDetail(result.data)
	            })
            },
            toDetail(packet) {
	            this.$router.push({
		            path: 'detail',
		            query: {
			            id: packet.rpId,
			            expired: packet.expired ? 1 : 0,
			            allow: packet.oldUserNoReward ? 0 : 1
		            }
	            })
            }
        }
    }
</script>

<style lang="scss" scoped>


    .main-container {
        width: 750px;
        height: 1334px;
        position: relative;
        background-size: 100% 100%;
        background-image: url("../../../../img/packet/login_bg.png");

        .title {
            width: 100%;
            font-size: 42px;
            color: #ffffff;
            text-align: center;
            line-height: 59px;
            position: absolute;
            top: 207px;
            font-family: PingFangHK-Medium;
        }

        .total-container {
            width: 100%;
            text-align: center;
            position: absolute;
            font-family: PingFangHK-Semibold;
            color: #FFF5B2;
            top: 446px;

            .symbol {
                line-height: 145px;
            }

            .total {
                font-size: 48px;
                margin-top: -24px;
            }
        }

        .sub-title {
            width: 100%;
            font-size: 48px;
            color: #ffffff;
            text-align: center;
            line-height: 65px;
            font-family: PingFangHK-Medium;
            position: absolute;
            bottom: 534px;
        }

        .phone-input {
            width: 630px;
            height: 94px;
            position: absolute;
            bottom: 406px;
            left: calc(50% - 325px);
            border-radius: 14px;
            padding-left: 20px;
            font-size: 32px;
            line-height: 94px;
            border: none;
        }

        .submit-btn {
            width: 650px;
            height: 100px;
            line-height: 100px;
            text-align: center;
            position: absolute;
            bottom: 98px;
            left: calc(50% - 325px);
            color: #ffffff;
            font-size: 40px;
            border-radius: 100px;
            background-image: linear-gradient(0deg, #FF9D00 0%, #FFB300 100%);
        }

        .tips {
            font-size: 28px;
            line-height: 40px;
            color: #FFFFFF;
            text-align: center;
            width: 100%;
            position: absolute;
            bottom: 37px;
        }
    }

</style>













