<template lang="jade">
.bet
  betTop(:lotteryId='lotteryId',:group="group" @changeLotteryId='changeLotteryId',@iscreat='iscreat')
  lookMore
  .bet-content
    div
      betContentTop(v-if='$route.query.group !== "pk10"', :lotteryId='lotteryId',@tolooksucc='tolooksucc',ref='betContentTop',@iscreat='iscreat')
      betContentTopPk(v-else, :lotteryId='lotteryId',@tolooksucc='tolooksucc',ref='betContentTop',@iscreat='iscreat')
      betContentTopPop(v-if='$route.query.group !== "pk10"')
      betContentTopPopPk(v-else)
      betContentS(:lotteryId='lotteryId',ref='betContent',v-if='$route.query.group === "ssc"')
      betContentP(:lotteryId='lotteryId',ref='betContent',v-if='$route.query.group === "pk10"')
      betContentX(:lotteryId='lotteryId',ref='betContent',v-if='$route.query.group === "x11x5"')
  betGoshow(@iscreat='iscreat')
  betFooter(@iscreat='iscreat',ref="betFooter")
  bets(ref='pop')
  betsuccess
</template>
<script>
import bets from "../../page-five/money/bets.vue";//右滑页面
import betTop from "./components/betTop.vue";//头部
import betContentTop from "./components/betContentTop.vue";//开奖号码，倒计时
import betContentTopPk from "./components/betContentTopPk10.vue";//开奖号码，倒计时
import lookMore from "./components/lookMore.vue";//
import betContentTopPop from "./components/betContentTopPop.vue";//查看开奖记录，往期开奖
import betContentTopPopPk from "./components/betContentTopPopPk10.vue";//查看开奖记录，往期开奖
import betContentS from "./components/betContentSSC.vue";//（不同种类彩种调用不同组件，如11选5调用:betContentX11X5）
import betContentP from "./components/betContentPK10.vue";//（不同种类彩种调用不同组件，如11选5调用:betContentX11X5）
import betContentX from "./components/betContentX11X5.vue";//（不同种类彩种调用不同组件，如11选5调用:betContentX11X5）
import betFooter from "./components/betFooter.vue";//底部，确认投注
import betGoshow from "./components/betGoshow.vue";//投注确认弹窗
import betsuccess from "./components/betsuccess.vue";//投注成功，弹窗
export default {
  components: {
    bets, //投注记录
    betTop, //顶部彩种切换
    betContentTop, //开奖结果+倒计时
    betContentTopPk, //开奖结果+倒计时
    betContentTopPop, //10期开奖结果
    betContentTopPopPk, //10期开奖结果
    lookMore, //20期开奖结果
    betContentS, //选号区域
    betContentP, //选号区域
    betContentX, //选号区域
    betFooter, //确认投注+输入金额
    betsuccess, //投注成功弹出框
    betGoshow, //确认投注弹出框
  },
  data() {
    return {
      lotteryId: this.$route.query.id, //配置默认彩种（安徽快三）
      group:this.$route.query.group,//配置彩种种类（11选5）
    };
  },
  destroyed() {
    this.iscreat();
  },
  mounted() {
    let _this = this;
    document.addEventListener("visibilitychange", function() {
      if (document.hidden === false) {
        _this.geteServerTime();
      }
    });
    if (!this.$route.meta.isBack) {
      _this.geteServerTime();
    }
    this.$route.meta.isBack = false;
  },

  methods: {
    //调用子页面清空方法
    iscreat() {
      if (this.$refs.betContent) {
        this.$refs.betFooter.clear();
        this.$refs.betContent.iscreat();
      }
    },
    //通过子页面回传的lotteryId更改页面显示的彩种信息
    changeLotteryId(value) {
      this.lotteryId = value;
      this.geteServerTime(); //获取彩種當前獎期時間
      this.iscreat();
    },
    //调用子页面//获取彩種當前獎期時間
    geteServerTime() {
      if (this.$refs.betContentTop) {
        this.$refs.betContentTop.geteServerTime();
      }
    },
    tolooksucc() {
      this.$store.commit('BET_CONTENT_FLAG', false);
      this.$refs.pop.banckto();
      this.$refs.pop.getTradeList();
    }
  },
  // 保留三个小数,不四舍五入
  filters: {
    keepTwoNum(value) {
      value = parseInt(value * 100) / 100;
      return value;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/lotter-list/lotterbet/betsyx5.scss";
@import "../../../assets/scss/popcorn.scss";
</style>