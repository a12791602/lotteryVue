import axios from 'axios';
import md5 from 'js-md5';
import {
  GROUP,
  BET_CONTENT_FLAG,
  SHOW_RIGHT,
  CURRENT_PLAYER,
  MONEY,
  ZHU,
  CON,
  BET_SUCCESS,
  BET_GO_SHOW,
  BET_NOT,
  LIST_NAME,
  SEASONID2,
  GET_PAST_OPENS,
  LOOK_ALL_UL,
  DMNUM,
  DMARR,
} from './mutation-types';
export default {
  historyNum(state, path) {
    state.historyNum = path;
  },
  getCaptchaCode(state) {
    this.axios({
      method: 'GET',
      url: state.url + 'checkCode?code=df&account=adfsdf&_=' + state.newDate,
    }).then((response) => {
      state.captchaCodeImg = response.data.content
    })
  },
  [GROUP](state, value) {
    state.group = value
  },
  [BET_CONTENT_FLAG](state, flag) {
    if (flag === "reverse") {
      state.betContentTopPopFlag = !state.betContentTopPopFlag
    } else {
      state.betContentTopPopFlag = flag
    }
  },
  [SHOW_RIGHT](state, flag) {
    if (flag === "reverse") {
      state.showRight = !state.showRight
    } else {
      state.showRight = flag
    }
  },
  [CURRENT_PLAYER](state, flag) {
    if (flag === "clear") {//清空选择状态以及不可选择状态
      state.dmArr = [];
      state.dmNum = "";
      if (state.current_player.numView) {
        state.current_player.numView.forEach((item1, index1) => {
          if (item1.nums) {
            item1.nums.forEach((item2, index2) => {
              if (item2.choose === true) {
                state.current_player.numView[index1].nums[
                  index2
                ].choose = false;
              }
              if (item2.noVisible === true) {
                state.current_player.numView[index1].nums[
                  index2
                ].noVisible = false;
              }
            });
          }
        });
      }
    }else if(flag.target === "chooseFalse"){//选中胆码取消拖码选中
      state.current_player.numView[1].nums[
        flag.index
      ].choose = false;
    } else if (flag.target === "clearVisiable") { //清除拖码不可选择控制
      state.current_player.numView[0].nums.forEach((item, index) => {
        if (item.choose === false) {
          state.current_player.numView[1].nums[index].noVisible = false;
        }
      })
    } else if (flag.target === "noVisiable") { //控制拖码是否可选
      let target = flag.flag.split("noVtrue")[1];//拖码不可选择
      if (target) {
        [...new Set(target)].forEach((item, index) => {
          state.current_player.numView[item].nums[
            flag.index
          ].noVisible = true;
        })
      } 
    }else if (flag.target === "fixDm") {//修正胆码排列
      if (state.dmArr.length > 0) {
        if (state.dmArr.length > state.dmNum) {
          state.dmArr.splice(-2, 1);
        }
        //先清空胆码
        state.current_player.numView[0].nums.forEach((item, index) => {
          state.current_player.numView[0].nums[index].choose = false;
        })
        //然后重绘制胆码排列
        state.dmArr.forEach((item, i) => {
          let index = item[0] == "0" ? item[1] - 1 : item - 1;
          state.current_player.numView[0].nums[index].choose = true;
        })
      }
    } else {
      state.current_player = flag
    }
  },
  [MONEY](state, value) {
    state.money = value
  },
  [ZHU](state, flag) {
    state.zhu = Number(state.zhu);
    if (flag === "add") {
      state.zhu += 1
    } else if (flag === "reduce") {
      state.zhu -= 1
    } else {
      state.zhu = flag
    }
  },
  [CON](state, flag) {
    if (flag === "add") {
      state.con += 1
    } else if (flag === "reduce") {
      state.con -= 1
    } else {
      state.con = flag
    }
  },
  [BET_SUCCESS](state, flag) {
    if (flag === "reverse") {
      state.betsuccess = !state.betsuccess
    } else {
      state.betsuccess = flag
    }
  },
  [BET_GO_SHOW](state, flag) {
    if (flag === "reverse") {
      state.betGoshow = !state.betGoshow
    } else {
      state.betGoshow = flag
    }
  },
  [BET_NOT](state, flag) {
    if (flag === "reverse") {
      state.betnot = !state.betnot
    } else {
      state.betnot = flag
    }
  },
  [LIST_NAME](state, value) {
    state.listname = value
  },
  [SEASONID2](state, value) {
    state.seasonId2 = value
  },
  [GET_PAST_OPENS](state, value) {
    state.getPastOpens = value
  },
  [LOOK_ALL_UL](state, flag) {
    if (flag === "reverse") {
      state.lookAllUl = !state.lookAllUl
    } else {
      state.lookAllUl = flag
    }
  },
  [DMARR](state, target) {
    if (target.flag === "push") {//添加胆码
      state.dmArr.push(target.value);
    }
    if (target.flag === "filter") {//去除胆码
      state.dmArr = state.dmArr.filter((item, index) => {
        return item != target.value
      });
    }
  },
  [DMNUM](state, v) {
    state.dmNum = v;
  }
}
