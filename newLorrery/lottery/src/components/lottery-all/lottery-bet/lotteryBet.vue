<template>
  <div class="lotteryBet">
    <betContentTop ref="betTop" @changeLoading="changeLoading"></betContentTop>
    <component :is="com" ref="betBotton" v-if="isLoading"></component>
    <betContentBalance :basketLen="basketLen"></betContentBalance>
    <transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
      <lotteryBasket class="lottery_basket" v-show="showBasket" ref="lotteryBasket"></lotteryBasket>
    </transition>
  </div>
</template>

<script>
import betContentTop from './betContentTop'
import lotteryBasket from './lotteryBasket'
import betContentBalance from './betContentBalance'
import betContentK3Bottom from './betContentK3Bottom'
import betContentSscBottom from './betContentSscBottom'
import betContentKlcBottom from './betContentKlcBottom'
import betContentSyxwBottom from './betContentSyxwBottom'
export default {
  name: 'lotteryBet',
  data () {
    return {
      lanIndex: '',
      showBasket: false,
      com: '',
      isLoading: false,
      basketLen: '',
      lotteryArr: [
        { name: 'k3', com: 'betContentK3Bottom' },
        { name: 'ssc', com: 'betContentSscBottom' },
        { name: 'pk10', com: 'betContentKlcBottom' },
        { name: 'x11x5', com: 'betContentSyxwBottom' }
      ]
    }
  },
  created () {
    this.com = this.lotteryArr.find(v => v.name === this.$route.query.group).com
  },
  methods: {
    reset () {
      this.$refs['betBotton'].iscreat()
      this.$store.commit('SAVECON', '')
      this.$store.commit('SAVEZHU', '')
    },
    // 数据存储vuex成功后，加载投注组件
    changeLoading () {
      this.isLoading = !this.isLoading
    },
    changeshowbasket (list, index) {
      this.showBasket = !this.showBasket
      if (list) {
        this.lanIndex = index + ''
        this.$refs['betBotton'].iscreat()
        this.$refs['betTop'].show = true
        this.$refs['betTop'].lotteryBasketChange(list.name)
        this.$refs['betBotton'].returnLotteryBall(list.con, list.zhu, index)
      }
    },
    savelotterybasket (temp) {
      !this.lanIndex ? this.$refs['lotteryBasket'].lotteryBasket.push(temp) : this.$refs['lotteryBasket'].lotteryBasket.splice(this.lanIndex, 1, temp)
      this.lanIndex = ''
    }
  },
  components: {
    betContentTop,
    betContentSscBottom,
    betContentK3Bottom,
    betContentKlcBottom,
    betContentSyxwBottom,
    betContentBalance,
    lotteryBasket
  }
}
</script>

<style scoped lang="scss">
  .lotteryBet {
    height: calc(100% - 60px);
    background: #317455;
    position: relative;
    .lottery_basket {
      transition: all 0.2s ease-in;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: -60px;
      // transform: translateX(-100%);
      // z-index: -10;
      // opacity: 0;
      width: 100%;
    }
  }
</style>
