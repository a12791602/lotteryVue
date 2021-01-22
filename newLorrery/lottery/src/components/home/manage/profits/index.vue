<template>
  <div class="profits">
    <ul>
      <li v-for="(list, index) in gainLost" :key="index">
        <strong>{{list.count}}</strong>
        <p>{{list.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { gainLost } from '@/api'
import { mapState } from 'vuex'
export default {
  name: 'profits',
  data () {
    return {
      gainLost: ''
    }
  },
  created () {
    this.getGainLost()
  },
  computed: {
    ...mapState(['loadingFlag'])
  },
  methods: {
    async getGainLost () {
      let data = await gainLost()
      let tempdata = data.data.data
      this.gainLost = [
        { name: '投注金额', count: tempdata.betAmount },
        { name: '中奖金额', count: tempdata.winAmount },
        { name: '活动礼金', count: tempdata.activityAndSend },
        { name: '返点金额', count: tempdata.juniorRebateAmount },
        { name: '充值金额', count: tempdata.rechargeAmount },
        { name: '提现金额', count: tempdata.drawingAmount }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.profits {
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      text-align: center;
      width: 33.33%;
    }
  }
}
</style>
