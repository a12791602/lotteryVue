<template lang='jade'>
.lookAllDiv(v-show='lookAllUl')
  p.lookAllDivTitle
    i.iconfont.icon-left(@click='lookAllDivTitle')
    b.cont 查看更多
    span
  .lookAllUlBox
    ul.lookAllUl
      li
        p 期号
        p 开奖号码
        p 开奖时间
      li(v-for='(item,index) in getPastOpens', :key='index')
        p
          | {{item.seasonId.substring(4).split("-").join("")*1}}
          i.iconfont.icon-plus-minus
        p
          a {{item.n1}}
          a {{item.n2}}
          a {{item.n3}}
          a {{item.n4}}
          a {{item.n5}}
        p {{item.addTime.substring(11)}}
</template>
<script>
export default {
  computed: {
    getPastOpens(){
      return this.$store.getters.getPastOpens;
    },
    lookAllUl(){
        return this.$store.state.lookAllUl;
    }
  },
  methods: {
    lookAllDivTitle() {
      this.$store.commit("LOOK_ALL_UL","reverse");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../assets/scss/lotter-list/lotterbet/components/lookMore.scss";
</style>

