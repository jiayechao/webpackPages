<template>

    <div class="main-container">

        <div class="success-container" v-if="packetDetail.success">
            <div class="number">
                {{packetDetail.quantity}} {{packetDetail.symbol}}
            </div>
            <div class="tips">
                奖励已放入拓根世界您的资产内，<span @click="toDownload">前往查看</span>
            </div>
        </div>
        <div class="error-tips" v-else>{{errorType}}</div>

        <div class="detail-container">
            <div class="detail-item" v-for="item in latestList">
                <div class="header-container" :class="{'best': item.best}">
                    <div class="header" :style="{'background-image': `url(${item.avatar})`}"></div>
                </div>
                <div class="user-info">
                    <div class="name">{{item.username}}</div>
                    <div class="time">{{item.time}}</div>
                </div>
                <div class="number">
                    {{item.quantity}}
                    {{packetDetail.symbol}}
                </div>
            </div>

            <div class="more" @click="showList = true" v-if="packetDetail.rpOwnerInfoList && packetDetail.rpOwnerInfoList.length > 3">
                <span>查看更多</span>
                <div class="arrow"></div>
            </div>
        </div>

        <div class="submit-btn" @click="$router.push('setting')">我也要发红包</div>

        <img src="../../../../img/packet/app.png" alt="" class="download-app">
        <div class="bottom-container">
            <div class="first">长按，下载拓根世界</div>
            <div class="second">拓根世界，聚焦于token价值传递。登录APP可红包提现，同时能领取更多价值token。</div>
        </div>


        <div v-if="showList">
            <div class="mask" @click="showList = false"></div>

            <div class="list-container">
                <div class="detail-item" v-for="item in packetDetail.rpOwnerInfoList">
                    <div class="header-container" :class="{'best': item.best}">
                        <div class="header" :style="{'background-image': `url(${item.avatar})`}"></div>
                    </div>
                    <div class="user-info">
                        <div class="name">{{item.username}}</div>
                        <div class="time">{{item.time}}</div>
                    </div>
                    <div class="number">
                        {{item.quantity}}
                        {{packetDetail.symbol}}
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
	import _ from 'lodash'

	import fetch from '../../../../util/fetch'

    import { dateFormat, toast } from "../../../../util/tool"

	export default {
		created() {
            let rpId = this.$route.query.id
            if(!rpId) {
            	toast('红包不存在')
            }else this.getPacketDetail(rpId)
        },
        data() {
			return {
				packetDetail: {},
                errorType: '',
				showList: false
            }
        },
        computed: {
	        latestList() {
	        	let list = this.packetDetail.rpOwnerInfoList
	        	if(list && list.length) {
	        		return list.slice(0, 3)
                }else {
	        		return []
                }
            }
        },
        methods: {
	        getPacketDetail(rpId) {
		        fetch.post('/japi/rp/take-detail', {
			        rpId: rpId
		        }).then(result => {
		        	let packetDetail = result.data
			        this.packetDetail = packetDetail

                    _.forEach(this.packetDetail.rpOwnerInfoList, item => {
                    	item.time = dateFormat(new Date(item.time * 1000), 'yyyy-MM-dd')
                    })

                    if(!packetDetail.success) {
	                    let urlParam = this.$route.query

                        console.log(urlParam)
                        if(urlParam.allow.toString() === '0') {
                        	this.errorType = '仅限拓根世界新注册用户领取'
                        }else if(urlParam.expired.toString() === '1') {
	                        this.errorType = '红包已过期'
                        }else if(packetDetail.finished) {
                        	this.errorType = '红包已抢完'
                        }
                    }
		        })
	        },
            toDownload() {
                window.location.href = '/help/appdown/index.html?pathurl=platformAccount'
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
        background-image: url("../../../../img/packet/detail_bg.png");

        .error-tips {
            font-family: PingFangHK-Medium;
            font-size: 42px;
            color: #FF4810;
            letter-spacing: 0;
            text-align: center;
            line-height: 42px;
            width: 100%;
            position: absolute;
            top: 395px;
        }

        .success-container {
            position: absolute;
            width: 100%;
            text-align: center;
            top: 365px;
            font-family: PingFangHK-Medium;

            .number {
                font-size: 42px;
                color: #FFB600;
                letter-spacing: 0;
                line-height: 42px;
            }

            .tips {
                font-size: 24px;
                color: #ffffff;
                line-height: 24px;
                margin-top: 24px;

                span {
                    color: #1DC3E0;
                }
            }
        }

        .detail-container {
            width: 650px;
            height: 437px;
            background-color: #ffffff;
            border-radius: 14px;
            position: absolute;
            left: calc(50% - 325px);
            top: 487px;

            .more {
                position: absolute;
                bottom: 0;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                font-family: PingFangHK-Regular;
                font-size: 24px;
                color: #999999;
                height: 76px;

                .arrow {
                    background-image: url("../../../../img/packet/tk_community_icon.png");
                    background-size: 100% 100%;
                    width: 24px;
                    height: 24px;
                    margin-right: 24px;
                }
            }
        }

        .detail-item {
            width: 622px;
            height: 120px;
            margin-left: 28px;
            box-shadow: 0 2px 0 0 #EEEEEE;
            display: flex;
            align-items: center;
            position: relative;
            font-family: PingFangSC-Medium;

            .header-container {
                width: 85px;
                height: 91px;

                &.best {
                    background-size: 100% 100%;
                    background-image: url("../../../../img/packet/best-header.png");
                }

                .header {
                    width: 80px;
                    height: 80px;
                    background-size: 100% 100%;
                    margin-top: 10px;
                    margin-left: 2px;
                    border-radius: 40px;
                }
            }

            .user-info {
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-left: 20px;

                .name {
                    font-size: 28px;
                    color: #000000;
                    letter-spacing: -0.43px;
                    line-height: 40px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    max-width: 250px;
                }

                .time {
                    font-size: 24px;
                    color: #999999;
                    letter-spacing: -0.37px;
                }
            }

            .number {
                font-size: 30px;
                color: #FFB600;
                letter-spacing: 0;
                position: absolute;
                right: 24px;
            }
        }

        .submit-btn {
            width: 650px;
            height: 100px;
            line-height: 100px;
            text-align: center;
            position: absolute;
            bottom: 272px;
            left: calc(50% - 325px);
            color: #ffffff;
            font-size: 40px;
            border-radius: 100px;
            background-image: linear-gradient(0deg, #FF9D00 0%, #FFB300 100%);
        }

        .bottom-container {
            width: 487px;
            word-wrap: break-word;
            position: absolute;
            font-family: PingFangSC-Medium;
            color: #FFFFFF;
            letter-spacing: -0.52px;
            left: 206px;
            bottom: 0;
            height: 221px;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            flex-direction: column;

            .first {
                font-size: 34px;
            }

            .second {
                margin-top: 9px;
                opacity: 0.7;
                font-size: 24px;
            }
        }

    }

    .mask {
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: #000000;
        opacity: 0.3;
        top: 0;
    }

    .list-container {
        position: fixed;
        width: 650px;
        left: calc(50% - 325px);
        height: calc(100% - 124px);
        top: 62px;
        background-color: #ffffff;
        border-radius: 14px;
        overflow: auto;
    }

    .download-app {
        width: 138px;
        height: 138px;
        position: absolute;
        left: 50px;
        bottom: 41px;
    }

</style>












