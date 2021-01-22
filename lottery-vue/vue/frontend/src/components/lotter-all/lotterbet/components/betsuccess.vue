<template lang='jade'>
.betcBox(v-show='betsuccess')
  ul.betc(v-show='betsuccess')
    li 温馨提示！
    li
      p
        b 投注成功,
        | 您可以在我的账户查看注单详情
    li
      button(@click='looksucc') 查看注单
      button(@click='betsucc') 继续投注
</template>
<script>
export default {
  computed: {
    betsuccess() {
      return this.$store.state.betsuccess;
    },
  },
  methods: {
    //查看注单
    looksucc() {
      this.$router.push({ path: "/bet" });
      this.$store.commit("BET_SUCCESS","reverse");
    },
    betsucc() {
      this.$store.commit("BET_SUCCESS","reverse");
      this.$emit("iscreat");
    },
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/scss/lotter-list/lotterbet/components/betcBox.scss";
</style>