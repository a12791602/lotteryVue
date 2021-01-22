// 'use strict'
// const host = 'http://edu0370.com/'
// export default {
//   login: host + '/api/user/login',
//   indexInfo: host + '/api/index/getIndexInfo',
//   lotteryListAll: host + '/api/lottery/getLotteryList',
//   userInfo: host + 'api/userCenter/getTopUserData',
//   balance: host + 'api/userCenter/getBalance',
//   playTree: host + 'api/lottery/getPlayTree',
//   saleTime: host + 'api/lottery/getCurrentSaleTime',
//   pastOpen: host + 'api/lottery/getPastOpen',
//   bet: host + 'api/lottery/bet',
//   winList: host + 'api/lottery/getLastDayWinList'
// }
'use strict'
export default {
  login: 'user/login',
  indexInfo: 'index/getIndexInfo',
  lotteryListAll: 'lottery/getLotteryList',
  userInfo: 'userCenter/getTopUserData',
  balance: 'userCenter/getBalance',
  playTree: 'lottery/getPlayTree',
  saleTime: 'lottery/getCurrentSaleTime',
  pastOpen: 'lottery/getPastOpen',
  bet: 'lottery/bet',
  winList: 'lottery/getLastDayWinList',
  rechargeList: 'proxy/getRechargeList',
  gainLost: 'proxy/getGainLost',
  userNoticeList: 'proxy/getUserNoticeList',
  readNotice: 'proxy/addReadNotice',
  noticeInfor: 'proxy/getNoticeInfor',
  underUserList: 'proxy/getUnderUserList',
  betOrderList: 'proxy/getbetOrderList',
  userTeam: 'proxy/getUserTeam',
  underLevelRepor: 'proxy/getUnderLevelReport',
  extQuota: 'agent/getExtQuota',
  inviteCode: 'agent/createInviteCode',
  deleteInviteCode: 'agent/deleteInviteCode',
  getInviteCode: 'agent/inviteCode',
  tradeList: 'proxy/getTradeList',
  securityCenterStatus: 'userCenter/getSecurityCenterStatus',
  validOldLoginPassword: 'userCenter/validOldLoginPassword',
  securityCode: 'userCenter/setSecurityCode',
  reviseSecurityCode: 'userCenter/validSecurityCode'
}
