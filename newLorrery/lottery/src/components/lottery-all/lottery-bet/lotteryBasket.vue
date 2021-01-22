<template>
  <div class="lottery_basket">
    <p @click="goBackLottery">返回</p>
    <div class="table_top">
      <span>购彩蓝</span>
      <span @click="deleteAllBasket">清除</span>
    </div>
    <table width="100%" cellspacing="0" cellpadding="0" border="0">
      <thead>
      <th v-for="(title, index) in tableTitles" :key="index">{{title}}</th>
      </thead>
      <tbody>
      <tr v-for="(list, index) in lotteryBasket" :key="index" @click="returnBall(list, index)">
        <th><span>{{list.fullTitle}}</span></th>
        <th><span>{{list.con}}</span></th>
        <th><span>{{list.zhu}}</span></th>
        <th><span>{{list.multiple}}</span></th>
        <th><span>{{list.mode}}</span></th>
        <th><span>{{list.money}}</span></th>
        <th><span>{{list.rebate}}</span></th>
        <th><span @click.stop="deleteBasketOne(index)">{{list.methods}}</span></th>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'lotteryBasket',
  data () {
    return {
      lotteryBasket: [],
      basketIndex: '',
      tableTitles: ['玩法', '投注号码', '注数', '倍数', '模式', '金额', '返点', '操作']
    }
  },
  methods: {
    goBackLottery () {
      this.$parent.showBasket = false
    },
    deleteBasketOne (index) {
      if (this.lotteryBasket.length) {
        this.lotteryBasket.splice(index, 1)
      }
    },
    deleteAllBasket () {
      if (this.lotteryBasket.length) {
        this.lotteryBasket = []
      }
    },
    returnBall (list, index) {
      console.log(123)
      this.$parent.changeshowbasket(list, index)
    }
  },
  watch: {
    lotteryBasket () {
      this.$parent.basketLen = this.lotteryBasket.length
    }
  }
}
</script>

<style scoped lang="scss">
.lottery_basket {
  background: #fff;
  padding-top: 60px;
  &.visible {
    z-index: 10;
    opacity: 1;
  }
  .table_top {
    display: flex;
    justify-content: space-between;
  }
}
</style>
