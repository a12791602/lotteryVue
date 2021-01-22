<template>
  <div class="betContentSyxwBottom">
    <div class="game_info">
      <p>{{currentPlayer.remark}} <span class="reward"> 奖金{{currentPlayer.displayBonus | keepTwoNum}}元</span> {{rebate}}</p>
    </div>
    <div>{{playBonusId}}</div>
    <ul class="lottery_ball">
      <li v-for="(numViews, indexff) in currentPlayer.numView" :key="indexff">
        <div class="ball_top">
          <span class="pos">{{numViews.title}}</span>
          <div class="ball_wrap">
            <span v-for="(num, indexg) in numViews.nums" :key="indexg" :class="['ball', num.choose ? 'active' : '']" @click="curBalls({indexff, indexg, num})">{{num.ball}}</span>
          </div>
        </div>
        <div class="ball_bottom" v-show="!isType">
          <span v-for="(item, index) in selectBalls" :key="index" @click="getTypeBall({indexff, type: item.type})">{{item.name}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
'use strict'
import mixins from '@/utils/mixins'
import lotteryMixins from '@/utils/lotteryMixins'
export default {
  name: 'betContentSyxwBottom',
  mixins: [mixins, lotteryMixins],
  data () {
    return {
      tempDmArr: []
    }
  },
  computed: {
    isType () {
      return ['dt', 'and', 'odd', 'even', 'big', 'small', 'dragon_lion'].some(v => this.playBonusId.includes(v))
    }
  },
  methods: {
    returnLotteryBall (con, zhu, index) {
      let numView = this.currentPlayer.numView
      if (numView.length === 1) {
        let ballArr = numView[0].nums.map(v => Object.values(v)[0])
        con.split(',').forEach(v => {
          if (ballArr.includes(v)) {
            let index = ballArr.findIndex(v1 => v1 === v)
            numView[0].nums[index].choose = true
          }
        })
      } else {
        let conArr = ''
        if (con.includes('-')) {
          conArr = con.split(',').map(v => v === '-' ? [] : v.split('').reduce((arr, v, i, self) => arr.concat(!(i % 2) ? self.slice(i, i + 2).join('') : []), []))
        } else {
          let reg = /[\u4e00-\u9fa5]+/g
          conArr = con.split(',').map((v, i) => i === 3 ? (!reg.test(v) ? v : [v.match(/[0-9]{2}/)[0], ...v.match(reg)[0].split('')]) : v.split('').reduce((arr, v, i, self) => arr.concat(!(i % 2) ? self.slice(i, i + 2).join('') : []), []))
        }
        conArr.forEach((v1, i1) => {
          let ballArr = numView[i1].nums.map(v => Object.values(v)[0])
          v1.forEach(v2 => {
            if (ballArr.includes(v2)) {
              let index = ballArr.findIndex(v3 => v3 === v2)
              numView[i1].nums[index].choose = true
            }
          })
        })
      }
      this.saveZhuCon()
    },
    curBalls ({indexff, indexg, num}) {
      let numView = this.currentPlayer.numView
      num && (num.choose = !num.choose)
      if (numView.length === 1) {
        this.dd = numView[0].nums.filter(v => v.choose).map(v => v.ball)
        this.con = this.dd.join(',')
        this.clacSingleBall()
      } else {
        this.dd = numView.map(v1 => v1.nums.filter(v2 => v2.choose).map(v3 => v3.ball))
        this.con = this.dd.map(v => v.join('')).join(',')
        this.calcDoubleBalls({num, indexff, indexg})
      }
      this.saveZhuCon()
    },
    clacSingleBall () {
      let playBonusId = this.playBonusId
      // 任选复式 组选复式
      if (['n11x5_x1', 'n11x5_x2', 'n11x5_x3', 'n11x5_x4', 'n11x5_x5', 'n11x5_x6', 'n11x5_x7', 'n11x5_x8', 'n11x5_star2_group', 'n11x5_star3_group'].includes(playBonusId)) {
        let num = playBonusId.match(/[0-9]/g).pop() * 1
        this.zhu = this.groupSplit(this.dd.length, num)
      }
      // 选一 前三不定位 龙虎斗
      if (['n11x5_dragon_lion', 'n11x5_front3_nx1'].includes(playBonusId)) {
        this.zhu = this.dd.length
      }
    },
    calcDoubleBalls ({num, indexff, indexg}) {
      let playBonusId = this.playBonusId
      // 选一 定位胆 | 选三 中三
      if (['n11x5_dwd', 'n11x5_star3_and', 'n11x5_star3_big', 'n11x5_star3_small', 'n11x5_star3_odd', 'n11x5_star3_even'].includes(playBonusId)) {
        this.con = this.dd.map(v => v.length ? v.join('') : '-').join(',')
        this.zhu = this.dd.reduce((num, v) => num + v.length, 0)
        return
      }
      // 直选复式
      if (['n11x5_star2_front', 'n11x5_star3_front'].includes(playBonusId)) {
        let num = +playBonusId.match(/[0-9]/g).pop()
        this.zhu = this.fushi(this.con.split(','), num)
      }
      // 胆拖
      if (['n11x5_x2_dt', 'n11x5_x3_dt', 'n11x5_x4_dt', 'n11x5_x5_dt', 'n11x5_x6_dt', 'n11x5_x7_dt', 'n11x5_x8_dt', 'n11x5_star2_group_dt', 'n11x5_star3_group_dt'].includes(playBonusId)) {
        let leastZhu = playBonusId.match(/[0-9]/g).pop()
        let numView = this.currentPlayer.numView
        if (!indexff) { // 胆码 0
          if (num.choose) {
            this.tempDmArr.push(num.ball)
            if (this.tempDmArr.length >= leastZhu) {
              this.tempDmArr.shift()
            }
            if (numView[1].nums[indexg].choose) {
              numView[1].nums[indexg].choose = false
            }
          } else {
            let index = this.tempDmArr.findIndex(v => v === num.ball)
            this.tempDmArr.splice(index, 1)
          }
          numView[0].nums.forEach(v => {
            if (!this.tempDmArr.includes(v.ball)) {
              v.choose = false
            }
          })
        } else { // 拖码 1
          if (numView[0].nums[indexg].choose && num.choose) {
            numView[0].nums[indexg].choose = false
          }
        }
        this.dd = numView.map(v1 => v1.nums.filter(v2 => v2.choose).map(v3 => v3.ball))
        let [ka, kb] = this.dd
        this.zhu = this.groupSplit(kb.length, leastZhu - ka.length)
        this.con = ka.join('') + ',' + kb.join('')
      }
    },
    iscreat () {
      this.con = ''
      this.zhu = 0
      this.money = ''
      this.dd = []
      this.tempDmArr = []
      this.currentPlayer.numView.forEach(v1 => {
        v1.nums.forEach(v2 => {
          v2.choose = false
        })
      })
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
        .ball_top {
          display: flex;
          height: 32px;
          line-height: 32px;
          .pos {
            color: #caebda;
            margin-right: 5px;
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
        .ball_bottom {
          span {
            display: inline-block;
            width: 25px;
            height: 25px;
            text-align: center;
            line-height: 25px;
            margin: 5px;
          }
        }
      }
    }
  }
</style>
