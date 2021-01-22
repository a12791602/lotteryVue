<template lang="jade">
.ssc
  ul
    router-link(v-for='(item,index) in lotteryListssc', :key='index', tag='li', :to="{path:'/ssc',query:{id:item.id,name:item.name}}")
      span
        i.iconfont(:class='"icon-"+item.groupId')
      h5 {{item.name}}
</template>
<script>
export default {
  data() {
    return {
      lotteryListssc:''
    };
  },
  mounted() {
    this.lotteryssc();
  },
  methods: {
    lotteryssc() {
      if(JSON.parse(localStorage.getItem("lotteryListSSC")) !== null){
        this.lotteryListssc = JSON.parse(localStorage.getItem("lotteryListSSC"));
      }else {
        this.$axios.get(this.$store.state.url + "api/lottery/getLotteryList",{params:{type:"ssc"}}).then(res => {
          localStorage.setItem("lotteryListSSC",JSON.stringify(res.data.data));
          this.lotteryListssc = res.data.data;
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
@import "../../assets/scss/lotter-list/ssc.scss";
</style>
