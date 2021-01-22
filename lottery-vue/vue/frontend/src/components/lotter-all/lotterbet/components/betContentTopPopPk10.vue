<template lang='jade'>
.bet-content-top-pop(v-show='betContentTopPopFlag', @click='changeBetContentTopPop')
  ul.look
    li
      p 期号
      p 开奖号码
    li(v-for='(item,index) in getPastOpens', :key='index', v-if='index < 10')
      p
        | {{item.seasonId.substring(4).split("-").join("")*1}}
        i.iconfont.icon-plus-minus
      p
        a {{item.n1 &lt; 10 ? '0'+item.n1 : item.n1}}
        a {{item.n2 &lt; 10 ? '0'+item.n2 : item.n2}}
        a {{item.n3 &lt; 10 ? '0'+item.n3 : item.n3}}
        a {{item.n4 &lt; 10 ? '0'+item.n4 : item.n4}}
        a {{item.n5 &lt; 10 ? '0'+item.n5 : item.n5}}  
        a {{item.n6 &lt; 10 ? '0'+item.n6 : item.n6}}  
        a {{item.n7 &lt; 10 ? '0'+item.n7 : item.n7}}  
        a {{item.n8 &lt; 10 ? '0'+item.n8 : item.n8}}  
        a {{item.n9 &lt; 10 ? '0'+item.n9 : item.n9}}  
        a {{item.n10 &lt; 10 ? '0'+item.n10 : item.n10}}  
      //- p {{item.addTime.substring(11)}}
  p.lookAll
    button(@click.stop='lookAll') 查看更多
    button(@click='lookAllTo') 往期开奖
</template>
<script>
export default {
  destroyed(){
    this.$store.state.betContentTopPopFlag = false;
  },
  computed: {
    betContentTopPopFlag() {
      return this.$store.state.betContentTopPopFlag;
    },
    getPastOpens() {
      return this.$store.state.getPastOpens;
    }
  },
  methods: {
    changeBetContentTopPop() {
        this.$store.commit("BET_CONTENT_FLAG","reverse");
    },
    //查看20条记录
    lookAll() {
      this.$store.commit("BET_CONTENT_FLAG",false);
      this.$store.commit("LOOK_ALL_UL","reverse");
    },

    //往期开奖
    lookAllTo() {
      this.$router.push({
        path: "second/past",
        query: {
          id: this.$route.query.id,
          name: this.$route.query.name,
          group: this.groupId
        }
      });
    },
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../assets/scss/lotter-list/lotterbet/components/betContentTopPop.scss";
@import "../../../../assets/scss/lotter-list/lotterbet/components/betContentTopPopPk10.scss";
</style>


