<template>
  <div class="betContentSscBottom">
    <div class="game_info">
      <p>{{currentPlayer.remark}} <span class="reward"> 奖金{{currentPlayer.displayBonus | keepTwoNum}}元</span> {{rebate}}</p>
    </div>
    <div>{{playBonusId}}</div>
    <ul class="lottery_ball">
      <li v-for="(numViews, indexff) in currentPlayer.numView" :key="indexff">
        <div class="ball_top">
          <span class="pos">{{numViews.title}}</span>
          <div class="ball_wrap">
            <span v-for="(num, indexg) in numViews.nums" :key="indexg" :class="['ball', num.choose ? 'active' : '']" @click="curBalls({indexg, num})">{{num.ball}}</span>
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
  name: 'betContentSscBottom',
  mixins: [mixins, lotteryMixins],
  data () {
    return {}
  },
  computed: {
    isType () {
      return ['contains', 'and', 'lhh', 'dxds'].some(v => this.playBonusId.includes(v))
    },
    lhhTitle () {
      if (this.playBonusId && this.playBonusId === 'ssc_side_lhh') {
        return this.currentPlayer.numView.map(v => v.title)
      }
    }
  },
  methods: {
    returnLotteryBall (con, zhu, index) {
      let numView = this.currentPlayer.numView
      let pos = numView[0].nums.map(v => v.ball)
      if (numView.length === 1) {
        let arrCon = con.split(',')
        arrCon.forEach(v => {
          numView[0].nums[v].choose = true
        })
      } else {
        let arrCon = ''
        if (this.playBonusId === 'ssc_side_lhh') {
          arrCon = con.split(',').map(v => v !== '-' ? v.split(']').pop().split('').map(v1 => pos.findIndex(v2 => v2 === v1)) : [])
        } else if (this.playBonusId === 'ssc_dxds') {
          arrCon = con.split(',').map(v => v === '-' ? [] : v.split('+').map(v1 => pos.findIndex(v2 => v1 === v2)))
        } else {
          arrCon = con.split(',').filter(v => !isNaN(+v)).map(v => v.split(''))
        }
        arrCon.forEach((v1, i1) => {
          v1.forEach(v2 => {
            numView[i1].nums[v2].choose = true
          })
        })
      }
      this.$store.commit('SAVEZHU', zhu)
      this.$store.commit('SAVECON', con)
    },
    curBalls ({indexg, num}) {
      num && (num.choose = !num.choose)
      let numView = this.currentPlayer.numView
      if (numView.length === 1) { // 单行通用
        this.dd = numView[0].nums.reduce((arr, v) => arr.concat(v.choose ? v.ball : []), [])
        this.con = this.dd.join(',')
        this.clacSingleBall(indexg)
      } else { // 多行通用
        this.dd = numView.map(v1 => v1.nums.filter(v2 => v2.choose).map(v => v.ball))
        this.con = this.dd.map(v => v.join('')).join(',')
        this.calcDoubleBalls()
      }
      this.saveZhuCon()
    },
    // 多行投注
    calcDoubleBalls () {
      let playBonusId = this.playBonusId
      // 直选复式
      if (['ssc_star5', 'ssc_star4_front', 'ssc_star3_front', 'ssc_star3_mid', 'ssc_star3_last', 'ssc_star2_front', 'ssc_star2_last'].includes(playBonusId)) {
        this.zhu = this.dd.reduce((num, v) => num * v.length, 1)
        let num = 5 - playBonusId.match(/[0-9]/g)[0]
        let str = Array(num).fill('-').join(',')
        if (playBonusId.includes('front')) {
          this.con = this.con + ',' + str
        } else if (playBonusId.includes('last')) {
          this.con = str + ',' + this.con
        } else if (playBonusId.includes('mid')) {
          this.con = '-,' + this.con + ',-'
        }
        return
      }
      // 大小单双 龙虎和 定位胆
      if (['ssc_dxds', 'ssc_side_lhh', 'ssc_star1_dwd'].includes(playBonusId)) {
        this.zhu = this.dd.reduce((num, v) => num + v.length, 0)
        if (playBonusId === 'ssc_dxds') {
          this.con = this.dd.map(v => v.length ? v.join('+') : '-').join(',')
        } else if (playBonusId === 'ssc_side_lhh') {
          this.con = this.dd.map((v, i) => v.length ? '[' + this.lhhTitle[i] + ']' + v.join('') : '-').join(',')
        }
        return
      }
      // 五星 四星 | 组选
      if (['ssc_star5_group5', 'ssc_star5_group10', 'ssc_star5_group20', 'ssc_star5_group30', 'ssc_star5_group60', 'ssc_star4_front_group4', 'ssc_star4_front_group12', 'ssc_star4_last_group4', 'ssc_star4_last_group12'].includes(playBonusId)) {
        let [ka, kb] = this.dd
        if (['ssc_star5_group5', 'ssc_star5_group10', 'ssc_star4_front_group4', 'ssc_star4_last_group4'].includes(playBonusId)) { // 上下至少一注
          let len = ka.filter(v => kb.includes(v)).length
          this.zhu = ka.length * kb.length - len
        } else if (['ssc_star5_group20', 'ssc_star4_front_group12', 'ssc_star4_last_group12'].includes(playBonusId)) { // 1个2重号在 2个单号
          let kbGroup = this.groupSplit(kb.length, 2)
          let len = ka.filter(v => kb.includes(v)).length
          this.zhu = kbGroup * ka.length - (len * (kb.length - 1))
        } else if (playBonusId === 'ssc_star5_group30') { // 两个2重号 1个单号
          let kaGroup = this.groupSplit(ka.length, 2)
          let len = ka.filter(v => kb.includes(v)).length
          this.zhu = kaGroup * kb.length - (len * (ka.length - 1))
        } else if (playBonusId === 'ssc_star5_group60') { // 1个2重号在 3个单号
          let kbGroup = this.groupSplit(kb.length, 3)
          let len = ka.filter(v => kb.includes(v)).length
          this.zhu = kbGroup * ka.length - (len * this.groupSplit(kb.length - 1, 2))
        }
      }
    },
    // 单行计算
    clacSingleBall (indexg) {
      let playBonusId = this.playBonusId
      // 一帆风顺 好事成双 三星报喜 四季发财
      if (['ssc_star5_other1', 'ssc_star5_other2', 'ssc_star5_other3', 'ssc_star5_other4'].includes(playBonusId)) {
        this.zhu = this.dd.length
        return
      }
      // 不定位
      if (['ssc_star5_none1', 'ssc_star5_none2', 'ssc_star5_none3', 'ssc_star4_front_none1', 'ssc_star4_front_none2', 'ssc_star4_last_none1', 'ssc_star4_last_none2', 'ssc_star3_front_none1', 'ssc_star3_front_none2', 'ssc_star3_mid_none1', 'ssc_star3_mid_none2', 'ssc_star3_last_none1', 'ssc_star3_last_none2'].includes(playBonusId)) {
        this.zhu = this.groupSplit(this.dd.length, playBonusId.match(/[0-9]/g).pop())
        return
      }
      // 组选包胆
      if (['ssc_star3_front_group_contains', 'ssc_star3_mid_group_contains', 'ssc_star3_last_group_contains', 'ssc_star2_front_group_contains', 'ssc_star2_last_group_contains'].includes(playBonusId)) {
        this.currentPlayer.numView[0].nums.forEach((v, i) => {
          if (i !== indexg) {
            v.choose = false
          } else {
            this.con = v.ball
          }
        })
        this.zhu = this.dd.length ? (playBonusId.includes(3) ? 54 : 9) : ''
        return
      }
      // 五星组选120
      if (['ssc_star5_group120'].includes(playBonusId)) {
        this.zhu = this.groupSplit(this.dd.length, 5)
        return
      }
      // 四星组选6
      if (['ssc_star4_front_group6', 'ssc_star4_last_group6'].includes(playBonusId)) {
        this.zhu = this.groupSplit(this.dd.length, 2)
        return
      }
      // 四星组选24
      if (['ssc_star4_front_group24', 'ssc_star4_last_group24'].includes(playBonusId)) {
        this.zhu = this.groupSplit(this.dd.length, 4)
        return
      }
      // 三星 直选和值
      if (['ssc_star3_front_and', 'ssc_star3_mid_and', 'ssc_star3_last_and'].includes(playBonusId)) {
        let betCount = [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75, 75, 73, 69, 63, 55, 45, 36, 28, 21, 15, 10, 6, 3, 1]
        this.zhu = this.dd.reduce((num, v) => num + betCount[v], 0)
        return
      }
      // 三星 直选跨度
      if (['ssc_star3_front_kd', 'ssc_star3_mid_kd', 'ssc_star3_last_kd'].includes(playBonusId)) {
        let betCount = [10, 54, 96, 126, 144, 150, 144, 126, 96, 54]
        this.zhu = this.dd.reduce((num, v) => num + betCount[v], 0)
        return
      }
      // 三星 组三
      if (['ssc_star3_front_group3', 'ssc_star3_mid_group3', 'ssc_star3_last_group3'].includes(playBonusId)) {
        this.zhu = this.dd.length * (this.dd.length - 1)
        return
      }
      // 三星 组六
      if (['ssc_star3_front_group6', 'ssc_star3_mid_group6', 'ssc_star3_last_group6'].includes(playBonusId)) {
        this.zhu = ((this.dd.length - 2) * (this.dd.length - 1) * this.dd.length) / 6
        return
      }
      // 三星 组选和值
      if (['ssc_star3_front_group_and', 'ssc_star3_mid_group_and', 'ssc_star3_last_group_and'].includes(playBonusId)) {
        let betCount = [1, 2, 2, 4, 5, 6, 8, 10, 11, 13, 14, 14, 15, 15, 14, 14, 13, 11, 10, 8, 6, 5, 4, 2, 2, 1]
        this.zhu = this.dd.reduce((num, v) => num + betCount[v - 1], 0)
        return
      }
      // 二星 直选和值
      if (['ssc_star2_front_and', 'ssc_star2_last_and'].includes(playBonusId)) {
        let betCount = Array.from({length: 19}, (v, i) => i < 10 ? i + 1 : 19 - i)
        this.zhu = this.dd.reduce((num, v) => num + betCount[v], 0)
        return
      }
      // 二星直选跨度
      if (['ssc_star2_front_kd', 'ssc_star2_last_kd'].includes(playBonusId)) {
        let betCount = Array.from({length: 10}, (v, i) => !i ? 10 : (10 - i) * 2)
        this.zhu = this.dd.reduce((num, v) => num + betCount[v], 0)
        return
      }
      // 二星 组选复式
      if (['ssc_star2_front_group', 'ssc_star2_last_group'].includes(playBonusId)) {
        this.zhu = ((this.dd.length - 1) * this.dd.length) / 2
        return
      }
      // 二星 组选和值
      if (['ssc_star2_front_group_and', 'ssc_star2_last_group_and'].includes(playBonusId)) {
        let betCount = Array.from({length: 9}, (v, i) => (i === 4 ? 5 : (i < 4 ? [i + 1, i + 1] : [9 - i, 9 - i]))).toString().split(',')
        this.zhu = this.dd.reduce((num, v) => num + (betCount[v - 1] * 1), 1)
      }
    },
    // 清空注码
    iscreat () {
      this.con = ''
      this.zhu = 0
      this.money = ''
      this.dd = []
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
  .betContentSscBottom {
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
          justify-content: space-between;
          align-items: center;
          .pos {
            color: #caebda;
          }
          .ball_wrap {
            .ball {
              display: inline-block;
              width: 32px;
              height: 32px;
              border-radius: 100%;
              font-size: 14px;
              background: #caebda;
              text-align: center;
              line-height: 32px;
              margin: 2px;
              &.active {
                @-webkit-keyframes layui-scale{
                  0%{opacity:.3;-webkit-transform:scale(.5)}
                  100%{opacity:1;-webkit-transform:scale(1)}
                }
                @keyframes layui-scale{
                  0%{opacity:.3;-ms-transform:scale(.5);transform:scale(.5)}
                  100%{opacity:1;-ms-transform:scale(1);transform:scale(1)}
                }
                background: yellow;
                -webkit-animation:layui-scale .3s both;
                animation:layui-scale .3s both
              }
            }
          }
        }
        .ball_bottom {
          display: flex;
          justify-content: center;
          span {
            color: #fff;
            display: inline-block;
            width: 32px;
            height: 32px;
            margin: 4px;
            text-align: center;
            line-height: 32px;
            border-radius: 100%;
          }
        }
      }
    }
    /deep/ .lottery_ball .ball_wrap .ball{color: red!important;}
  }
</style>
