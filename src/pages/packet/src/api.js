const api = {
  sned: '/japi/share/redpackage/send', // 发红包设置
  getMyAccounts: '/japi/user/account/getMyAccounts', //获取账户信息
  verify: '/japi/verify-code/send-sms-auto', // 短信验证码
  getRule: '/japi/share/redpackage/rules/get-rule', // 规则
  list: '/japi/share/redpackage/list' // 我的红包列表
}
module.exports = api