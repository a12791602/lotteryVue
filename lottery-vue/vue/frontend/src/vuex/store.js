import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import actions from './action'
import axios from 'axios';
import {
  getStore
} from '../config/mutil'

Vue.use(Vuex)
const state = {
  JSESSIONICookie: '',
  loginStatus: localStorage.getItem('loginSta'), //登陆状态
  Globalname: localStorage.getItem('Globalname'), //全局账号
  Globalword: localStorage.getItem('Globalword'), //全局密码
  newDate: new Date().getTime(), //获取时间戳
  captchaCodeImg: {}, //验证码地址
  errorcode: 0, //输入错误次数
  balance: null, //余额
  userType: localStorage.getItem('userType'), //0会员，1代理
  historyNum: "/one",
  isNotice: false, //是否有未读消息
  noticeCount: 0, //有未读消息，多少条

  //游戏投注相关
  group:"",//配置彩种种类（11选5）
  betContentTopPopFlag: false, //是否弹出投注记录
  showRight: false, //头部右侧切换彩种
  current_player: {}, //当前玩法树
  money: "", //投注金额  
  zhu: 0, //注单数
  con: "", //已选号码
  betsuccess: false, //投注是否成功标识
  betGoshow: false, //投注确认标识
  betnot: true, //取消投注
  listname: "", //彩种
  seasonId2: "", //当前期号  
  getPastOpens: "", //过去20期开奖
  lookAllUl: false, //是否查看过去20期开奖
  dmNum: "", //可选择胆码数量
  dmArr: [] //最新选中胆码下标
}
//test & prod
if (process.env.NODE_ENV === 'production') {
  if (location.hostname === 'm.edu0370.com' || location.hostname === 'm.50fq.com')
    state.url = 'http://' + location.hostname.replace('m.', '') + '/';
  else
    state.url = 'https://' + location.hostname.replace('m.', '') + '/';
}
//local
else {
  state.url = 'http://edu0370.com/';
}
//getters
const getters = {
  playBonusId: state => {
    return state.current_player.id
  },
  seasonId: state => {
    return state.seasonId2.substring(4).split("-").join("") * 1;
  },
  displayBonus1() {
    let displayBonus1 = "";
    if (state.current_player.displayBonus && state.current_player.displayBonus.indexOf("-") != -1) {
      displayBonus1 = state.current_player.displayBonus.split("-")[0];
      displayBonus1 = Number(displayBonus1);
    }
    return displayBonus1;
  },
  displayBonus2() {
    let displayBonus2 = "";
    if (state.current_player.displayBonus && state.current_player.displayBonus.indexOf("-") != -1) {
      displayBonus2 = state.current_player.displayBonus.split("-")[1];
      displayBonus2 = Number(displayBonus2);
    }
    return displayBonus2;
  },
  getPastOpens() {
    let getPastOpens=state.getPastOpens;  
    if (getPastOpens&&state.group==="x11x5") {
      getPastOpens.forEach((item, index) => {
        [1, 2, 3, 4, 5].forEach((item1, index1) => {
          if (item["n" + item1] < 10) {
            getPastOpens[index]["n" + item1] = "0" + item["n" + item1]
          }
        })
      })
    }
    return getPastOpens;
  }
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  // strict: process.env.NODE_ENV !== 'production'
})
