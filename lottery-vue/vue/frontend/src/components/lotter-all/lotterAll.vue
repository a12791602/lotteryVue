<template lang="jade">
.looterAll
  ul
    router-link(v-for='(item,index) in lotteryListAll', :key='index', tag='li', :to="{path:'/'+item.groupId,query:{id:item.id,name:item.name}}")
      span
        i.iconfont(:class='"icon-"+item.groupId')
      h5 {{item.name}}
</template>
<script>
export default {
  data() {
    return {
      lotteryListAll: ''
    };
  },
  mounted(){
    this.lotter();
  },
  methods:{
    lotter(){
      if(JSON.parse(localStorage.getItem("lotteryListAll")) !== null){
        this.lotteryListAll = JSON.parse(localStorage.getItem("lotteryListAll"));
      }else {
        this.$axios.get(this.$store.state.url + "api/lottery/getLotteryList",{params:{type:"all"}}).then(res => {
          localStorage.setItem("lotteryListAll",JSON.stringify(res.data.data));
          this.lotteryListAll = res.data.data;
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
@import "../../assets/scss/lotter-list/lotterAll.scss";
</style>

