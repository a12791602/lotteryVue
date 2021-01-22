<template lang="jade">
.profit
  .profit-top
    i.iconfont.icon-left(@click='profitToFive')
    p 今日盈亏
    span
  .profit-content
    .profit-content-top
      div
        p 盈利金额
        p {{winAmount-betAmount+activityAndSend+juniorRebateAmount | keepTwoNum2}}
    .profit-contents
      i.iconfont.icon-gantanhao
      | 盈亏计算公式：中奖-投注+活动+返点
    .profit-content-list
      ul
        li
          span {{betAmount}}
          span 投注金额
        li
          span {{winAmount}}
          span 中奖金额
        li
          span {{activityAndSend}}
          span 活动礼金
        li
          span {{juniorRebateAmount}}
          span 返点金额
        li
          span {{rechargeAmount}}
          span 充值金额
        li
          span {{drawingAmount}}
          span 提现金额
</template>
<script>
export default {
  data() {
    return {
      id: "",
      betAmount: 0,
      winAmount: 0,
      activityAndSend: 0,
      juniorRebateAmount: 0,
      rechargeAmount: 0,
      drawingAmount: 0
    };
  },
  mounted() {
    this.getGainLost();
  },
  methods: {
    //返回five页面
    profitToFive(){
      this.$router.push('/five')
    },
    getGainLost() {
      this.$axios
        .get(this.$store.state.url + "api/proxy/getGainLost")
        .then(res => {
          this.betAmount = res.data.data.betAmount;
          this.winAmount = res.data.data.winAmount;
          this.activityAndSend = res.data.data.activityAndSend;
          this.juniorRebateAmount = res.data.data.juniorRebateAmount;
          this.rechargeAmount = res.data.data.rechargeAmount;
          this.drawingAmount = res.data.data.drawingAmount;
        })
        .catch(error => {
          console.log("获取列表Error");
        });
    }
  },
  filters: {
    // 保留三个小数,不四舍五入
    keepTwoNum1(value) {
      value = parseInt(value * 10000) / 10000;
      return value;
    },
    // 保留三个小数,四舍五入
    keepTwoNum2(value) {
      value = Number(value);
      return value.toFixed(3);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/page-five/profit.scss";
</style>