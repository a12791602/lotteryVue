<template lang="jade">
.klc
  ul
    router-link(v-for='(item,index) in lotteryListklc', :key='index', tag='li', :to="{path:'/pk10',query:{id:item.id,name:item.name}}")
      span
        i.iconfont(:class='"icon-"+item.groupId')
      h5 {{item.name}}
</template>
<script>
export default {
  data() {
    return {
      lotteryListklc: ''
    };
  },
  mounted() {
    this.lotteryklc();
  },
  methods: {
    lotteryklc() {
      if(JSON.parse(localStorage.getItem("lotteryListpk10")) !== null){
        this.lotteryListklc = JSON.parse(localStorage.getItem("lotteryListpk10"));
      }else {
        this.$axios.get(this.$store.state.url + "api/lottery/getLotteryList",{params:{type:"pk10"}}).then(res => {
          localStorage.setItem("lotteryListpk10",JSON.stringify(res.data.data));
          this.lotteryListklc = res.data.data;
        })
        .catch(error => {
          console.log("getLotteryListNo");
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/lotter-list/klc.scss";
</style>
