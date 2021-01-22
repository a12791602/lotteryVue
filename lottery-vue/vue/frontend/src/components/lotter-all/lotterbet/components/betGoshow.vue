<template lang='jade'>
.betcBox(v-show='betGoshow')
  ul.betc
    li 投注确认
    li
      p
        span {{$route.query.name}} ：
        | {{seasonId}}期
      p
        span 投注金额：
        b {{money*zhu}}元
      p
        span 投注内容：
        span.popcon {{con}}
    li
      button(@click='betCancel') 取消
      button(@click='betGo') 确定
</template>
<script>
export default {
  computed: {
    betGoshow() {
      return this.$store.state.betGoshow;
    },
    zhu() {
      return this.$store.state.zhu;
    },
    con() {
      return this.$store.state.con;
    },
    seasonId() {
      return  this.$store.getters.seasonId;
    },
    seasonId2() {
      return  this.$store.state.seasonId2;
    },
    money() {
      return this.$store.state.money;
    },
    playBonusId() {
      return this.$store.getters.playBonusId;
    }
  },
  methods: {
    betCancel() {
      this.$store.commit("BET_GO_SHOW", "reverse");
    },
    //投注
    betGo() {
      this.$loading.show({number:"a"});
      this.$store.commit("BET_GO_SHOW", false);
      this.$store.commit("BET_NOT", false);
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true
      };
      let formData = new FormData();
      formData.append("order[0].content", this.con);
      formData.append("order[0].betCount", this.zhu);
      formData.append("order[0].price", this.money);
      formData.append("order[0].unit", 1);
      formData.append("order[0].playId", this.playBonusId);
      formData.append("count", this.zhu);
      formData.append("traceOrders[0].price", this.money);
      formData.append("traceOrders[0].seasonId", this.seasonId2);
      formData.append("bounsType", 0);
      formData.append("traceWinStop", 0);
      formData.append("isTrace", 0);
      formData.append("lotteryId", this.$route.query.id);
      formData.append("amount", this.money * this.zhu);
      this.$emit("iscreat");
      this.$axios
        .post(this.$store.state.url + "api/lottery/bet", formData, config)
        .then(res => {
          if (res.data.message === "success") {
            this.$loading.hide();
            this.$store.commit("BET_NOT", true);
              this.$store.commit("BET_SUCCESS", true);
          } else {
            this.$store.commit("BET_NOT", true);
            if (res.data.status === 501) {
              this.$pop.show({
                title: "发生错误",
                content: res.data.content,
                content1: "",
                content2: "",
                number: 1
              });
              
            }
          }
        })
        .catch(error => {
          this.$pop.show({
            title: "温馨提示",
            content: "投注失败,请检查您的网络！",
            content1: "",
            content2: "",
            number: 1
          });
          this.$store.commit("BET_NOT", true);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/scss/lotter-list/lotterbet/components/betcBox.scss";
</style>