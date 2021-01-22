import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import { getStorage } from './../storage'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userName: getStorage('username'),
    JSESSIONICookie: '',
    userType: getStorage('userType'),
    loginStatus: getStorage('loginSta'),
    Globalname: getStorage('Globalname'),
    Globalword: getStorage('Globalword'),
    loadingFlag: '',
    betContent: {},
    currentPlayer: '',
    playBonusId: '',
    zhu: '',
    money: '',
    con: '',
    seasonId: '',
    fullTitle: '',
    rebate: ''
  },
  getters,
  mutations,
  actions
})
