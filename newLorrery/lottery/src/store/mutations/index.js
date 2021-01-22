import { SAVEPLAYBONUSID, SAVEZHU, SAVEMONEY, SAVECON, SAVESEASONID, SAVECURRENTPLAYER, SAVEFULLTITLE, SAVEREBATE, SAVELOADINGFLAG, SAVEUSERNAME } from './mutation-types'
export default {
  [SAVEPLAYBONUSID] (state, playBonusId) {
    state.playBonusId = playBonusId
  },
  [SAVEZHU] (state, zhu) {
    state.zhu = zhu
  },
  [SAVEMONEY] (state, money) {
    state.money = money
  },
  [SAVECON] (state, con) {
    state.con = con
  },
  [SAVESEASONID] (state, seasonId) {
    state.seasonId = seasonId
  },
  [SAVECURRENTPLAYER] (state, currentPlayer) {
    state.currentPlayer = currentPlayer
  },
  [SAVEFULLTITLE] (state, fullName) {
    state.fullTitle = fullName
  },
  [SAVEREBATE] (state, rebate) {
    state.rebate = rebate
  },
  [SAVELOADINGFLAG] (state, flag) {
    state.loadingFlag = flag
  },
  [SAVEUSERNAME] (state, userName) {
    state.userName = userName
  }
}
