import axios from 'axios'
// import qs from 'qs'
import urls from './urls'
import store from '../store'
import router from '../router'

axios.defaults.baseURL = '/api/'
axios.defaults.timeout = 20000
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// http请求拦截器
axios.interceptors.request.use(config => {
  // if (config.method === 'post') {
  //   config.data = qs.stringify(config.data)
  // }
  // if (localStorage.token) {
  //   config.headers.Authorization = localStorage.token
  // }
  if (!config.url.includes('getPastOpen')) {
    store.commit('SAVELOADINGFLAG', true)
  }
  return config // must
}, error => {
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {
  store.commit('SAVELOADINGFLAG', false)
  if (data.data.status === 302) {
    router.push({name: 'login'})
    return
  }
  return data.status === 200 ? Promise.resolve(data) : Promise.reject(data) // must
}, error => {
  return Promise.reject(error)
})

export function login (formData, config) {
  return axios.post(urls.login, formData, config)
}
export function getIndexInfo () {
  return axios.get(urls.indexInfo)
}
export function getLotteryListAll () {
  return axios.get(urls.lotteryListAll)
}
export function getUserInfo () {
  return axios.get(urls.userInfo)
}
export function getBalance () {
  return axios.get(urls.balance)
}
export function getPlayTree (lotteryId) {
  return axios.get(urls.playTree, { params: { lotteryId } })
}
export function getCurrentSaleTime (lotteryId) {
  return axios.get(urls.saleTime, {params: { lotteryId }})
}
export function getPastOpen ({lotteryId, count}) {
  return axios.get(urls.pastOpen, { params: {lotteryId, count} })
}
export function postBet (formData) {
  return axios.post(urls.bet, formData)
}
export function winList () {
  return axios.get(urls.winList)
}
export function rechargeList (limit) {
  return axios.get(urls.rechargeList, {params: limit})
}
export function gainLost () {
  return axios.get(urls.gainLost)
}
export function userNoticeList (limit) {
  return axios.get(urls.userNoticeList, { params: limit })
}
export function readNotice (id) {
  return axios.get(urls.readNotice, {params: {noticeId: id}})
}
export function noticeInfor (id) {
  return axios.get(urls.noticeInfor, {params: {id}})
}
export function underUserList (account) {
  return axios.get(urls.underUserList, {params: {account}})
}
export function betOrderList (params) {
  return axios.get(urls.betOrderList, {params})
}
export function userTeam (account, dateFlag) {
  return axios.get(urls.userTeam, {params: {account, dateFlag}})
}
export function underLevelRepor (params) {
  return axios.get(urls.underLevelRepor, { params })
}
export function extQuota () {
  return axios.get(urls.extQuota)
}
export function inviteCode (formData) {
  return axios.post(urls.inviteCode, formData)
}
export function getInviteCode (type) {
  return axios.get(urls.getInviteCode, {params: {type}})
}
export function delInviteCode (formData) {
  return axios.post(urls.deleteInviteCode, formData)
}
export function tradeList (params) {
  return axios.get(urls.tradeList, { params })
}
export function securityCenterStatus () {
  return axios.get(urls.securityCenterStatus)
}
export function validOldLoginPassword (formData) {
  return axios.post(urls.validOldLoginPassword, formData)
}
export function securityCode (formData) {
  return axios.post(urls.securityCode, formData)
}
export function reviseSecurityCode (formData) {
  return axios.get(urls.reviseSecurityCode, formData)
}
