<template lang="jade">
.lotterList
  .lotterList-top
    i.iconfont.icon-left(@click='listStyleToSafety')
    p {{title}}
  .lotterList-nav
    .lotterList-nav-box
      ul
        li(:class='{"active" : navNumber === index}', v-for='(navTitles,index) in navTitle', :title='navTitles.name', :key='index', @click='selectLottery(navTitles,index)')
          span
            i.iconfont(:class='navTitles.icon')
          h5 {{navTitles.name}}
    keep-alive
      router-view
</template>
<script>
export default {
  data() {
    return {
      navNumber:0,
      title:'全部彩种',
      navTitle: [
        { name: "全部彩种", pathsrc: "lotterAll",icon:"icon-all" },
        { name: "快3", pathsrc: "k3s",icon:"icon-k3" },
        { name: "时时彩", pathsrc: "sscs",icon:"icon-ssc" },
        { name: "快乐彩", pathsrc: "klcs",icon:"icon-pk10" },
        { name: "11选5", pathsrc: "etfs",icon:"icon-x11x5" }
      ]
    };
  },
  methods:{
    listStyleToSafety(){
      this.$router.push('/one')
    },
    selectLottery(navTitles,index){
      this.navNumber = index;
      this.$router.push("/lotterList/"+navTitles.pathsrc);
      this.title = navTitles.name;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/lotter-list/lotterList.scss";
</style>
