<template lang="jade">
.mymsg
  .mymsg-top
    i.iconfont.icon-left(@click='mymsgToFive')
    ul
      router-link(v-for='(navs,index) in nav', :to="'/mymsg/'+navs.pathurl", tag='li', :key='index') {{navs.name}}
    span
  .mymsg-content
    router-view
</template>
<script>
export default {
  data() {
    return {
      nav: [
        {
          name: "公告",
          pathurl: "notice"
        },
        {
          name: "私信",
          pathurl: "letter"
        }
      ]
    };
  },
  methods:{
    //返回five页面
    mymsgToFive(){
      this.$router.push("/five");
    },
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/page-five/mymsg.scss";
</style>