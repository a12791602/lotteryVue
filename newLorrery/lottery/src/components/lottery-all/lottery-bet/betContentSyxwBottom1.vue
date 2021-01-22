<template>
  <div class="betContentSyxwBottom">
    <div class="game_info">
      <p>{{currentPlayer.remark}} <span class="reward"> 奖金{{currentPlayer.displayBonus | keepTwoNum}}元</span></p>
    </div>
    <div>{{playBonusId}}</div>
    <ul class="lottery_ball">
      <li v-for="(numViews, indexff) in currentPlayer.numView" :key="indexff">
        <span class="pos">{{numViews.title}}</span>
        <div class="ball_wrap">
          <span v-for="(num, indexg) in numViews.nums" :key="indexg" :class="['ball', num.choose ? 'active' : '']" @click="curBalls({indexff, indexg, num, numViews, currentPlayer})">{{num.ball}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
'use strict'
import { mapState } from 'vuex'
export default {
  name: 'betContentSyxwBottom',
  data () {
    return {
      con: '', // 已选号码
      zhu: 0, // 注数
      d: [], // 选中的号码的下标
      dd: [], // 选中的号码的下标 //kw wn 中间变量
      ka: [], // 选中的号码的下标
      kb: [], // 选中的号码的下标
      kc: [], // 选中的号码的下标
      kd: [], // 选中的号码的下标
      ke: [], // 选中的号码的下标
      an: [],
      bn: [],
      cn: [],
      dn: [],
      en: [],
      tempDmArr: [],
      tempZxFsArr: [],
      selectBalls: [
        { name: '全', type: 1 },
        { name: '大', type: 2 },
        { name: '小', type: 3 },
        { name: '奇', type: 4 },
        { name: '偶', type: 5 },
        { name: '清', type: 6 }
      ]
    }
  },
  computed: {
    ...mapState(['currentPlayer']),
    playBonusId () {
      return this.currentPlayer.id
    }
  },
  methods: {
    curBalls ({indexff, indexg, num, numViews, currentPlayer}) {
      let playBonusId = this.playBonusId
      num.choose = !num.choose
      if (currentPlayer.numView.length === 1) {
        num.choose ? this.d[indexg] = num.ball : this.d.splice(indexg, 1)
        this.dd = this.d.filter(Boolean)
        this.con = this.dd.join(',')
        this.clacSingleBall({playBonusId})
      } else {
        this.calcDoubleBalls({num, indexff, indexg, playBonusId, currentPlayer})
      }
      this.$store.commit('SAVEZHU', this.zhu)
      this.$store.commit('SAVECON', this.con)
    },
    clacSingleBall ({playBonusId}) {
      // 任选复式
      if (['n11x5_x1', 'n11x5_x2', 'n11x5_x3', 'n11x5_x4', 'n11x5_x5', 'n11x5_x6', 'n11x5_x7', 'n11x5_x8'].includes(playBonusId)) {
        let num = playBonusId.match(/[0-9]/g).pop() * 1
        this.zhu = this.groupList(this.dd.length, num)
      }
      // 选一 前三不定位
      if (['n11x5_front3_nx1'].includes(playBonusId)) {
        this.zhu = this.dd.length
      }
      // 组选复式
      if (['n11x5_star2_group', 'n11x5_star3_group'].includes(playBonusId)) {
        let num = playBonusId.match(/[0-9]/g).pop() * 1
        this.zhu = this.groupList(this.dd.length, num)
      }
    },
    calcDoubleBalls ({num, indexff, indexg, playBonusId, currentPlayer}) {
      let arr = this.createKN(currentPlayer.numView.length)
      let [kw, wn] = arr[indexff]
      num.choose ? this[kw][indexg] = num.ball : this[kw].splice(indexg, 1, '')
      this.dd = this[kw].filter(Boolean)
      this[wn] = this.dd.join('')
      this.con = arr.reduce((arr1, v, i, self) => arr1.concat(this[self[i][1]] ? this[self[i][1]] : '-'), []).join(',')
      // 选一 定位胆 | 选三 中三 和值 | 大 | 小 | 单 | 双
      if (['n11x5_dwd', 'n11x5_star3_and', 'n11x5_star3_big', 'n11x5_star3_small', 'n11x5_star3_odd', 'n11x5_star3_even'].includes(playBonusId)) {
        num.choose ? this.zhu++ : this.zhu--
      }
      // 选二 直选复式
      if (['n11x5_star2_front'].includes(playBonusId)) {
        let [ka, kb] = [this.ka.filter(Boolean), this.kb.filter(Boolean)]
        let tempArrLen = ka.filter(v => kb.includes(v)).length
        this.zhu = ka.length * kb.length - tempArrLen
      }
      // 选三 直选复式
      if (['n11x5_star3_front'].includes(playBonusId)) {
        let size = playBonusId.match(/[0-9]/g).pop() * 1
        this.tempZxFsArr[indexff] = this[kw].filter(Boolean)
        this.zhu = 0
        if (this.tempZxFsArr.filter(v => v.length).length === size) {
          let times = 0
          this.tempZxFsArr[0].forEach(v1 => {
            this.tempZxFsArr[1].forEach(v2 => {
              if (v1 !== v2) {
                this.tempZxFsArr[2].forEach(v3 => {
                  if (v1 !== v3 && v2 !== v3) {
                    times++
                  }
                })
              }
            })
          })
          this.zhu = times
        }
      }
      // 胆拖
      if (['n11x5_x2_dt', 'n11x5_x3_dt', 'n11x5_x4_dt', 'n11x5_x5_dt', 'n11x5_x6_dt', 'n11x5_x7_dt', 'n11x5_x8_dt', 'n11x5_star2_group_dt', 'n11x5_star3_group_dt'].includes(playBonusId)) {
        let leastZhu = playBonusId.match(/[0-9]/g).pop()
        if (!indexff) { // 胆码 0
          if (num.choose) {
            this.tempDmArr.push(num.ball)
            if (this.tempDmArr.length >= leastZhu) {
              this.tempDmArr.shift()
            }
            if (currentPlayer.numView[1].nums[indexg].choose) {
              currentPlayer.numView[1].nums[indexg].choose = false
            }
          } else {
            let index = this.tempDmArr.findIndex(v => v === num.ball)
            this.tempDmArr.splice(index, 1)
          }
          currentPlayer.numView[0].nums.forEach(v => {
            if (!this.tempDmArr.includes(v.ball)) {
              v.choose = false
            }
          })
        } else { // 拖码 1
          if (currentPlayer.numView[0].nums[indexg].choose && num.choose) {
            currentPlayer.numView[0].nums[indexg].choose = false
          }
        }
        let ka = currentPlayer.numView[0].nums.filter(v => v.choose).map(v => v.ball)
        let kb = currentPlayer.numView[1].nums.filter(v => v.choose).map(v => v.ball)
        console.log(this.ka)
        this.zhu = this.groupList(kb.length, leastZhu - ka.length)
        this.con = ka.join('') + ',' + kb.join('')
      }
      // 龙虎斗
      if (['n11x5_dragon_lion'].includes(playBonusId)) {
        this.con = this.dd.join(',')
      }
    },
    createKN (length) {
      return Array.from({length}, (v, i) => ['k' + String.fromCharCode(65 + i).toLocaleLowerCase(), String.fromCharCode(65 + i).toLocaleLowerCase() + 'n'])
    },
    groupList (len, size) {
      if (len > 0 && size > 0) {
        if (len > size) {
          let a = Array.from({length: len}, (v, i) => i + 1).reduce((num, v) => (num *= v), 1)
          let b = Array.from({length: size}, (v, i) => i + 1).reduce((num, v) => (num *= v), 1)
          let c = Array.from({length: (len - size)}, (v, i) => i + 1).reduce((num, v) => (num *= v), 1)
          return a / (b * c)
        } else if (len === size) {
          return 1
        } else {
          return 0
        }
      } else {
        return 0
      }
    },
    iscreat () {
      this.con = ''
      this.zhu = 0
      this.money = ''
      this.d = []
      this.dd = []
      this.ka = []
      this.kb = []
      this.kc = []
      this.kd = []
      this.ke = []
      this.an = ''
      this.bn = ''
      this.cn = ''
      this.dn = ''
      this.en = ''
      this.tempDmArr = []
      this.tempZxFsArr = []
      this.currentPlayer.numView.forEach(v1 => {
        v1.nums.forEach(v2 => {
          v2.choose = false
        })
      })
    }
  },
  filters: {
    keepTwoNum (str) {
      if (str) {
        return !str.includes('-') ? (parseInt(str * 100) / 100) : str.split('-').map(v => (parseInt(v * 100) / 100)).join('-')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.betContentSyxwBottom {
  background: #317455;
  height: 100%;
  .game_info {
    p{
      color: #caebda;
      .reward {
        color: #f0c930;
      }
    }
  }
  .lottery_ball{
    li {
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      .pos {
        color: #caebda;
      }
      .ball_wrap {
        .ball {
          display: inline-block;
          width: 28px;
          height: 28px;
          border-radius: 100%;
          font-size: 14px;
          background: #caebda;
          text-align: center;
          line-height: 32px;
          margin: 0 2px;
          &.active {
            background: yellow;
          }
        }
      }
    }
  }
}
</style>
