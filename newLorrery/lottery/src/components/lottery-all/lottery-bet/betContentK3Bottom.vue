<template>
  <div class="betContentK3Bottom">
    <p>{{playBonusId}}</p>
    <div class="game_info">
      <p>{{currentPlayer.remark}} <span class="reward"> 奖金{{currentPlayer.displayBonus | keepTwoNum}}元</span> {{rebate}}</p>
    </div>
    <ul class="lottery_ball">
      <li v-for="(numViews, index) in currentPlayer.numView" :key="index">
        <span v-for="(nums, indexg) in numViews.nums" :key="indexg" :class="{active: nums.choose}" @click="calcBall({nums, indexg})">{{nums.ball}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mixins from '@/utils/mixins'
export default {
  name: 'betContentK3Bottom',
  mixins: [mixins],
  data () {
    return {
      money: '',
      d: [],
      dd: '',
      con: '',
      zhu: ''
    }
  },
  computed: {
    ...mapState(['currentPlayer', 'playBonusId', 'rebate'])
  },
  mounted () {},
  methods: {
    calcBall ({nums, indexg}) {
      nums.choose = !nums.choose
      let playBonusId = this.playBonusId
      console.log(indexg)
      nums.choose ? this.d[indexg] = nums.ball : this.d.splice(indexg, 1, '')
      if (['k3_star1', 'k3_star3_link'].includes(playBonusId)) {
        this.dd = this.d.filter(v => v)
        this.zhu = this.dd.length
        this.con = this.dd.join(',')
        console.log(nums)
      }
      this.$store.commit('SAVEZHU', this.zhu)
      this.$store.commit('SAVECON', this.con)
    },
    clacSingleBall () {},
    calcDoubleBalls () {},
    iscreat () {}
  }
}
</script>

<style scoped lang="scss">
.betContentK3Bottom {
  font-size: 12px;
  .game_info {
    p {
      font-size: 1rem;
    }
  }
  .lottery_ball {
    li {
      display: flex;
      justify-content: center;
      span {
        width:2rem;
        height:2rem;
        display:inline-block;
        text-align: center;
        line-height: 2rem;
        background: #caebda;
        border-radius: 50%;
        margin: 5px;
        font-size: 1rem;
        &.active{
          background: #f4c829;
        }
      }
    }
  }
}
</style>
