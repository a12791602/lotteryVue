<template>
  <div class="betContentKlcBottom">
    <div class="game_info">
      <p>{{currentPlayer.remark}} <span class="reward"> 奖金{{currentPlayer.displayBonus | keepTwoNum}}元</span> {{rebate}}</p>
    </div>
    <div>{{playBonusId}}</div>
    <ul class="lottery_ball">
      <li v-for="(numViews, indexff) in currentPlayer.numView" :key="indexff">
        <div class="ball_top">
          <!--<span class="pos">{{numViews.title}}</span>-->
          <div class="ball_wrap">
            <span v-for="(num, indexg) in numViews.nums" :key="indexg" :class="['ball', num.choose ? 'active' : '']" @click="curBalls({indexg, num})">{{num.ball}}</span>
          </div>
        </div>
        <!--v-show="!isType"-->
        <!--<div class="ball_bottom">-->
          <!--<span v-for="(item, index) in selectBalls" :key="index" @click="getTypeBall({indexff, type: item.type})">{{item.name}}</span>-->
        <!--</div>-->
      </li>
    </ul>
  </div>
</template>

<script>
import mixins from '@/utils/mixins'
import lotteryMixins from '@/utils/lotteryMixins'
export default {
  name: 'betContentKlcBottom',
  mixins: [mixins, lotteryMixins],
  data () {
    return {
      tempZhu: '',
      d: []
    }
  },
  methods: {
    curBalls ({num, indexg}) {
      num.choose = !num.choose
      let numView = this.currentPlayer.numView
      if (numView.length === 1) {
        num.choose ? this.d[indexg] = num.ball : this.d.splice(indexg, 1, '')
        this.dd = this.d.filter(v => v)
        this.con = this.dd.join(',')
        this.clacSingleBall()
      } else {
        console.log(numView)
        this.dd = numView.map(v1 => v1.nums.filter(v2 => v2.choose).map(v2 => v2.ball))
        this.con = this.dd.map(v => v.join('')).join(',')
        this.calcDoubleBalls()
      }
      this.saveZhuCon()
    },
    clacSingleBall () {
      let playBonusId = this.playBonusId
      if (playBonusId === 'pk10_side_gy_and') {
        this.zhu = this.dd.length
      }
      if (playBonusId === 'pk10_star2_and') {
        let betCount = [2, 2, 4, 4, 6, 6, 8, 8, 10, 8, 8, 6, 6, 4, 4, 2, 2]
        this.zhu = this.dd.reduce((num, v) => num + betCount[parseInt(v) - 3], 0)
      }
    },
    calcDoubleBalls () {
      let playBonusId = this.playBonusId
      let numView = this.currentPlayer.numView
      if (playBonusId === 'pk10_side_lh') { // 龙湖
        this.con = this.dd.map((v, i) => v.length ? '[' + numView[i].title + ']' + v.join('') : '-').join(',')
        this.zhu = this.dd.reduce((num, v) => num + v.length, 0)
      }
      // 定位胆
      if (['pk10_star1_dwd', 'pk10_side_ds', 'pk10_star1_dwd_last'].includes(playBonusId)) {
        this.con = this.dd.map(v => v.length ? v.join('') : '-').join(',')
        this.zhu = this.dd.reduce((num, v) => num + v.length, 0)
      }
      // 复式 | 猜前
      if (['pk10_star2', 'pk10_star3', 'pk10_star4', 'pk10_star5', 'pk10_star2_dj', 'pk10_star3_dj', 'pk10_star4_dj', 'pk10_star5_dj'].includes(playBonusId)) {
        let num = +playBonusId.match(/[0-9]/g).pop()
        this.zhu = this.fushi(this.con.split(','), num)
      }
    },
    iscreat () {
      this.con = ''
      this.zhu = 0
      this.money = ''
      this.d = []
      this.dd = ''
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
.betContentKlcBottom {
  font-size: 12px;
  .game_info {
    p {
      font-size: 1rem;
    }
  }
  .lottery_ball {
    li {
      display: flex;
      align-items: center;
      strong {
        display: inline-block;
        width: 12%;
        font-size: 1rem;
        text-align: center;
      }
      span {
        width:2rem;
        height:2rem;
        display:inline-block;
        text-align: center;
        line-height: 2rem;
        background: #caebda;
        border-radius: 50%;
        margin: 2px;
        font-size: 1rem;
        &.active {
          background: yellow;
        }
      }
    }
  }
}
</style>
