<template lang='jade'>
.bet-footer
  .bet-footer-top(v-show='zhu > 0')
    .bet-footer-tops
      p 当前选号
      span {{con}}
    .bet-footer-buttoms
      p 每注金额
      input(type='number', v-model='meiyoumoney', onfocus='this.select()')
      span(v-if="meiyoumoney === ''") 请输入要投注的金额
      span(v-else='v-else', v-show="playBonusId !== 'ssc_dxds'")
        | 单注最高可中
        p(v-show='! isNaN(meiyoumoney*displayBonus)') {{(meiyoumoney*parseInt(displayBonus*1000))/1000 | keepTwoNum}}
        p(v-show='isNaN(meiyoumoney*displayBonus)')
          | {{youhezhi ? (meiyoumoney*parseInt(displayBonus2*1000))/1000 : (meiyoumoney* parseInt(displayBonus1*1000))/1000 | keepTwoNum}}
        | 元
  .bet-footer-buttom
    .bet-footer-buttom-left
      button(@click='$emit("iscreat")') 清空
      p
        span(v-if='zhu >0') 共{{zhu}}注,
        span(v-if="meiyoumoney !== '' ") 共{{zhu*meiyoumoney}}元
    .bet-footer-buttom-right(@click='betC', v-show='betnot') 马上投注
</template>
<script>
export default {
  data() {
    return {
      meiyoumoney: this.$store.state.money,
    };
  },
  computed: {
    zhu() {
      return this.$store.state.zhu;
    },
    // money() {
    //   return this.$store.state.money;
    // },
    youhezhi() {
      if (this.con && this.con.indexOf("和") !== -1) {
        return true;
      } else {
        return false;
      }
    },
    con() {
      return this.$store.state.con;
    },
    betnot() {
      return this.$store.state.betnot;
    },
    current_player() {
      return this.$store.state.current_player;
    },
    displayBonus() {
      return this.$store.state.current_player.displayBonus;
    },
    playBonusId(){
      return this.$store.getters.playBonusId;
    },
    displayBonus1() {
      let displayBonus1 = "";
      if (
        this.current_player.displayBonus &&
        this.current_player.displayBonus.indexOf("-") != -1
      ) {
        displayBonus1 = this.current_player.displayBonus.split("-")[0];
        displayBonus1 = Number(displayBonus1);
      }
      return displayBonus1;
    },
    displayBonus2() {
      let displayBonus2 = "";
      if (
        this.current_player.displayBonus &&
        this.current_player.displayBonus.indexOf("-") != -1
      ) {
        displayBonus2 = this.current_player.displayBonus.split("-")[1];
        displayBonus2 = Number(displayBonus2);
      }
      return displayBonus2;
    }
  },
  watch: {
    meiyoumoney(newVal) {
      if (this.meiyoumoney === "") {
        setTimeout(() => {
          if (this.meiyoumoney === "") {
            this.meiyoumoney = "";
          }
        }, 1000);
      } else {
        this.meiyoumoney = parseInt(newVal);
        this.$store.commit("MONEY",parseInt(newVal));
      }
    }
  },
  methods: {
    clear(){
      this.meiyoumoney="";
    },
    betC() {
      if (this.zhu <= 0) {
        this.$pop.show({
          title: "温馨提示",
          content: "请至少选择一注号码投注!",
          content1: "",
          content2: "",
          number: 2
        });
      }
      if (this.meiyoumoney === "") {
        this.$pop.show({
          title: "温馨提示",
          content: "请填写您要投注的金额!",
          content1: "",
          content2: "",
          number: 2
        });
      }
      if (this.zhu > 0 && this.meiyoumoney !== "") {
         this.$store.commit("BET_GO_SHOW", "reverse");
      }
    }
  },
  //focus
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  // 保留三个小数,不四舍五入
  filters: {
    keepTwoNum(value) {
      value = parseInt(value * 100) / 100;
      return value;
    },
    keepThreeNum(value) {
      value = parseInt(value * 1000) / 1000;
      return value;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../assets/scss/lotter-list/lotterbet/components/betFooter.scss";
</style>

